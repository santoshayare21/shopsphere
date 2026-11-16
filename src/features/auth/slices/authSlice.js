import { createSlice } from '@reduxjs/toolkit'
import { loadJSON } from '@/utils/storage'

const persisted = loadJSON('auth', { token: null, user: null })

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: persisted?.token ?? null,
    user: persisted?.user ?? null,
  },
  reducers: {
    setCredentials(state, action) {
      state.token = action.payload.token
      state.user = action.payload.user
    },
    updateUser(state, action) {
      state.user = { ...state.user, ...action.payload }
    },
    logout(state) {
      state.token = null
      state.user = null
    },
  },
})

export const { setCredentials, updateUser, logout } = authSlice.actions
export default authSlice.reducer
