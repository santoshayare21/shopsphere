import { createSlice } from '@reduxjs/toolkit'
import { loadJSON } from '@/utils/storage'

/**
 * Prefer the signed-in user's saved wishlist; fall back to the session wishlist.
 * @returns {Array}
 */
function getInitialWishlistItems() {
  const auth = loadJSON('auth', null)
  const userId = auth?.user?.id
  if (userId != null) {
    const userWishlist = loadJSON(`wishlist:user:${userId}`, null)
    if (Array.isArray(userWishlist?.items)) return userWishlist.items
  }
  const sessionWishlist = loadJSON('wishlist', { items: [] })
  return Array.isArray(sessionWishlist?.items) ? sessionWishlist.items : []
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: getInitialWishlistItems(),
  },
  reducers: {
    toggleWishlist(state, action) {
      const product = action.payload
      const index = state.items.findIndex((i) => i.id === product.id)
      if (index >= 0) {
        state.items.splice(index, 1)
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          rating: product.rating,
        })
      }
    },
    removeFromWishlist(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload)
    },
    clearWishlist(state) {
      state.items = []
    },
    /** Replace wishlist contents (used when restoring after login). */
    replaceWishlist(state, action) {
      state.items = Array.isArray(action.payload) ? action.payload : []
    },
  },
})

export const {
  toggleWishlist,
  removeFromWishlist,
  clearWishlist,
  replaceWishlist,
} = wishlistSlice.actions
export default wishlistSlice.reducer
