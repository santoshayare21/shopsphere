import { createSelector } from '@reduxjs/toolkit'

const selectAuth = (state) => state.auth

/** Memoized auth flag so Navbar/ProtectedRoute avoid redundant work. */
export const selectIsAuthenticated = createSelector(
  [selectAuth],
  (auth) => Boolean(auth.token),
)

export const selectAuthUser = createSelector([selectAuth], (auth) => auth.user)
export const selectAuthToken = createSelector([selectAuth], (auth) => auth.token)
