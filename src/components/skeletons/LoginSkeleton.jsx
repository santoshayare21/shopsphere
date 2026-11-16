import Card from '@/components/ui/Card'
import Skeleton from '@/components/skeletons/Skeleton'
import styles from './LoginSkeleton.module.css'

export default function LoginSkeleton() {
  return (
    <div className={`container ${styles.wrap}`} aria-busy="true" aria-label="Loading login">
      <Card className={styles.card}>
        <Skeleton width="6rem" height="2rem" />
        <Skeleton width="70%" height="1rem" />
        <Skeleton width="100%" height="2.75rem" radius="8px" />
        <Skeleton width="100%" height="2.75rem" radius="8px" />
        <Skeleton width="100%" height="2.75rem" radius="8px" />
      </Card>
    </div>
  )
}
