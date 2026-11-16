import { useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import ProductCard from '@/features/products/components/ProductCard'
import { addToCart } from '@/features/cart/slices/cartSlice'
import { useWishlistAction } from '@/hooks/useWishlistAction'
import { useToast } from '@/context/ToastContext'
import styles from './ProductGrid.module.css'

export default function ProductGrid({ products }) {
  const dispatch = useDispatch()
  const toast = useToast()
  const { toggle, wishIds } = useWishlistAction()

  // Keep handler identity stable for memoized ProductCard children.
  const handleAdd = useCallback(
    (product) => {
      dispatch(addToCart(product))
      toast.success('Added to cart')
    },
    [dispatch, toast],
  )

  // Derive a stable list reference when the parent passes a fresh array of same ids.
  const list = useMemo(() => products ?? [], [products])

  return (
    <div className={styles.grid}>
      {list.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          wished={wishIds.has(product.id)}
          onAdd={handleAdd}
          onToggleWish={toggle}
        />
      ))}
    </div>
  )
}
