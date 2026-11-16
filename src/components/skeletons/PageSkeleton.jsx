import Skeleton from '@/components/skeletons/Skeleton'
import ProductGridSkeleton from '@/components/skeletons/ProductGridSkeleton'
import styles from './PageSkeleton.module.css'

export default function PageSkeleton() {
  return (
    <div className={`container ${styles.root}`} aria-busy="true" aria-label="Loading page">
      <Skeleton width="40%" height="2rem" />
      <Skeleton width="60%" height="1rem" />
      <ProductGridSkeleton count={8} />
    </div>
  )
}
