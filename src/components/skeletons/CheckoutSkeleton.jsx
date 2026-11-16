import Skeleton from '@/components/skeletons/Skeleton'
import FormSkeleton from '@/components/skeletons/FormSkeleton'
import styles from './CheckoutSkeleton.module.css'

export default function CheckoutSkeleton() {
  return (
    <div
      className={`container ${styles.root}`}
      aria-busy="true"
      aria-label="Loading checkout"
    >
      <Skeleton width="8rem" height="2rem" />
      <div className={styles.stepper}>
        <Skeleton width="6rem" height="2.25rem" radius="8px" />
        <Skeleton width="6rem" height="2.25rem" radius="8px" />
        <Skeleton width="6rem" height="2.25rem" radius="8px" />
      </div>
      <FormSkeleton fields={4} />
    </div>
  )
}
