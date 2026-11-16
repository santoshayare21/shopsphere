import { lazy, Suspense } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Heart } from 'lucide-react'
import Button from '@/components/ui/Button'
import IconButton from '@/components/ui/IconButton'
import Rating from '@/components/ui/Rating'
import ErrorState from '@/components/ui/ErrorState'
import ProductDetailSkeleton from '@/components/skeletons/ProductDetailSkeleton'
import Skeleton from '@/components/skeletons/Skeleton'
import { useDelayedFlag } from '@/hooks/useDelayedFlag'
import { useWishlistAction } from '@/hooks/useWishlistAction'
import { formatCurrency } from '@/utils/format'
import { useGetProductByIdQuery } from '@/features/products/services/productsApi'
import { addToCart } from '@/features/cart/slices/cartSlice'
import { useToast } from '@/context/ToastContext'
import styles from './ProductDetailPage.module.css'

const ProductGallery = lazy(
  () => import('@/features/products/components/ProductGallery'),
)
const ProductReviews = lazy(
  () => import('@/features/products/components/ProductReviews'),
)

export default function ProductDetailPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const toast = useToast()
  const { toggle, wishIds } = useWishlistAction()

  const { data: product, isLoading, isFetching, isError, refetch } =
    useGetProductByIdQuery(id)
  const showSkeleton = useDelayedFlag(isLoading || (isFetching && !product))

  // Keep skeleton/empty loading UI while fetching so !product never flashes as an error.
  if (isLoading || (isFetching && !product)) {
    return (
      <div className="container">
        {showSkeleton ? <ProductDetailSkeleton /> : null}
      </div>
    )
  }

  if (isError || !product) {
    return (
      <div className="container">
        <ErrorState title="Product unavailable" onRetry={refetch} />
      </div>
    )
  }

  const wished = wishIds.has(product.id)

  const handleAdd = () => {
    dispatch(addToCart(product))
    toast.success('Added to cart')
  }

  return (
    <div className="container">
      <div className={styles.root}>
        <Suspense
          fallback={<Skeleton width="100%" height="auto" style={{ aspectRatio: '1 / 1' }} />}
        >
          <ProductGallery images={product.images} title={product.title} />
        </Suspense>

        <div className={styles.info}>
          <span className={styles.category}>{product.category}</span>
          <h1 className={styles.title}>{product.title}</h1>
          <Rating value={product.rating} />
          <p className={styles.description}>{product.description}</p>
          <p className={styles.price}>{formatCurrency(product.price)}</p>
          <div className={styles.actions}>
            <Button type="button" onClick={handleAdd}>
              Add to cart
            </Button>
            <IconButton
              label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
              onClick={() => toggle(product)}
              aria-pressed={wished}
            >
              <Heart size={18} aria-hidden fill={wished ? 'currentColor' : 'none'} />
            </IconButton>
          </div>
        </div>
      </div>

      <Suspense fallback={<Skeleton width="100%" height="8rem" radius="12px" />}>
        <ProductReviews reviews={product.reviews || []} />
      </Suspense>

      <div className={styles.stickyBar}>
        <strong>{formatCurrency(product.price)}</strong>
        <Button type="button" onClick={handleAdd}>
          Add to cart
        </Button>
      </div>
    </div>
  )
}
