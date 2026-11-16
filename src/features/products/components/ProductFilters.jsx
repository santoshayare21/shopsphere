import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import styles from './ProductFilters.module.css'

const SORT_OPTIONS = [
  { value: 'title-asc', label: 'Name A–Z' },
  { value: 'title-desc', label: 'Name Z–A' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Top rated' },
]

export default function ProductFilters({
  categories = [],
  category,
  sort,
  onCategoryChange,
  onSortChange,
  onApply,
  showApply = false,
}) {
  const categoryOptions = [
    { value: '', label: 'All categories' },
    ...categories.map((c) => ({
      value: typeof c === 'string' ? c : c.slug,
      label: typeof c === 'string' ? c : c.name,
    })),
  ]

  return (
    <div className={styles.root}>
      <Select
        label="Category"
        name="category"
        value={category}
        options={categoryOptions}
        onChange={onCategoryChange}
      />
      <Select
        label="Sort by"
        name="sort"
        value={sort}
        options={SORT_OPTIONS}
        onChange={onSortChange}
      />
      {showApply ? (
        <Button type="button" fullWidth onClick={onApply}>
          Apply filters
        </Button>
      ) : null}
    </div>
  )
}
