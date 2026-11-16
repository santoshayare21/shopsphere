import { useSelector } from 'react-redux'
import Skeleton from '@/components/skeletons/Skeleton'
import EmptyStateSkeleton from '@/components/skeletons/EmptyStateSkeleton'
import OrderRowSkeleton from '@/components/skeletons/OrderRowSkeleton'
import { selectOrders } from '@/features/orders/slices/ordersSelectors'
import styles from './OrdersSkeleton.module.css'

export default function OrdersSkeleton() {
  // Persist hydrate already ran — match empty vs rows to avoid layout jump.
  const orders = useSelector(selectOrders)
  const count = Math.min(orders.length, 3)

  return (
    <div
      className={`container ${styles.root}`}
      aria-busy="true"
      aria-label="Loading orders"
    >
      <Skeleton width="7rem" height="2rem" className={styles.title} />
      {count === 0 ? (
        <EmptyStateSkeleton />
      ) : (
        <>
          <Skeleton width="16rem" height="1rem" className={styles.subtitle} />
          <ul className={styles.list}>
            {Array.from({ length: count }, (_, i) => (
              <li key={i}>
                <OrderRowSkeleton />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
