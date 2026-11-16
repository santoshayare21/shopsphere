import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'
import ErrorState from '@/components/ui/ErrorState'
import ProductGrid from '@/features/products/components/ProductGrid'
import ProductGridSkeleton from '@/components/skeletons/ProductGridSkeleton'
import Skeleton from '@/components/skeletons/Skeleton'
import { useDelayedFlag } from '@/hooks/useDelayedFlag'
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from '@/features/products/services/productsApi'
import styles from './HomePage.module.css'

export default function HomePage() {
  const categoriesQuery = useGetCategoriesQuery(undefined, {
    selectFromResult: ({ data, isLoading, isError, refetch, error }) => ({
      categories: (data || []).slice(0, 8),
      isLoading,
      isError,
      refetch,
      error,
    }),
  })

  const productsQuery = useGetProductsQuery(
    { limit: 10, skip: 0, sortBy: 'rating', order: 'desc' },
    {
      selectFromResult: ({ data, isLoading, isError, refetch }) => ({
        products: data?.products ?? [],
        isLoading,
        isError,
        refetch,
      }),
    },
  )

  const showProdSkeleton = useDelayedFlag(productsQuery.isLoading)

  return (
    <div className="container">
      <section className={styles.hero}>
        <p className={styles.brand}>ShopSphere</p>
        <h1 className={styles.headline}>Minimal shopping with a fast, flat UI</h1>
        <p className={styles.lead}>
          Browse curated categories, save favorites, and checkout in a few steps.
        </p>
        <div className={styles.actions}>
          <Link to="/products">
            <Button type="button">Shop products</Button>
          </Link>
          <Link to="/wishlist">
            <Button variant="secondary" type="button">
              View wishlist
            </Button>
          </Link>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="categories-heading">
        <h2 id="categories-heading" className={styles.sectionTitle}>
          Featured categories
        </h2>
        {categoriesQuery.isError ? (
          <ErrorState onRetry={categoriesQuery.refetch} />
        ) : categoriesQuery.isLoading ? (
          <div className={styles.categories} aria-busy="true" aria-label="Loading categories">
            {Array.from({ length: 8 }, (_, i) => (
              <Skeleton
                key={i}
                width="6.5rem"
                height="2.75rem"
                radius="8px"
                className={styles.categorySkeleton}
              />
            ))}
          </div>
        ) : (
          <div className={styles.categories}>
            {categoriesQuery.categories.map((cat) => {
              const slug = typeof cat === 'string' ? cat : cat.slug
              const name = typeof cat === 'string' ? cat : cat.name
              return (
                <Link
                  key={slug}
                  to={`/products?category=${encodeURIComponent(slug)}`}
                  className={styles.category}
                >
                  {name}
                </Link>
              )
            })}
          </div>
        )}
      </section>

      <section className={styles.section} aria-labelledby="top-products-heading">
        <h2 id="top-products-heading" className={styles.sectionTitle}>
          Top products
        </h2>
        {productsQuery.isError ? (
          <ErrorState onRetry={productsQuery.refetch} />
        ) : productsQuery.isLoading ? (
          showProdSkeleton ? <ProductGridSkeleton count={10} /> : null
        ) : (
          <ProductGrid products={productsQuery.products} />
        )}
      </section>
    </div>
  )
}
