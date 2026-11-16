import Skeleton from '@/components/skeletons/Skeleton'
import styles from './Skeleton.module.css'

export default function SkeletonCircle({ size = 40 }) {
  return (
    <Skeleton
      className={styles.circle}
      width={size}
      height={size}
      radius="9999px"
    />
  )
}
