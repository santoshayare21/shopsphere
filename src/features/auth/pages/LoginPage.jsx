import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import FormField from '@/components/forms/FormField'
import { useLoginMutation } from '@/features/auth/services/authApi'
import { setCredentials } from '@/features/auth/slices/authSlice'
import { useToast } from '@/context/ToastContext'
import styles from './LoginPage.module.css'

const schema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
})

export default function LoginPage() {
  const [login] = useLoginMutation()
  const dispatch = useDispatch()
  const toast = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  return (
    <div className={`container ${styles.wrap}`}>
      <Card className={styles.card}>
        <h1 className="page-title">Sign in</h1>
        <p className="page-subtitle">
          Demo: <code>emilys</code> / <code>emilyspass</code>
        </p>
        <Formik
          initialValues={{ username: 'emilys', password: 'emilyspass' }}
          validationSchema={schema}
          onSubmit={async (values, helpers) => {
            try {
              const result = await login({
                username: values.username,
                password: values.password,
                expiresInMins: 60,
              }).unwrap()
              dispatch(
                setCredentials({
                  token: result.accessToken || result.token,
                  user: result,
                }),
              )
              toast.success('Welcome back')
              navigate(from, { replace: true })
            } catch (err) {
              toast.error(err?.data?.message || 'Login failed')
              helpers.setSubmitting(false)
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className={styles.form} noValidate>
              <FormField name="username" label="Username" autoComplete="username" />
              <FormField
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
              />
              <Button type="submit" fullWidth disabled={isSubmitting}>
                {isSubmitting ? 'Signing in…' : 'Sign in'}
              </Button>
            </Form>
          )}
        </Formik>
        <p className={styles.hint}>
          Need an account? This demo uses DummyJSON users only.{' '}
          <Link to="/products">Continue shopping</Link>
        </p>
      </Card>
    </div>
  )
}
