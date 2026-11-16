import { Star } from 'lucide-react'
import styles from './Rating.module.css'

export default function Rating({ value = 0, count }) {
  const rating = Math.max(0, Math.min(5, Number(value) || 0))
  return (
    <div className={styles.root} aria-label={`Rating ${rating} out of 5`}>
      <Star size={14} className={styles.star} aria-hidden fill="currentColor" />
      <span className={styles.value}>{rating.toFixed(1)}</span>
      {typeof count === 'number' ? (
        <span className={styles.count}>({count})</span>
      ) : null}
    </div>
  )
}
