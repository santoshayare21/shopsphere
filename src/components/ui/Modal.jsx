import { useEffect } from 'react'
import { X } from 'lucide-react'
import IconButton from '@/components/ui/IconButton'
import styles from './Modal.module.css'

export default function Modal({ open, title, onClose, children, labelledBy }) {
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className={styles.root} role="presentation">
      <button
        type="button"
        className={styles.backdrop}
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy || undefined}
        aria-label={labelledBy ? undefined : title}
      >
        <div className={styles.header}>
          <h2 id={labelledBy} className={styles.title}>
            {title}
          </h2>
          <IconButton label="Close" onClick={onClose}>
            <X size={20} aria-hidden />
          </IconButton>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  )
}
