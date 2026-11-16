import { lazy, Suspense, useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import EmptyState from '@/components/ui/EmptyState'
import FormSkeleton from '@/components/skeletons/FormSkeleton'
import CheckoutStepper from '@/features/checkout/components/CheckoutStepper'
import {
  selectCartItems,
  selectCartSubtotal,
  selectCartTax,
  selectCartShipping,
  selectCartTotal,
} from '@/features/cart/slices/cartSelectors'
import { clearCart } from '@/features/cart/slices/cartSlice'
import { placeOrder } from '@/features/orders/slices/ordersSlice'
import { isValidLuhn } from '@/utils/luhn'
import { useToast } from '@/context/ToastContext'
import styles from './CheckoutPage.module.css'

const ShippingStep = lazy(
  () => import('@/features/checkout/components/ShippingStep'),
)
const PaymentStep = lazy(
  () => import('@/features/checkout/components/PaymentStep'),
)
const ReviewStep = lazy(
  () => import('@/features/checkout/components/ReviewStep'),
)

const shippingSchema = Yup.object({
  fullName: Yup.string().required('Full name is required'),
  email: Yup.string().email('Valid email required').required('Email is required'),
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  postal: Yup.string().required('Postal code is required'),
  country: Yup.string().required('Country is required'),
})

const paymentSchema = Yup.object({
  cardName: Yup.string().required('Name on card is required'),
  cardNumber: Yup.string()
    .required('Card number is required')
    .test('luhn', 'Enter a valid card number', (value) => isValidLuhn(value || '')),
  expiry: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Use MM/YY')
    .required('Expiry is required'),
  cvc: Yup.string()
    .matches(/^\d{3,4}$/, 'Enter a valid CVC')
    .required('CVC is required'),
})

const schemas = [shippingSchema, paymentSchema, Yup.object({})]

const initialValues = {
  fullName: '',
  email: '',
  address: '',
  city: '',
  postal: '',
  country: 'US',
  cardName: '',
  cardNumber: '',
  expiry: '',
  cvc: '',
}

export default function CheckoutPage() {
  const [step, setStep] = useState(0)
  const items = useSelector(selectCartItems)
  const subtotal = useSelector(selectCartSubtotal)
  const tax = useSelector(selectCartTax)
  const shipping = useSelector(selectCartShipping)
  const total = useSelector(selectCartTotal)
  const dispatch = useDispatch()
  const toast = useToast()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div className="container">
        <EmptyState
          title="Nothing to checkout"
          description="Add items to your cart first."
          action={
            <Link to="/products">
              <Button type="button">Browse products</Button>
            </Link>
          }
        />
      </div>
    )
  }

  return (
    <div className="container">
      <h1 className="page-title">Checkout</h1>
      <CheckoutStepper step={step} />

      <Card className={styles.card}>
        <Formik
          initialValues={initialValues}
          validationSchema={schemas[step]}
          onSubmit={(values, helpers) => {
            if (step < 2) {
              setStep((s) => s + 1)
              helpers.setTouched({})
              helpers.setSubmitting(false)
              return
            }

            dispatch(
              placeOrder({
                items,
                totals: { subtotal, tax, shipping, total },
                shipping: {
                  fullName: values.fullName,
                  email: values.email,
                  address: values.address,
                  city: values.city,
                  postal: values.postal,
                  country: values.country,
                },
                payment: {
                  brand: 'Card',
                  cardNumber: values.cardNumber,
                },
              }),
            )
            dispatch(clearCart())
            toast.success('Order placed')
            navigate('/orders')
          }}
        >
          {({ values, isSubmitting }) => (
            <Form className={styles.form} noValidate>
              <Suspense fallback={<FormSkeleton fields={4} />}>
                {step === 0 ? <ShippingStep /> : null}
                {step === 1 ? <PaymentStep /> : null}
                {step === 2 ? <ReviewStep values={values} /> : null}
              </Suspense>

              <div className={styles.actions}>
                {step > 0 ? (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setStep((s) => s - 1)}
                  >
                    Back
                  </Button>
                ) : (
                  <span />
                )}
                <Button type="submit" disabled={isSubmitting}>
                  {step === 2 ? 'Place order' : 'Continue'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  )
}
