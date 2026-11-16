import { Suspense } from 'react'
import ErrorBoundary from '@/routes/ErrorBoundary'

export default function LazyPage({ children, fallback }) {
  return (
    <ErrorBoundary>
      <Suspense fallback={fallback}>{children}</Suspense>
    </ErrorBoundary>
  )
}
