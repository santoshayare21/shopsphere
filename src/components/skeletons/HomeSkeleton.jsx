import Skeleton from '@/components/skeletons/Skeleton'
import ProductGridSkeleton from '@/components/skeletons/ProductGridSkeleton'
import styles from './HomeSkeleton.module.css'

export default function HomeSkeleton() {
  return (
    <div
      className={`container ${styles.root}`}
      aria-busy="true"
      aria-label="Loading home"
    >
      <div className={styles.hero}>
        <Skeleton width="10rem" height="2.5rem" />
        <Skeleton width="70%" height="1.75rem" />
        <Skeleton width="55%" height="1rem" />
        <div className={styles.actions}>
          <Skeleton width="8rem" height="2.75rem" radius="8px" />
          <Skeleton width="8rem" height="2.75rem" radius="8px" />
        </div>
      </div>

      <div className={styles.section}>
        <Skeleton width="12rem" height="1.5rem" className={styles.sectionTitle} />
        <div className={styles.tags}>
          {Array.from({ length: 8 }, (_, i) => (
            <Skeleton key={i} width="6.5rem" height="2.75rem" radius="8px" />
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <Skeleton width="10rem" height="1.5rem" className={styles.sectionTitle} />
        <ProductGridSkeleton count={8} />
      </div>
    </div>
  )
}
