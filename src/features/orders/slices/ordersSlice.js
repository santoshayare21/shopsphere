import { createSlice, nanoid } from '@reduxjs/toolkit'
import { loadJSON } from '@/utils/storage'

const persisted = loadJSON('orders', { items: [] })

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    items: Array.isArray(persisted?.items) ? persisted.items : [],
  },
  reducers: {
    placeOrder: {
      reducer(state, action) {
        state.items.unshift(action.payload)
      },
      prepare({ items, totals, shipping, payment }) {
        return {
          payload: {
            id: nanoid(),
            createdAt: new Date().toISOString(),
            items,
            totals,
            shipping,
            payment: {
              brand: payment.brand,
              last4: payment.cardNumber?.replace(/\D/g, '').slice(-4),
            },
            status: 'confirmed',
          },
        }
      },
    },
  },
})

export const { placeOrder } = ordersSlice.actions
export default ordersSlice.reducer
