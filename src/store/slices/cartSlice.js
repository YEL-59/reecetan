import { createSlice } from '@reduxjs/toolkit'

const STORAGE_KEY = 'cart:v1'

const initialState = (() => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : { items: [] }
  } catch (_) {
    return { items: [] }
  }
})()

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const exists = state.items.find(i => i.id === action.payload.id)
      if (!exists) state.items.push({ ...action.payload, qty: 1 })
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload)
    },
    clearCart: (state) => {
      state.items = []
    },
    hydrate: (state, action) => action.payload,
  },
})

export const { addItem, removeItem, clearCart, hydrate } = cartSlice.actions
export default cartSlice.reducer

// Persist to localStorage
export const persistCartMiddleware = store => next => action => {
  const result = next(action)
  const state = store.getState().cart
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (_) {}
  return result
}


