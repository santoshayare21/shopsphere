import { baseApi } from '@/app/baseApi'

/**
 * Product catalog endpoints injected into the shared base API.
 */
export const productsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: ({ limit = 12, skip = 0, sortBy, order } = {}) => {
        const params = new URLSearchParams({
          limit: String(limit),
          skip: String(skip),
        })
        if (sortBy) params.set('sortBy', sortBy)
        if (order) params.set('order', order)
        return `/products?${params}`
      },
      providesTags: (result) =>
        result?.products
          ? [
              ...result.products.map(({ id }) => ({ type: 'Product', id })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    searchProducts: build.query({
      query: ({ q, limit = 12, skip = 0 }) => {
        const params = new URLSearchParams({
          q: q || '',
          limit: String(limit),
          skip: String(skip),
        })
        return `/products/search?${params}`
      },
      providesTags: [{ type: 'Products', id: 'SEARCH' }],
    }),
    getCategories: build.query({
      query: () => '/products/categories',
      providesTags: [{ type: 'Categories', id: 'LIST' }],
    }),
    getProductsByCategory: build.query({
      query: ({ slug, limit = 12, skip = 0, sortBy, order }) => {
        const params = new URLSearchParams({
          limit: String(limit),
          skip: String(skip),
        })
        if (sortBy) params.set('sortBy', sortBy)
        if (order) params.set('order', order)
        return `/products/category/${slug}?${params}`
      },
      providesTags: (result, _err, arg) => [
        { type: 'Products', id: `CAT-${arg.slug}` },
      ],
    }),
    getProductById: build.query({
      query: (id) => `/products/${id}`,
      providesTags: (_r, _e, id) => [{ type: 'Product', id }],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useSearchProductsQuery,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
  useGetProductByIdQuery,
  usePrefetch,
} = productsApi
