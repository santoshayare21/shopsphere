import { useField } from 'formik'
import Select from '@/components/ui/Select'

/** Formik-aware select wrapper around the shared custom Select UI. */
export default function FormSelect({ label, options, ...props }) {
  const [field, meta, helpers] = useField(props)
  return (
    <Select
      label={label}
      options={options}
      name={field.name}
      value={field.value}
      onChange={(next) => helpers.setValue(next)}
      onBlur={() => helpers.setTouched(true)}
      error={meta.touched && meta.error ? meta.error : undefined}
      {...props}
    />
  )
}
