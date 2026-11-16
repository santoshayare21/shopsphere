import { baseApi } from '@/app/baseApi'

/**
 * Auth endpoints — login and current user profile from DummyJSON.
 */
export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'User', id: 'ME' }],
    }),
    getMe: build.query({
      query: () => '/auth/me',
      providesTags: [{ type: 'User', id: 'ME' }],
    }),
  }),
})

export const { useLoginMutation, useGetMeQuery, useLazyGetMeQuery } = authApi
