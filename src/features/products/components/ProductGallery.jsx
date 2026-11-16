import { useState } from 'react'
import LazyImage from '@/components/layout/LazyImage'
import styles from './ProductGallery.module.css'

export default function ProductGallery({ images = [], title }) {
  const list = images.length ? images : []
  const [active, setActive] = useState(0)
  const current = list[active] || list[0]

  if (!current) return null

  return (
    <div className={styles.root}>
      <LazyImage
        className={styles.main}
        src={current}
        alt={`${title} image ${active + 1}`}
        aspectRatio="1 / 1"
      />
      {list.length > 1 ? (
        <div className={styles.thumbs} role="list">
          {list.map((src, index) => (
            <button
              key={src + index}
              type="button"
              className={`${styles.thumb} ${index === active ? styles.active : ''}`}
              onClick={() => setActive(index)}
              aria-label={`Show image ${index + 1}`}
              aria-current={index === active}
            >
              <img src={src} alt="" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
