import PropTypes from 'prop-types'
import { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner'
import StoreLayout from '../components/StoreLayout'
import { ordersApi } from '../api/ordersApi'
import { useCart } from '../context/CartContext'

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  country: '',
  cardNum: '',
  cardName: '',
  expiry: '',
  cvv: '',
}

export default function CheckoutPage() {
  const { items, subtotal, updateQty, removeItem, clearCart } = useCart()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [orderNumber, setOrderNumber] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.qty, 0),
    [items],
  )

  function handleChange(event) {
    const { name, value } = event.target

    let nextValue = value
    if (name === 'cardNum') {
      nextValue = value
        .replace(/\D/g, '')
        .slice(0, 16)
        .replace(/(.{4})/g, '$1 ')
        .trim()
    }

    if (name === 'expiry') {
      const digits = value.replace(/\D/g, '').slice(0, 4)
      nextValue =
        digits.length > 2 ? `${digits.slice(0, 2)} / ${digits.slice(2)}` : digits
    }

    if (name === 'cvv') {
      nextValue = value.replace(/\D/g, '').slice(0, 4)
    }

    setForm((current) => ({ ...current, [name]: nextValue }))
    setErrors((current) => ({ ...current, [name]: false }))
  }

  const placeOrder = useCallback(async (event) => {
    event.preventDefault()
    setSubmitError('')

    const required = [
      'firstName', 'lastName', 'email',
      'address', 'city', 'zip', 'country',
      'cardNum', 'cardName', 'expiry', 'cvv',
    ]

    const nextErrors = Object.fromEntries(
      required.map((field) => [field, !form[field].trim()]),
    )

    if (items.length === 0 || Object.values(nextErrors).some(Boolean)) {
      setErrors(nextErrors)
      return
    }

    setSubmitting(true)
    try {
      const data = await ordersApi.create({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
        state: form.state,
        zip: form.zip,
        country: form.country,
        total: subtotal,
      })
      setOrderNumber(data.orderNumber || `SA-${Date.now().toString().slice(-6)}`)
      clearCart()
    } catch (err) {
      setSubmitError(err.message || 'Order could not be placed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }, [form, items, subtotal, clearCart])

  return (
    <StoreLayout>
      <main className="store-page checkout-page">
        <section className="section-head left">
          <p className="eyebrow">Secure Checkout</p>
          <h1>Complete your order.</h1>
          <p className="lead">
            Complimentary worldwide shipping on all bridal pieces.
          </p>
        </section>

        <div className="checkout-grid">
          <form className="checkout-form" onSubmit={placeOrder}>
            <div className="checkout-section">
              <div className="checkout-section-head">
                <span>01</span>
                <h2>Contact information</h2>
              </div>
              <div className="field-grid two">
                <Field
                  error={errors.firstName}
                  label="First Name"
                  name="firstName"
                  onChange={handleChange}
                  value={form.firstName}
                />
                <Field
                  error={errors.lastName}
                  label="Last Name"
                  name="lastName"
                  onChange={handleChange}
                  value={form.lastName}
                />
              </div>
              <Field
                error={errors.email}
                label="Email Address"
                name="email"
                onChange={handleChange}
                value={form.email}
              />
              <Field
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                value={form.phone}
              />
            </div>

            <div className="checkout-section">
              <div className="checkout-section-head">
                <span>02</span>
                <h2>Shipping address</h2>
              </div>
              <Field
                error={errors.address}
                label="Street Address"
                name="address"
                onChange={handleChange}
                value={form.address}
              />
              <div className="field-grid two">
                <Field
                  error={errors.city}
                  label="City"
                  name="city"
                  onChange={handleChange}
                  value={form.city}
                />
                <Field
                  label="State / Province"
                  name="state"
                  onChange={handleChange}
                  value={form.state}
                />
              </div>
              <div className="field-grid two">
                <Field
                  error={errors.zip}
                  label="ZIP / Postal Code"
                  name="zip"
                  onChange={handleChange}
                  value={form.zip}
                />
                <label className="field">
                  <span>Country</span>
                  <select
                    className={errors.country ? 'has-error' : ''}
                    name="country"
                    onChange={handleChange}
                    value={form.country}
                  >
                    <option value="">Select Country</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Australia</option>
                    <option>Pakistan</option>
                    <option>India</option>
                    <option>UAE</option>
                    <option>Other</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="checkout-section">
              <div className="checkout-section-head">
                <span>03</span>
                <h2>Payment details</h2>
              </div>
              <Field
                error={errors.cardNum}
                label="Card Number"
                name="cardNum"
                onChange={handleChange}
                value={form.cardNum}
              />
              <Field
                error={errors.cardName}
                label="Name On Card"
                name="cardName"
                onChange={handleChange}
                value={form.cardName}
              />
              <div className="field-grid two">
                <Field
                  error={errors.expiry}
                  label="Expiry Date"
                  name="expiry"
                  onChange={handleChange}
                  value={form.expiry}
                />
                <Field
                  error={errors.cvv}
                  label="CVV"
                  name="cvv"
                  onChange={handleChange}
                  value={form.cvv}
                />
              </div>
            </div>

            {submitError ? (
              <p className="error-notice" role="alert">{submitError}</p>
            ) : null}
            <button
              className="primary-btn order-button"
              disabled={submitting}
              type="submit"
            >
              {submitting ? <Spinner size="sm" label="Placing order" /> : null}
              {submitting ? 'Placing Order…' : 'Place Order'}
            </button>
          </form>

          <aside className="checkout-summary">
            <h2>Your Order</h2>
            <p className="summary-note">
              {itemCount} {itemCount === 1 ? 'piece' : 'pieces'}
            </p>

            {items.length === 0 ? (
              <div className="empty-state">
                <p>Your cart is empty.</p>
                <Link className="secondary-btn" to="/saree">
                  Browse Sarees
                </Link>
              </div>
            ) : (
              <>
                <div className="cart-list">
                  {items.map((item) => (
                    <div key={item.id} className="cart-row">
                      <img alt={item.name} src={item.image} />
                      <div className="cart-copy">
                        <h3>{item.name}</h3>
                        <p>{item.category}</p>
                        <div className="cart-actions">
                          <label>
                            Qty
                            <select
                              onChange={(event) =>
                                updateQty(item.id, Number(event.target.value))
                              }
                              value={item.qty}
                            >
                              {[1, 2, 3, 4].map((qty) => (
                                <option key={qty} value={qty}>
                                  {qty}
                                </option>
                              ))}
                            </select>
                          </label>
                          <button
                            className="text-button"
                            onClick={() => removeItem(item.id)}
                            type="button"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <strong>${(item.price * item.qty).toLocaleString()}</strong>
                    </div>
                  ))}
                </div>

                <div className="summary-lines">
                  <div>
                    <span>Subtotal</span>
                    <strong>${subtotal.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span>Shipping</span>
                    <strong>Complimentary</strong>
                  </div>
                  <div className="total-line">
                    <span>Total</span>
                    <strong>${subtotal.toLocaleString()}</strong>
                  </div>
                </div>
              </>
            )}
          </aside>
        </div>

        {orderNumber ? (
          <div className="order-success">
            <p className="eyebrow">Order Confirmed</p>
            <h2>Thank you for your order.</h2>
            <p className="lead">{orderNumber}</p>
            <Link className="secondary-btn" to="/shop">
              Continue Shopping
            </Link>
          </div>
        ) : null}
      </main>
    </StoreLayout>
  )
}

function Field({ error, label, name, onChange, value }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input
        aria-invalid={error ? true : undefined}
        className={error ? 'has-error' : ''}
        name={name}
        onChange={onChange}
        value={value}
      />
      {error ? <span className="field-error" role="alert">This field is required.</span> : null}
    </label>
  )
}

Field.propTypes = {
  error: PropTypes.bool,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}
