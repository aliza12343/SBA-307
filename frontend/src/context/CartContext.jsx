import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react'

const CART_KEY = 'sa_cart'
const CartContext = createContext(null)

function readCart() {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(window.localStorage.getItem(CART_KEY) || '[]')
  } catch {
    return []
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.find((item) => item.id === action.product.id)
      if (existing) {
        return state.map((item) =>
          item.id === action.product.id ? { ...item, qty: item.qty + 1 } : item,
        )
      }
      return [
        ...state,
        {
          id: action.product.id,
          name: action.product.name,
          price: action.product.price,
          qty: 1,
          image: action.product.image,
          category: action.product.category,
        },
      ]
    }
    case 'UPDATE_QTY':
      return state
        .map((item) => (item.id === action.id ? { ...item, qty: action.qty } : item))
        .filter((item) => item.qty > 0)
    case 'REMOVE_ITEM':
      return state.filter((item) => item.id !== action.id)
    case 'CLEAR_CART':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, undefined, readCart)

  useEffect(() => {
    window.localStorage.setItem(CART_KEY, JSON.stringify(items))
  }, [items])

  const addItem = useCallback((product) => {
    dispatch({ type: 'ADD_ITEM', product })
  }, [])

  const updateQty = useCallback((id, qty) => {
    dispatch({ type: 'UPDATE_QTY', id, qty })
  }, [])

  const removeItem = useCallback((id) => {
    dispatch({ type: 'REMOVE_ITEM', id })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' })
  }, [])

  const value = useMemo(
    () => ({
      items,
      itemCount: items.reduce((sum, item) => sum + item.qty, 0),
      subtotal: items.reduce((sum, item) => sum + item.price * item.qty, 0),
      addItem,
      updateQty,
      removeItem,
      clearCart,
    }),
    [items, addItem, updateQty, removeItem, clearCart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}
