import { useSelector } from 'react-redux'
import {
  selectCartItems,
  selectCartTotal,
} from '@/features/cart/slices/cartSelectors'
import { formatCurrency } from '@/utils/format'
import styles from './CheckoutSteps.module.css'

export default function ReviewStep({ values }) {
  const items = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)

  return (
    <div className={styles.review}>
      <section>
        <h3>Shipping</h3>
        <p>
          {values.fullName}
          <br />
          {values.address}, {values.city} {values.postal}
          <br />
          {values.country}
          <br />
          {values.email}
        </p>
      </section>
      <section>
        <h3>Payment</h3>
        <p>
          {values.cardName}
          <br />
          Card ending in {String(values.cardNumber).replace(/\D/g, '').slice(-4)}
        </p>
      </section>
      <section>
        <h3>Items</h3>
        <ul className={styles.items}>
          {items.map((item) => (
            <li key={item.id}>
              <span>
                {item.title} × {item.quantity}
              </span>
              <span>{formatCurrency(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <p className={styles.total}>
          Total <strong>{formatCurrency(total)}</strong>
        </p>
      </section>
    </div>
  )
}
