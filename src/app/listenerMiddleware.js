import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'
import { loadJSON, saveJSON } from '@/utils/storage'
import {
  setCredentials,
  updateUser,
  logout,
} from '@/features/auth/slices/authSlice'
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  replaceCart,
} from '@/features/cart/slices/cartSlice'
import {
  toggleWishlist,
  removeFromWishlist,
  clearWishlist,
  replaceWishlist,
} from '@/features/wishlist/slices/wishlistSlice'
import { placeOrder } from '@/features/orders/slices/ordersSlice'

/**
 * @param {'cart'|'wishlist'} kind
 * @param {{ id?: number|string }|null|undefined} user
 * @returns {string|null}
 */
function userScopedKey(kind, user) {
  return user?.id != null ? `${kind}:user:${user.id}` : null
}

/**
 * Persist auth, cart, wishlist, and orders via listener middleware
 * (no localStorage calls inside components).
 */
export const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  matcher: isAnyOf(setCredentials, updateUser, logout),
  effect: (_action, api) => {
    const { token, user } = api.getState().auth
    saveJSON('auth', { token, user })
  },
})

// Snapshot user-scoped cart/wishlist, then clear session copies for guests.
listenerMiddleware.startListening({
  actionCreator: logout,
  effect: (_action, api) => {
    const prev = api.getOriginalState()
    const cartKey = userScopedKey('cart', prev.auth.user)
    const wishlistKey = userScopedKey('wishlist', prev.auth.user)
    if (cartKey) saveJSON(cartKey, { items: prev.cart.items })
    if (wishlistKey) saveJSON(wishlistKey, { items: prev.wishlist.items })
    api.dispatch(clearCart())
    api.dispatch(clearWishlist())
  },
})

// Restore that user's cart and wishlist after a successful login.
listenerMiddleware.startListening({
  actionCreator: setCredentials,
  effect: (action, api) => {
    const user = action.payload.user
    const cartKey = userScopedKey('cart', user)
    const wishlistKey = userScopedKey('wishlist', user)

    if (cartKey) {
      const saved = loadJSON(cartKey, { items: [] })
      api.dispatch(replaceCart(Array.isArray(saved?.items) ? saved.items : []))
    }
    if (wishlistKey) {
      const saved = loadJSON(wishlistKey, { items: [] })
      api.dispatch(
        replaceWishlist(Array.isArray(saved?.items) ? saved.items : []),
      )
    }
  },
})

listenerMiddleware.startListening({
  matcher: isAnyOf(
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    replaceCart,
  ),
  effect: (_action, api) => {
    const items = api.getState().cart.items
    saveJSON('cart', { items })
    const userKey = userScopedKey('cart', api.getState().auth.user)
    if (userKey) saveJSON(userKey, { items })
  },
})

listenerMiddleware.startListening({
  matcher: isAnyOf(
    toggleWishlist,
    removeFromWishlist,
    clearWishlist,
    replaceWishlist,
  ),
  effect: (_action, api) => {
    const items = api.getState().wishlist.items
    saveJSON('wishlist', { items })
    const userKey = userScopedKey('wishlist', api.getState().auth.user)
    if (userKey) saveJSON(userKey, { items })
  },
})

listenerMiddleware.startListening({
  actionCreator: placeOrder,
  effect: (_action, api) => {
    saveJSON('orders', { items: api.getState().orders.items })
  },
})
