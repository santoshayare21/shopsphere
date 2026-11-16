import { ChevronLeft, ChevronRight } from 'lucide-react'
import IconButton from '@/components/ui/IconButton'
import styles from './Pagination.module.css'

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null

  return (
    <nav className={styles.nav} aria-label="Pagination">
      <IconButton
        label="Previous page"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      >
        <ChevronLeft size={20} aria-hidden />
      </IconButton>
      <span className={styles.status} aria-live="polite">
        Page {page} of {totalPages}
      </span>
      <IconButton
        label="Next page"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
      >
        <ChevronRight size={20} aria-hidden />
      </IconButton>
    </nav>
  )
}
