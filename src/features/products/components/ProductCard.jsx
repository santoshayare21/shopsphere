import { memo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import IconButton from '@/components/ui/IconButton'
import Rating from '@/components/ui/Rating'
import LazyImage from '@/components/layout/LazyImage'
import { formatCurrency } from '@/utils/format'
import { usePrefetch } from '@/features/products/services/productsApi'
import styles from './ProductCard.module.css'

function ProductCard({ product, wished, onAdd, onToggleWish }) {
  const prefetch = usePrefetch('getProductById')

  // Stable handlers so React.memo on this card stays effective.
  const handlePrefetch = useCallback(() => {
    prefetch(product.id)
  }, [prefetch, product.id])

  const handleAdd = useCallback(
    (e) => {
      e.preventDefault()
      onAdd?.(product)
    },
    [onAdd, product],
  )

  const handleWish = useCallback(
    (e) => {
      e.preventDefault()
      onToggleWish?.(product)
    },
    [onToggleWish, product],
  )

  const thumb = product.thumbnail
  const full = product.images?.[0] || thumb

  return (
    <Card className={styles.card}>
      <Link
        to={`/products/${product.id}`}
        className={styles.link}
        onMouseEnter={handlePrefetch}
        onFocus={handlePrefetch}
      >
        <LazyImage
          className={styles.image}
          src={thumb}
          srcSet={`${thumb} 300w, ${full} 800w`}
          sizes="(max-width: 400px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
          alt={product.title}
          aspectRatio="1 / 1"
        />
        <div className={styles.body}>
          <span className={styles.category}>{product.category}</span>
          <h3 className={styles.title}>{product.title}</h3>
          <div className={styles.meta}>
            <Rating value={product.rating} />
            <span className={styles.price}>{formatCurrency(product.price)}</span>
          </div>
        </div>
      </Link>
      <div className={styles.actions}>
        <Button type="button" onClick={handleAdd}>
          Add to cart
        </Button>
        <IconButton
          label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={handleWish}
          aria-pressed={wished}
        >
          <Heart
            size={18}
            aria-hidden
            fill={wished ? 'currentColor' : 'none'}
          />
        </IconButton>
      </div>
    </Card>
  )
}

// Memoize cards so grid re-renders only touch changed items.
export default memo(ProductCard)
