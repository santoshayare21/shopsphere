import FormField from '@/components/forms/FormField'
import styles from './CheckoutSteps.module.css'

export default function PaymentStep() {
  return (
    <div className={styles.grid}>
      <FormField name="cardName" label="Name on card" autoComplete="cc-name" />
      <FormField
        name="cardNumber"
        label="Card number"
        inputMode="numeric"
        autoComplete="cc-number"
        placeholder="4111111111111111"
      />
      <FormField
        name="expiry"
        label="Expiry (MM/YY)"
        autoComplete="cc-exp"
        placeholder="12/28"
      />
      <FormField
        name="cvc"
        label="CVC"
        inputMode="numeric"
        autoComplete="cc-csc"
        placeholder="123"
      />
    </div>
  )
}
