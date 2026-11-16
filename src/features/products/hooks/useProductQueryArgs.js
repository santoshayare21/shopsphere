import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDebounce } from '@/hooks/useDebounce'

const PAGE_SIZE = 12

function parseSort(sort) {
  const [sortBy, order] = (sort || 'title-asc').split('-')
  return { sortBy, order }
}

/**
 * Derive RTK Query args from URL search params (source of truth).
 */
export function useProductQueryArgs() {
  const [params, setParams] = useSearchParams()
  const qRaw = params.get('q') || ''
  const q = useDebounce(qRaw, 400)
  const category = params.get('category') || ''
  const sort = params.get('sort') || 'title-asc'
  const page = Math.max(1, Number(params.get('page') || 1))
  const { sortBy, order } = parseSort(sort)
  const skip = (page - 1) * PAGE_SIZE

  // Memoize arg objects so RTK Query cache keys stay referentially stable.
  const listArgs = useMemo(
    () => ({ limit: PAGE_SIZE, skip, sortBy, order }),
    [skip, sortBy, order],
  )
  const searchArgs = useMemo(() => ({ q, limit: PAGE_SIZE, skip }), [q, skip])
  const categoryArgs = useMemo(
    () => ({ slug: category, limit: PAGE_SIZE, skip, sortBy, order }),
    [category, skip, sortBy, order],
  )

  const setParam = (key, value) => {
    const next = new URLSearchParams(params)
    if (!value) next.delete(key)
    else next.set(key, value)
    if (key !== 'page') next.delete('page')
    setParams(next)
  }

  const setPage = (nextPage) => {
    const next = new URLSearchParams(params)
    if (nextPage <= 1) next.delete('page')
    else next.set('page', String(nextPage))
    setParams(next)
  }

  return {
    qRaw,
    q,
    category,
    sort,
    page,
    pageSize: PAGE_SIZE,
    listArgs,
    searchArgs,
    categoryArgs,
    setParam,
    setPage,
    setSearchInput: (value) => setParam('q', value),
  }
}
