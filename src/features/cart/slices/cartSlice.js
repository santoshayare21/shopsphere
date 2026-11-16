import { createSlice } from '@reduxjs/toolkit'
import { loadJSON } from '@/utils/storage'

/**
 * Prefer the signed-in user's saved cart; fall back to the active session cart.
 * @returns {Array}
 */
function getInitialCartItems() {
  const auth = loadJSON('auth', null)
  const userId = auth?.user?.id
  if (userId != null) {
    const userCart = loadJSON(`cart:user:${userId}`, null)
    if (Array.isArray(userCart?.items)) return userCart.items
  }
  const sessionCart = loadJSON('cart', { items: [] })
  return Array.isArray(sessionCart?.items) ? sessionCart.items : []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: getInitialCartItems(),
  },
  reducers: {
    addToCart(state, action) {
      const product = action.payload
      const existing = state.items.find((i) => i.id === product.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          quantity: 1,
        })
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload)
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload
      const item = state.items.find((i) => i.id === id)
      if (!item) return
      item.quantity = Math.max(1, quantity)
    },
    clearCart(state) {
      state.items = []
    },
    /** Replace cart contents (used when restoring a user cart after login). */
    replaceCart(state, action) {
      state.items = Array.isArray(action.payload) ? action.payload : []
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  replaceCart,
} = cartSlice.actions
export default cartSlice.reducer
