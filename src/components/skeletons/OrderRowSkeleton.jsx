import Card from '@/components/ui/Card'
import Skeleton from '@/components/skeletons/Skeleton'
import styles from './OrderRowSkeleton.module.css'

export default function OrderRowSkeleton() {
  return (
    <Card className={styles.row} aria-hidden>
      <Skeleton width="30%" height="1rem" />
      <Skeleton width="20%" height="0.875rem" />
      <Skeleton width="25%" height="1rem" />
      <Skeleton width="4rem" height="1.5rem" radius="8px" />
    </Card>
  )
}
