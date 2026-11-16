import { useSelector } from 'react-redux'
import Skeleton from '@/components/skeletons/Skeleton'
import EmptyStateSkeleton from '@/components/skeletons/EmptyStateSkeleton'
import ProductGridSkeleton from '@/components/skeletons/ProductGridSkeleton'
import { selectWishlistCount } from '@/features/wishlist/slices/wishlistSelectors'
import styles from './WishlistSkeleton.module.css'

export default function WishlistSkeleton() {
  // Persist hydrate already ran — match empty vs grid to avoid full-page flash.
  const count = useSelector(selectWishlistCount)
  const gridCount = Math.min(Math.max(count, 0), 4)

  return (
    <div
      className={`container ${styles.root}`}
      aria-busy="true"
      aria-label="Loading wishlist"
    >
      <Skeleton width="8rem" height="2rem" className={styles.title} />
      {count === 0 ? (
        <EmptyStateSkeleton />
      ) : (
        <>
          <Skeleton width="10rem" height="1rem" className={styles.subtitle} />
          <ProductGridSkeleton count={gridCount || 2} />
        </>
      )}
    </div>
  )
}
