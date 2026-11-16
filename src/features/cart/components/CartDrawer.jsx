import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Drawer from '@/components/ui/Drawer'
import Button from '@/components/ui/Button'
import EmptyState from '@/components/ui/EmptyState'
import {
  selectCartItems,
  selectCartTotal,
} from '@/features/cart/slices/cartSelectors'
import { removeFromCart, updateQuantity } from '@/features/cart/slices/cartSlice'
import { formatCurrency } from '@/utils/format'
import styles from './CartDrawer.module.css'

export default function CartDrawer({ open, onClose }) {
  const dispatch = useDispatch()
  const items = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)

  return (
    <Drawer open={open} title="Cart" onClose={onClose} side="right">
      {items.length === 0 ? (
        <EmptyState title="Cart is empty" description="Add products to get started." />
      ) : (
        <div className={styles.root}>
          <ul className={styles.list}>
            {items.map((item) => (
              <li key={item.id} className={styles.item}>
                <img src={item.thumbnail} alt="" width={56} height={56} />
                <div className={styles.meta}>
                  <strong>{item.title}</strong>
                  <span>{formatCurrency(item.price)}</span>
                  <label className={styles.qty}>
                    Qty
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: Number(e.target.value) || 1,
                          }),
                        )
                      }
                    />
                  </label>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
          <div className={styles.footer}>
            <p>
              Total <strong>{formatCurrency(total)}</strong>
            </p>
            <Link to="/cart" onClick={onClose}>
              <Button type="button" fullWidth>
                View cart
              </Button>
            </Link>
          </div>
        </div>
      )}
    </Drawer>
  )
}
