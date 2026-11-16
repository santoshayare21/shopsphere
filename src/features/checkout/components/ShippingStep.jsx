import FormField from '@/components/forms/FormField'
import FormSelect from '@/components/forms/FormSelect'
import styles from './CheckoutSteps.module.css'

const COUNTRIES = [
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'IN', label: 'India' },
]

export default function ShippingStep() {
  return (
    <div className={styles.grid}>
      <FormField name="fullName" label="Full name" autoComplete="name" />
      <FormField name="email" label="Email" type="email" autoComplete="email" />
      <FormField name="address" label="Address" autoComplete="street-address" />
      <FormField name="city" label="City" autoComplete="address-level2" />
      <FormField name="postal" label="Postal code" autoComplete="postal-code" />
      <FormSelect name="country" label="Country" options={COUNTRIES} />
    </div>
  )
}
