import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { addItem, removeItem, clearCart } from '@/store/slices/cartSlice'

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
  const rDispatch = useAppDispatch()
  const rCart = useAppSelector(s => s.cart)

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
    // If Redux is mounted, prefer Redux; else fall back to local reducer.
    const usingRedux = Array.isArray(rCart?.items)
    const items = usingRedux ? rCart.items : state.items

    const add = (course) => usingRedux ? rDispatch(addItem(course)) : dispatch({ type: 'ADD', payload: course })
    const remove = (id) => usingRedux ? rDispatch(removeItem(id)) : dispatch({ type: 'REMOVE', payload: id })
    const clear = () => usingRedux ? rDispatch(clearCart()) : dispatch({ type: 'CLEAR' })

    const subtotal = items.reduce((sum, i) => sum + Number(i.price || 0) * (i.qty || 1), 0)
    const count = items.reduce((sum, i) => sum + (i.qty || 1), 0)

    return { items, add, remove, clear, subtotal, count }
  }, [state, rCart, rDispatch])

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
