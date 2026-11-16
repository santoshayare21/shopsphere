import Skeleton from '@/components/skeletons/Skeleton'
import styles from './Skeleton.module.css'

export default function SkeletonText({ lines = 3, width = '100%' }) {
  return (
    <div aria-hidden>
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          className={styles.text}
          width={i === lines - 1 && lines > 1 ? '70%' : width}
          height="0.875em"
        />
      ))}
    </div>
  )
}
