import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Heart } from 'lucide-react'
import Button from '@/components/ui/Button'
import EmptyState from '@/components/ui/EmptyState'
import ProductGrid from '@/features/products/components/ProductGrid'
import { selectWishlistItems } from '@/features/wishlist/slices/wishlistSelectors'
import styles from './WishlistPage.module.css'

export default function WishlistPage() {
  const items = useSelector(selectWishlistItems)

  if (items.length === 0) {
    return (
      <div className="container">
        <h1 className="page-title">Wishlist</h1>
        <EmptyState
          icon={<Heart size={32} aria-hidden />}
          title="No saved items"
          description="Sign in and tap the heart on a product to save it here."
          action={
            <Link to="/products">
              <Button type="button">Browse products</Button>
            </Link>
          }
        />
      </div>
    )
  }

  return (
    <div className={`container ${styles.root}`}>
      <h1 className="page-title">Wishlist</h1>
      <p className="page-subtitle">{items.length} saved item{items.length === 1 ? '' : 's'}.</p>
      <ProductGrid products={items} />
    </div>
  )
}
