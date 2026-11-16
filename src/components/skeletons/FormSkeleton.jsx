import Card from '@/components/ui/Card'
import Skeleton from '@/components/skeletons/Skeleton'
import styles from './FormSkeleton.module.css'

export default function FormSkeleton({ fields = 4 }) {
  return (
    <Card className={styles.root} aria-busy="true" aria-label="Loading form">
      {Array.from({ length: fields }, (_, i) => (
        <Skeleton key={i} width="100%" height="2.75rem" radius="8px" />
      ))}
      <Skeleton width="8rem" height="2.75rem" radius="8px" />
    </Card>
  )
}
