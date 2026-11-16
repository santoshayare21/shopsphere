import Skeleton from '@/components/skeletons/Skeleton'
import styles from './NavbarSkeleton.module.css'

export default function NavbarSkeleton() {
  return (
    <div className={styles.root} aria-hidden>
      <div className={`container ${styles.inner}`}>
        <Skeleton width="7rem" height="1.5rem" />
        <div className={styles.actions}>
          <Skeleton width="2.75rem" height="2.75rem" radius="8px" />
          <Skeleton width="2.75rem" height="2.75rem" radius="8px" />
          <Skeleton width="2.75rem" height="2.75rem" radius="8px" />
        </div>
      </div>
    </div>
  )
}
