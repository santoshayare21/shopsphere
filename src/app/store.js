import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '@/app/baseApi'
import { listenerMiddleware } from '@/app/listenerMiddleware'
import authReducer from '@/features/auth/slices/authSlice'
import cartReducer from '@/features/cart/slices/cartSlice'
import wishlistReducer from '@/features/wishlist/slices/wishlistSlice'
import ordersReducer from '@/features/orders/slices/ordersSlice'
import '@/features/products/services/productsApi'
import '@/features/auth/services/authApi'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    orders: ordersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(listenerMiddleware.middleware)
      .concat(baseApi.middleware),
})
