import { useState } from 'react'
import { PackageOpen, SlidersHorizontal } from 'lucide-react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Drawer from '@/components/ui/Drawer'
import Pagination from '@/components/ui/Pagination'
import EmptyState from '@/components/ui/EmptyState'
import ErrorState from '@/components/ui/ErrorState'
import ProductFilters from '@/features/products/components/ProductFilters'
import ProductGrid from '@/features/products/components/ProductGrid'
import ProductGridSkeleton from '@/components/skeletons/ProductGridSkeleton'
import { useDelayedFlag } from '@/hooks/useDelayedFlag'
import { useProductQueryArgs } from '@/features/products/hooks/useProductQueryArgs'
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useSearchProductsQuery,
  useGetProductsByCategoryQuery,
} from '@/features/products/services/productsApi'
import styles from './ProductsPage.module.css'

export default function ProductsPage() {
  const {
    qRaw,
    q,
    category,
    sort,
    page,
    pageSize,
    listArgs,
    searchArgs,
    categoryArgs,
    setParam,
    setPage,
    setSearchInput,
  } = useProductQueryArgs()

  const [draftCategory, setDraftCategory] = useState(category)
  const [draftSort, setDraftSort] = useState(sort)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const { data: categories = [] } = useGetCategoriesQuery()

  const skipSearch = !q
  const skipCategory = Boolean(q) || !category
  const skipList = Boolean(q) || Boolean(category)

  const searchQuery = useSearchProductsQuery(searchArgs, {
    skip: skipSearch,
    selectFromResult: ({ data, isLoading, isFetching, isError, refetch }) => ({
      products: data?.products ?? [],
      total: data?.total ?? 0,
      isLoading,
      isFetching,
      isError,
      refetch,
    }),
  })

  const categoryQuery = useGetProductsByCategoryQuery(categoryArgs, {
    skip: skipCategory,
    selectFromResult: ({ data, isLoading, isFetching, isError, refetch }) => ({
      products: data?.products ?? [],
      total: data?.total ?? 0,
      isLoading,
      isFetching,
      isError,
      refetch,
    }),
  })

  const listQuery = useGetProductsQuery(listArgs, {
    skip: skipList,
    selectFromResult: ({ data, isLoading, isFetching, isError, refetch }) => ({
      products: data?.products ?? [],
      total: data?.total ?? 0,
      isLoading,
      isFetching,
      isError,
      refetch,
    }),
  })

  const active = !skipSearch ? searchQuery : !skipCategory ? categoryQuery : listQuery
  const showSkeleton = useDelayedFlag(active.isLoading)
  const totalPages = Math.max(1, Math.ceil((active.total || 0) / pageSize))

  const applyMobileFilters = () => {
    setParam('category', draftCategory)
    setParam('sort', draftSort)
    setFiltersOpen(false)
  }

  return (
    <div className="container">
      {active.isFetching && !active.isLoading ? (
        <div
          className="fetch-progress"
          role="progressbar"
          aria-label="Updating products"
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="fetch-progress__bar" />
        </div>
      ) : null}

      <h1 className="page-title">Products</h1>
      <p className="page-subtitle">Filter, sort, and browse the catalog.</p>

      <div className={styles.layout}>
        <aside className={styles.sidebar} aria-label="Filters">
          <ProductFilters
            categories={categories}
            category={category}
            sort={sort}
            onCategoryChange={(value) => setParam('category', value)}
            onSortChange={(value) => setParam('sort', value)}
          />
        </aside>

        <div>
          <div className={styles.toolbar}>
            <div className={styles.search}>
              <Input
                label="Search"
                name="q"
                value={qRaw}
                placeholder="Search products"
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <Button
              type="button"
              variant="secondary"
              className={styles.mobileFilters}
              onClick={() => {
                setDraftCategory(category)
                setDraftSort(sort)
                setFiltersOpen(true)
              }}
            >
              <SlidersHorizontal size={16} aria-hidden />
              Filters
            </Button>
          </div>

          {active.isError ? (
            <ErrorState onRetry={active.refetch} />
          ) : showSkeleton ? (
            <ProductGridSkeleton />
          ) : active.products.length === 0 ? (
            <EmptyState
              icon={<PackageOpen size={32} aria-hidden />}
              title="No products found"
              description="Try a different search or clear your filters."
              action={
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setParam('q', '')
                    setParam('category', '')
                  }}
                >
                  Clear filters
                </Button>
              }
            />
          ) : (
            <>
              <ProductGrid products={active.products} />
              <Pagination page={page} totalPages={totalPages} onChange={setPage} />
            </>
          )}
        </div>
      </div>

      <Drawer
        open={filtersOpen}
        title="Filters"
        side="bottom"
        onClose={() => setFiltersOpen(false)}
      >
        <ProductFilters
          categories={categories}
          category={draftCategory}
          sort={draftSort}
          onCategoryChange={setDraftCategory}
          onSortChange={setDraftSort}
          showApply
          onApply={applyMobileFilters}
        />
      </Drawer>
    </div>
  )
}
