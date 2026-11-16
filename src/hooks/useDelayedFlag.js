import { useEffect, useState } from 'react'

/**
 * Delay showing a loading flag (~150ms) to avoid skeleton flash on fast responses.
 * @param {boolean} flag
 * @param {number} delayMs
 */
export function useDelayedFlag(flag, delayMs = 150) {
  const [state, setState] = useState({ flag: false, show: false })

  // Adjust derived loading state during render when the input flag flips.
  if (flag !== state.flag) {
    setState({ flag, show: false })
  }

  useEffect(() => {
    if (!flag) return undefined
    const id = setTimeout(() => {
      setState((prev) => (prev.flag ? { ...prev, show: true } : prev))
    }, delayMs)
    return () => clearTimeout(id)
  }, [flag, delayMs])

  return Boolean(flag && state.show)
}
