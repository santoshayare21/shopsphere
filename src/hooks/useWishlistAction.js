import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { toggleWishlist } from '@/features/wishlist/slices/wishlistSlice'
import { selectWishlistIdSet } from '@/features/wishlist/slices/wishlistSelectors'
import { selectIsAuthenticated } from '@/features/auth/slices/authSelectors'
import { useToast } from '@/context/ToastContext'

/**
 * Wishlist requires a signed-in account. Guests are sent to login with return path.
 */
export function useWishlistAction() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const toast = useToast()
  const isAuthed = useSelector(selectIsAuthenticated)
  const wishIds = useSelector(selectWishlistIdSet)

  const toggle = useCallback(
    (product) => {
      if (!isAuthed) {
        toast.error('Sign in to save items to your wishlist')
        navigate('/login', { state: { from: location } })
        return
      }
      const exists = wishIds.has(product.id)
      dispatch(toggleWishlist(product))
      toast.success(exists ? 'Removed from wishlist' : 'Saved to wishlist')
    },
    [dispatch, isAuthed, location, navigate, toast, wishIds],
  )

  return { toggle, wishIds, isAuthed }
}
