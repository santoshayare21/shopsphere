import { useSelector } from 'react-redux'
import Skeleton from '@/components/skeletons/Skeleton'
import EmptyStateSkeleton from '@/components/skeletons/EmptyStateSkeleton'
import CartItemSkeleton from '@/components/skeletons/CartItemSkeleton'
import { selectCartItems } from '@/features/cart/slices/cartSelectors'
import styles from './CartSkeleton.module.css'

export default function CartSkeleton() {
  // Persist hydrate already ran — match empty vs items layout.
  const items = useSelector(selectCartItems)
  const count = items.length
  const rows = Math.min(Math.max(count, 0), 3)

  return (
    <div
      className={`container ${styles.root}`}
      aria-busy="true"
      aria-label="Loading cart"
    >
      <Skeleton width="5rem" height="2rem" className={styles.title} />
      {count === 0 ? (
        <EmptyStateSkeleton />
      ) : (
        <div className={styles.layout}>
          <div className={styles.list}>
            {Array.from({ length: rows || 2 }, (_, i) => (
              <CartItemSkeleton key={i} />
            ))}
          </div>
          <div className={styles.summary}>
            <Skeleton width="100%" height="1rem" />
            <Skeleton width="100%" height="1rem" />
            <Skeleton width="100%" height="1rem" />
            <Skeleton width="100%" height="2.75rem" radius="8px" />
          </div>
        </div>
      )}
    </div>
  )
}
