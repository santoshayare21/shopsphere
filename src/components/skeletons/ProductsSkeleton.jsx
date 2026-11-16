import Skeleton from '@/components/skeletons/Skeleton'
import ProductGridSkeleton from '@/components/skeletons/ProductGridSkeleton'
import styles from './ProductsSkeleton.module.css'

export default function ProductsSkeleton() {
  return (
    <div
      className={`container ${styles.root}`}
      aria-busy="true"
      aria-label="Loading products"
    >
      <Skeleton width="9rem" height="2rem" />
      <Skeleton width="18rem" height="1rem" className={styles.subtitle} />

      <div className={styles.layout}>
        <aside className={styles.sidebar} aria-hidden>
          <Skeleton width="100%" height="2.75rem" radius="8px" />
          <Skeleton width="100%" height="2.75rem" radius="8px" />
        </aside>

        <div className={styles.content}>
          <div className={styles.toolbar}>
            <Skeleton className={styles.search} height="2.75rem" radius="8px" />
            <Skeleton className={styles.mobileFilter} width="6.5rem" height="2.75rem" radius="8px" />
          </div>
          <ProductGridSkeleton count={8} />
        </div>
      </div>
    </div>
  )
}
