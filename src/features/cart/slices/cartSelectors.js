import { createSelector } from '@reduxjs/toolkit'

const TAX_RATE = 0.08
const SHIPPING_FLAT = 9.99
const FREE_SHIPPING_AT = 100

const selectCartItems = (state) => state.cart.items

/** Derived cart totals — memoized to avoid recalculating on unrelated store updates. */
export const selectCartItemCount = createSelector([selectCartItems], (items) =>
  items.reduce((sum, item) => sum + item.quantity, 0),
)

export const selectCartSubtotal = createSelector([selectCartItems], (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0),
)

export const selectCartTax = createSelector(
  [selectCartSubtotal],
  (subtotal) => subtotal * TAX_RATE,
)

export const selectCartShipping = createSelector([selectCartSubtotal], (subtotal) => {
  if (subtotal <= 0) return 0
  return subtotal >= FREE_SHIPPING_AT ? 0 : SHIPPING_FLAT
})

export const selectCartTotal = createSelector(
  [selectCartSubtotal, selectCartTax, selectCartShipping],
  (subtotal, tax, shipping) => subtotal + tax + shipping,
)

export { selectCartItems }
