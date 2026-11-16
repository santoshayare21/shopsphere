import Card from '@/components/ui/Card'
import Skeleton from '@/components/skeletons/Skeleton'
import SkeletonCircle from '@/components/skeletons/SkeletonCircle'
import styles from './ProfileSkeleton.module.css'

export default function ProfileSkeleton() {
  return (
    <Card className={styles.root} aria-busy="true" aria-label="Loading profile">
      <div className={styles.header}>
        <SkeletonCircle size={72} />
        <div className={styles.meta}>
          <Skeleton width="50%" height="1.25rem" />
          <Skeleton width="35%" height="0.875rem" />
        </div>
      </div>
      <div className={styles.form}>
        <Skeleton width="100%" height="2.75rem" radius="8px" />
        <Skeleton width="100%" height="2.75rem" radius="8px" />
        <Skeleton width="100%" height="2.75rem" radius="8px" />
        <Skeleton width="8rem" height="2.75rem" radius="8px" />
      </div>
    </Card>
  )
}
