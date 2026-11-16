import { useState } from 'react'
import Skeleton from '@/components/skeletons/Skeleton'
import styles from './LazyImage.module.css'

export default function LazyImage({
  src,
  srcSet,
  sizes,
  alt,
  aspectRatio = '1 / 1',
  className = '',
}) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`${styles.wrap} ${className}`.trim()} style={{ aspectRatio }}>
      {!loaded ? <Skeleton className={styles.skeleton} height="100%" /> : null}
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`${styles.img} ${loaded ? styles.loaded : ''}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}
