import { lazy, Suspense } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import FormField from '@/components/forms/FormField'
import ProfileSkeleton from '@/components/skeletons/ProfileSkeleton'
import { selectAuthUser } from '@/features/auth/slices/authSelectors'
import { logout, updateUser } from '@/features/auth/slices/authSlice'
import { useToast } from '@/context/ToastContext'
import styles from './ProfilePage.module.css'

const ThemePanel = lazy(() => import('@/features/profile/components/ThemePanel'))

const schema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  phone: Yup.string().required('Phone is required'),
})

export default function ProfilePage() {
  const user = useSelector(selectAuthUser)
  const dispatch = useDispatch()
  const toast = useToast()
  const navigate = useNavigate()

  if (!user) {
    return (
      <div className="container">
        <ProfileSkeleton />
      </div>
    )
  }

  return (
    <div className="container">
      <h1 className="page-title">Profile</h1>
      <p className="page-subtitle">Update your local profile details.</p>

      <div className={styles.layout}>
        <Card className={styles.card}>
          <Formik
            enableReinitialize
            initialValues={{
              firstName: user.firstName || '',
              lastName: user.lastName || '',
              email: user.email || '',
              phone: user.phone || '',
            }}
            validationSchema={schema}
            onSubmit={(values, helpers) => {
              dispatch(updateUser(values))
              toast.success('Profile updated')
              helpers.setSubmitting(false)
            }}
          >
            {({ isSubmitting }) => (
              <Form className={styles.form} noValidate>
                <FormField name="firstName" label="First name" />
                <FormField name="lastName" label="Last name" />
                <FormField name="email" label="Email" type="email" />
                <FormField name="phone" label="Phone" />
                <div className={styles.actions}>
                  <Button type="submit" disabled={isSubmitting}>
                    Save changes
                  </Button>
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => {
                      dispatch(logout())
                      toast.success('Signed out')
                      navigate('/login')
                    }}
                  >
                    Sign out
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Card>

        <Suspense fallback={<ProfileSkeleton />}>
          <ThemePanel />
        </Suspense>
      </div>
    </div>
  )
}
