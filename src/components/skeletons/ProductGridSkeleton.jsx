import ProductCardSkeleton from '@/components/skeletons/ProductCardSkeleton'
import styles from './ProductGridSkeleton.module.css'

export default function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className={styles.grid} aria-busy="true" aria-label="Loading products">
      {Array.from({ length: count }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}
