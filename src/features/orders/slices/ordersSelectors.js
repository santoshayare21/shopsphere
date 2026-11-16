import { createSelector } from '@reduxjs/toolkit'

const selectOrdersState = (state) => state.orders.items

/** Newest-first orders list memoized for the orders page. */
export const selectOrders = createSelector([selectOrdersState], (items) => items)
