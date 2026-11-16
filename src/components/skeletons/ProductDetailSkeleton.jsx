import Skeleton from '@/components/skeletons/Skeleton'
import SkeletonImage from '@/components/skeletons/SkeletonImage'
import SkeletonText from '@/components/skeletons/SkeletonText'
import styles from './ProductDetailSkeleton.module.css'

export default function ProductDetailSkeleton() {
  return (
    <div className={styles.root} aria-busy="true" aria-label="Loading product">
      <div className={styles.gallery}>
        <SkeletonImage aspectRatio="1 / 1" />
        <div className={styles.thumbs}>
          <Skeleton width="100%" height="4rem" radius="8px" />
          <Skeleton width="100%" height="4rem" radius="8px" />
          <Skeleton width="100%" height="4rem" radius="8px" />
        </div>
      </div>
      <div className={styles.info}>
        <Skeleton width="40%" height="0.875rem" />
        <Skeleton width="85%" height="1.75rem" />
        <SkeletonText lines={4} />
        <Skeleton width="30%" height="1.5rem" />
        <Skeleton width="100%" height="2.75rem" radius="8px" />
      </div>
    </div>
  )
}
