import { useField } from 'formik'
import Input from '@/components/ui/Input'

/** Formik-aware text input wrapper around the shared Input UI. */
export default function FormField({ label, ...props }) {
  const [field, meta] = useField(props)
  return (
    <Input
      label={label}
      {...field}
      {...props}
      error={meta.touched && meta.error ? meta.error : undefined}
    />
  )
}
