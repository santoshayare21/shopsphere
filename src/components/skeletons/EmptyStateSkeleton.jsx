import Skeleton from '@/components/skeletons/Skeleton'
import SkeletonCircle from '@/components/skeletons/SkeletonCircle'
import styles from './EmptyStateSkeleton.module.css'

/** Layout-matched placeholder for EmptyState panels (avoids full-page grid flash). */
export default function EmptyStateSkeleton() {
  return (
    <div className={styles.root} aria-hidden>
      <SkeletonCircle size={32} />
      <Skeleton width="10rem" height="1.25rem" />
      <Skeleton width="18rem" height="0.875rem" />
      <Skeleton width="9rem" height="2.75rem" radius="8px" className={styles.action} />
    </div>
  )
}
