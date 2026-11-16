import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

/**
 * Shared RTK Query API — DummyJSON only. Auth token attached via prepareHeaders.
 */
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token
      if (token) headers.set('Authorization', `Bearer ${token}`)
      return headers
    },
  }),
  tagTypes: ['Product', 'Products', 'Categories', 'User'],
  keepUnusedDataFor: 60,
  endpoints: () => ({}),
})
