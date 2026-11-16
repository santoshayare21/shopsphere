import { lazy, Suspense, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ShoppingBag } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import EmptyState from '@/components/ui/EmptyState'
import CartItemSkeleton from '@/components/skeletons/CartItemSkeleton'
import {
  selectCartItems,
  selectCartSubtotal,
  selectCartTax,
  selectCartShipping,
  selectCartTotal,
} from '@/features/cart/slices/cartSelectors'
import { removeFromCart, updateQuantity } from '@/features/cart/slices/cartSlice'
import { formatCurrency } from '@/utils/format'
import styles from './CartPage.module.css'

const CartDrawer = lazy(() => import('@/features/cart/components/CartDrawer'))

export default function CartPage() {
  const dispatch = useDispatch()
  const items = useSelector(selectCartItems)
  const subtotal = useSelector(selectCartSubtotal)
  const tax = useSelector(selectCartTax)
  const shipping = useSelector(selectCartShipping)
  const total = useSelector(selectCartTotal)
  const [drawerOpen, setDrawerOpen] = useState(false)

  if (items.length === 0) {
    return (
      <div className="container">
        <h1 className="page-title">Cart</h1>
        <EmptyState
          icon={<ShoppingBag size={32} aria-hidden />}
          title="Your cart is empty"
          description="Browse products and add items to continue."
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
      <h1 className="page-title">Cart</h1>
      <p className="page-subtitle">Review quantities before checkout.</p>

      <div className={styles.layout}>
        <ul className={styles.list}>
          {items.map((item) => (
            <Card as="li" key={item.id} className={styles.item}>
              <img src={item.thumbnail} alt="" loading="lazy" decoding="async" />
              <div className={styles.meta}>
                <span className={styles.title}>{item.title}</span>
                <span className={styles.price}>{formatCurrency(item.price)}</span>
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
              <span className={styles.line}>
                {formatCurrency(item.price * item.quantity)}
              </span>
              <Button
                type="button"
                variant="ghost"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                Remove
              </Button>
            </Card>
          ))}
        </ul>

        <Card className={styles.summary}>
          <div className={styles.row}>
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className={styles.row}>
            <span>Tax</span>
            <span>{formatCurrency(tax)}</span>
          </div>
          <div className={styles.row}>
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
          </div>
          <div className={`${styles.row} ${styles.total}`}>
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
          <Link to="/checkout">
            <Button type="button" fullWidth>
              Checkout
            </Button>
          </Link>
          <Button type="button" variant="secondary" onClick={() => setDrawerOpen(true)}>
            Quick cart drawer
          </Button>
        </Card>
      </div>

      <div className={styles.mobileSummary}>
        <strong>{formatCurrency(total)}</strong>
        <Link to="/checkout">
          <Button type="button">Checkout</Button>
        </Link>
      </div>

      <Suspense fallback={<CartItemSkeleton />}>
        <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      </Suspense>
    </div>
  )
}
