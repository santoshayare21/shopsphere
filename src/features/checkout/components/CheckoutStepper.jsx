import styles from './CheckoutStepper.module.css'

const STEPS = [
  { id: 0, label: 'Shipping' },
  { id: 1, label: 'Payment' },
  { id: 2, label: 'Review' },
]

export default function CheckoutStepper({ step }) {
  return (
    <ol className={styles.root} aria-label="Checkout progress">
      {STEPS.map((item) => {
        const active = item.id === step
        const done = item.id < step
        return (
          <li
            key={item.id}
            className={`${styles.item} ${active ? styles.active : ''} ${done ? styles.done : ''}`}
            aria-current={active ? 'step' : undefined}
          >
            <span className={styles.index}>{item.id + 1}</span>
            <span className={styles.label}>{item.label}</span>
          </li>
        )
      })}
      <li className={styles.mobileStatus} aria-live="polite">
        Step {step + 1} of {STEPS.length}
      </li>
    </ol>
  )
}
