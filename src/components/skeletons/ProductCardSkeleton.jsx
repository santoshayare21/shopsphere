import Card from '@/components/ui/Card'
import Skeleton from '@/components/skeletons/Skeleton'
import SkeletonImage from '@/components/skeletons/SkeletonImage'
import SkeletonText from '@/components/skeletons/SkeletonText'
import styles from './ProductCardSkeleton.module.css'

export default function ProductCardSkeleton() {
  return (
    <Card className={styles.card} aria-hidden>
      <SkeletonImage aspectRatio="1 / 1" />
      <div className={styles.body}>
        <SkeletonText lines={2} />
        <Skeleton width="40%" height="1rem" />
        <Skeleton width="55%" height="1.25rem" />
      </div>
    </Card>
  )
}
