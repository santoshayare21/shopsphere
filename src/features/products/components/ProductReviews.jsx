import Card from '@/components/ui/Card'
import Rating from '@/components/ui/Rating'
import EmptyState from '@/components/ui/EmptyState'
import styles from './ProductReviews.module.css'

export default function ProductReviews({ reviews = [] }) {
  if (!reviews.length) {
    return (
      <EmptyState
        title="No reviews yet"
        description="Be the first to share feedback for this product."
      />
    )
  }

  return (
    <section className={styles.root} aria-labelledby="reviews-heading">
      <h2 id="reviews-heading" className={styles.heading}>
        Reviews
      </h2>
      <div className={styles.list}>
        {reviews.map((review, index) => (
          <Card key={`${review.reviewerEmail}-${index}`} className={styles.card}>
            <div className={styles.meta}>
              <strong>{review.reviewerName || 'Customer'}</strong>
              <Rating value={review.rating} />
            </div>
            <p className={styles.comment}>{review.comment}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}
