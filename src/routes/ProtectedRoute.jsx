import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from '@/features/auth/slices/authSelectors'

export default function ProtectedRoute({ children }) {
  const isAuthed = useSelector(selectIsAuthenticated)
  const location = useLocation()

  if (!isAuthed) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}
