import ProductDetailSkeleton from '@/components/skeletons/ProductDetailSkeleton'
import Skeleton from '@/components/skeletons/Skeleton'
import styles from './DetailSkeleton.module.css'

export default function DetailSkeleton() {
  return (
    <div
      className={`container ${styles.root}`}
      aria-busy="true"
      aria-label="Loading product"
    >
      <ProductDetailSkeleton />
      <Skeleton width="6rem" height="1.5rem" className={styles.reviews} />
      <Skeleton width="100%" height="6rem" radius="12px" />
    </div>
  )
}
