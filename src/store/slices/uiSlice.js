import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notifications: [],
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload || []
    },
    clearNotifications: (state) => {
      state.notifications = []
    },
  },
})

export const { setNotifications, clearNotifications } = uiSlice.actions
export default uiSlice.reducer


