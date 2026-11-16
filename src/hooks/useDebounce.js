import { useEffect, useState } from 'react'

/**
 * Debounce a rapidly changing value (e.g. search input).
 * @param {*} value
 * @param {number} delayMs
 */
export function useDebounce(value, delayMs = 400) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs)
    return () => clearTimeout(id)
  }, [value, delayMs])

  return debounced
}
