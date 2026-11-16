import Skeleton from '@/components/skeletons/Skeleton'
import ProfileSkeleton from '@/components/skeletons/ProfileSkeleton'
import styles from './ProfilePageSkeleton.module.css'

export default function ProfilePageSkeleton() {
  return (
    <div
      className={`container ${styles.root}`}
      aria-busy="true"
      aria-label="Loading profile"
    >
      <Skeleton width="6rem" height="2rem" />
      <Skeleton width="14rem" height="1rem" className={styles.subtitle} />
      <ProfileSkeleton />
    </div>
  )
}
