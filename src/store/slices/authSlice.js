import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  status: 'idle',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken, refreshToken } = action.payload
      state.user = user || null
      state.accessToken = accessToken || null
      state.refreshToken = refreshToken || null
      state.isAuthenticated = !!(accessToken && user)
      state.status = 'authenticated'
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }
    },
    clearCredentials: (state) => {
      state.user = null
      state.accessToken = null
      state.refreshToken = null
      state.isAuthenticated = false
      state.status = 'idle'
    },
    setStatus: (state, action) => {
      state.status = action.payload
    },
  },
})

export const { setCredentials, updateUser, clearCredentials, setStatus } = authSlice.actions
export default authSlice.reducer


