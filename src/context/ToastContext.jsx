import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'
import { X } from 'lucide-react'
import styles from './ToastContext.module.css'

const ToastContext = createContext(null)
const EXIT_MS = 200
let toastId = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const timersRef = useRef(new Map())

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
    const timers = timersRef.current.get(id)
    if (timers) {
      timers.forEach(clearTimeout)
      timersRef.current.delete(id)
    }
  }, [])

  const dismiss = useCallback(
    (id) => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, exiting: true } : t)),
      )
      const exitTimer = window.setTimeout(() => remove(id), EXIT_MS)
      const existing = timersRef.current.get(id) || []
      timersRef.current.set(id, [...existing, exitTimer])
    },
    [remove],
  )

  const push = useCallback(
    (message, type = 'success', duration = 3200) => {
      const id = ++toastId
      setToasts((prev) => [...prev, { id, message, type, exiting: false }])
      const autoTimer = window.setTimeout(() => dismiss(id), duration)
      timersRef.current.set(id, [autoTimer])
    },
    [dismiss],
  )

  // Memoize context value so toast consumers stay stable across renders.
  const value = useMemo(
    () => ({
      success: (message) => push(message, 'success'),
      error: (message) => push(message, 'error'),
      dismiss,
    }),
    [push, dismiss],
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className={styles.region} aria-live="polite" aria-relevant="additions">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={[
              styles.toast,
              styles[toast.type],
              toast.exiting ? styles.exit : styles.enter,
            ].join(' ')}
            role="status"
          >
            <p className={styles.message}>{toast.message}</p>
            <button
              type="button"
              className={styles.close}
              aria-label="Dismiss notification"
              onClick={() => dismiss(toast.id)}
            >
              <X size={16} aria-hidden />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
