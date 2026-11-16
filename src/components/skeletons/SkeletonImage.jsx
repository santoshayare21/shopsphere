import Skeleton from '@/components/skeletons/Skeleton'
import styles from './Skeleton.module.css'

export default function SkeletonImage({ aspectRatio = '1 / 1', className = '' }) {
  return (
    <Skeleton
      className={`${styles.image} ${className}`.trim()}
      height="auto"
      style={{ aspectRatio }}
    />
  )
}
