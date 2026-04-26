import { createContext, useCallback, useContext, useReducer } from 'react'
import { authApi } from '../api/authApi'

const AuthContext = createContext(null)

function isTokenExpired(token) {
  if (!token) return true
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.exp * 1000 < Date.now()
  } catch {
    return true
  }
}

function loadInitialState() {
  const token = localStorage.getItem('sa_token')
  if (isTokenExpired(token)) {
    localStorage.removeItem('sa_token')
    localStorage.removeItem('sa_user')
    return { user: null, token: null, loading: false, error: null }
  }
  try {
    const raw = localStorage.getItem('sa_user')
    const user = raw ? JSON.parse(raw) : null
    return { user, token, loading: false, error: null }
  } catch {
    return { user: null, token, loading: false, error: null }
  }
}

function authReducer(state, action) {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, loading: true, error: null }
    case 'AUTH_SUCCESS':
      return { ...state, loading: false, user: action.user, token: action.token, error: null }
    case 'AUTH_ERROR':
      return { ...state, loading: false, error: action.error }
    case 'LOGOUT':
      return { user: null, token: null, loading: false, error: null }
    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, null, loadInitialState)

  const login = useCallback(async (credentials) => {
    dispatch({ type: 'AUTH_START' })
    try {
      const data = await authApi.login(credentials)
      localStorage.setItem('sa_token', data.token)
      const user = data.user ?? { username: data.username, role: data.role }
      localStorage.setItem('sa_user', JSON.stringify(user))
      dispatch({ type: 'AUTH_SUCCESS', user, token: data.token })
    } catch (err) {
      dispatch({ type: 'AUTH_ERROR', error: err.message })
      throw err
    }
  }, [])

  const register = useCallback(async (userData) => {
    dispatch({ type: 'AUTH_START' })
    try {
      const data = await authApi.register(userData)
      if (data.token) {
        const user = data.user ?? { username: data.username, role: data.role }
        localStorage.setItem('sa_token', data.token)
        localStorage.setItem('sa_user', JSON.stringify(user))
        dispatch({ type: 'AUTH_SUCCESS', user, token: data.token })
      } else {
        dispatch({ type: 'AUTH_ERROR', error: null })
      }
    } catch (err) {
      dispatch({ type: 'AUTH_ERROR', error: err.message })
      throw err
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('sa_token')
    localStorage.removeItem('sa_user')
    dispatch({ type: 'LOGOUT' })
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
