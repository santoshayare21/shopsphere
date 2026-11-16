import { BREAKPOINTS } from '@/utils/breakpoints'
import { useMediaQuery } from '@/hooks/useMediaQuery'

/**
 * SSR-safe breakpoint flags derived from shared BREAKPOINTS map.
 * Prefer CSS first; use this only when JS layout branching is required.
 */
export function useBreakpoint() {
  const sm = useMediaQuery(`(min-width: ${BREAKPOINTS.sm}px)`)
  const md = useMediaQuery(`(min-width: ${BREAKPOINTS.md}px)`)
  const lg = useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px)`)
  const xl = useMediaQuery(`(min-width: ${BREAKPOINTS.xl}px)`)
  const xxl = useMediaQuery(`(min-width: ${BREAKPOINTS['2xl']}px)`)

  return { sm, md, lg, xl, xxl, isMobile: !md }
}
