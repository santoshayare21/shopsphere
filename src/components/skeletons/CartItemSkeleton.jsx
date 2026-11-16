import Card from '@/components/ui/Card'
import Skeleton from '@/components/skeletons/Skeleton'
import styles from './CartItemSkeleton.module.css'

export default function CartItemSkeleton() {
  return (
    <Card className={styles.item} aria-hidden>
      <Skeleton className={styles.image} width="5rem" height="5rem" radius="8px" />
      <div className={styles.body}>
        <Skeleton width="70%" height="1rem" />
        <Skeleton width="40%" height="0.875rem" />
        <Skeleton width="30%" height="1.25rem" />
      </div>
      <Skeleton width="5rem" height="2.75rem" radius="8px" />
    </Card>
  )
}
