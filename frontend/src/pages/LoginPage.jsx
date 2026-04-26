import { useCallback, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Input from '../components/Input'
import StoreLayout from '../components/StoreLayout'
import { useAuth } from '../context/AuthContext'

const initialForm = { email: '', password: '' }

export default function LoginPage() {
  const { user, login, loading, error } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})

  if (user) return <Navigate to="/" replace />

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }, [])

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      const next = {}
      if (!form.email) next.email = 'Email is required'
      if (!form.password) next.password = 'Password is required'
      if (Object.keys(next).length) {
        setErrors(next)
        return
      }
      try {
        await login(form)
        navigate('/')
      } catch {
        // error is surfaced through AuthContext state
      }
    },
    [form, login, navigate],
  )

  return (
    <StoreLayout>
      <main className="store-page auth-page">
        <div className="auth-card">
          <p className="eyebrow">Welcome back</p>
          <h1>Sign in</h1>
          {error ? (
            <div className="form-notice error" role="alert">
              {error}
            </div>
          ) : null}
          <form aria-label="Login form" noValidate onSubmit={handleSubmit}>
            <Input
              error={errors.email}
              label="Email"
              name="email"
              onChange={handleChange}
              required
              type="email"
              value={form.email}
            />
            <Input
              error={errors.password}
              label="Password"
              name="password"
              onChange={handleChange}
              required
              type="password"
              value={form.password}
            />
            <Button loading={loading} type="submit" variant="primary">
              Sign in
            </Button>
          </form>
          <p className="auth-switch">
            Don&apos;t have an account? <Link to="/register">Create one</Link>
          </p>
        </div>
      </main>
    </StoreLayout>
  )
}
