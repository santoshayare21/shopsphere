import { createSelector } from '@reduxjs/toolkit'

const selectWishlistItems = (state) => state.wishlist.items

export const selectWishlistCount = createSelector(
  [selectWishlistItems],
  (items) => items.length,
)

/** Memoized Set of wishlist IDs for O(1) ProductCard checks. */
export const selectWishlistIdSet = createSelector([selectWishlistItems], (items) =>
  new Set(items.map((i) => i.id)),
)

export { selectWishlistItems }
