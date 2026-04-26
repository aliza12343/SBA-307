import { useCallback, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Input from '../components/Input'
import StoreLayout from '../components/StoreLayout'
import { useAuth } from '../context/AuthContext'

const initialForm = { firstName: '', lastName: '', email: '', password: '' }

export default function RegisterPage() {
  const { user, register, loading, error } = useAuth()
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
      if (!form.firstName) next.firstName = 'First name is required'
      if (!form.email) next.email = 'Email is required'
      if (!form.password || form.password.length < 8)
        next.password = 'Password must be at least 8 characters'
      if (Object.keys(next).length) {
        setErrors(next)
        return
      }
      try {
        await register(form)
        navigate('/')
      } catch {
        // error is surfaced through AuthContext state
      }
    },
    [form, register, navigate],
  )

  return (
    <StoreLayout>
      <main className="store-page auth-page">
        <div className="auth-card">
          <p className="eyebrow">Join Studio SA</p>
          <h1>Create account</h1>
          {error ? (
            <div className="form-notice error" role="alert">
              {error}
            </div>
          ) : null}
          <form aria-label="Registration form" noValidate onSubmit={handleSubmit}>
            <div className="field-grid two">
              <Input
                error={errors.firstName}
                label="First Name"
                name="firstName"
                onChange={handleChange}
                required
                value={form.firstName}
              />
              <Input
                label="Last Name"
                name="lastName"
                onChange={handleChange}
                value={form.lastName}
              />
            </div>
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
              Create account
            </Button>
          </form>
          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </main>
    </StoreLayout>
  )
}
