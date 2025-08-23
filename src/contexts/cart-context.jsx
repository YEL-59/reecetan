import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'

const STORAGE_KEY = 'cart:v1'

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return action.payload
    case 'ADD': {
      const exists = state.items.find(i => i.id === action.payload.id)
      const items = exists
        ? state.items.map(i => i.id === action.payload.id ? { ...i } : i)
        : [...state.items, { ...action.payload, qty: 1 }]
      return { ...state, items }
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) }
    case 'CLEAR':
      return { ...state, items: [] }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) dispatch({ type: 'INIT', payload: JSON.parse(raw) })
    } catch (_) { }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (_) { }
  }, [state])

  const value = useMemo(() => {
    const add = (course) => dispatch({ type: 'ADD', payload: course })
    const remove = (id) => dispatch({ type: 'REMOVE', payload: id })
    const clear = () => dispatch({ type: 'CLEAR' })

    const subtotal = state.items.reduce((sum, i) => sum + Number(i.price || 0) * (i.qty || 1), 0)
    const count = state.items.reduce((sum, i) => sum + (i.qty || 1), 0)

    return { items: state.items, add, remove, clear, subtotal, count }
  }, [state])

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
