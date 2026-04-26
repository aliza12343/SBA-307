import PropTypes from 'prop-types'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

const navLinks = [
  { to: '/', label: 'Home', exact: true },
  { to: '/shop', label: 'Shop' },
  { to: '/lehenga', label: 'Lehengas' },
  { to: '/saree', label: 'Sarees' },
  { to: '/jewelry', label: 'Jewelry' },
  { to: '/lookbook', label: 'Lookbook' },
  { to: '/contact', label: 'Contact' },
]

export default function StoreLayout({ children }) {
  const { itemCount } = useCart()
  const { user, logout } = useAuth()

  return (
    <div className="store-app">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <header className="store-nav" role="banner">
        <Link aria-label="Studio SA home" className="store-brand" to="/">
          Studio <span>SA</span>
        </Link>

        <nav aria-label="Main navigation" className="store-nav-links">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              className={({ isActive }) =>
                `store-nav-link${isActive ? ' is-active' : ''}`
              }
              end={link.exact}
              to={link.to}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="store-nav-actions">
          {user ? (
            <button
              aria-label="Sign out of your account"
              className="store-nav-link text-button"
              onClick={logout}
              type="button"
            >
              Sign Out
            </button>
          ) : (
            <NavLink
              className={({ isActive }) =>
                `store-nav-link${isActive ? ' is-active' : ''}`
              }
              to="/login"
            >
              Sign In
            </NavLink>
          )}
          <Link
            aria-label={`Cart, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
            className="store-cart-pill"
            to="/checkout"
          >
            Cart {itemCount}
          </Link>
        </div>
      </header>

      {children}

      <footer aria-label="Site footer" className="store-footer" role="contentinfo">
        <div>
          <p className="store-footer-brand">
            Studio <span>SA</span>
          </p>
          <p className="store-footer-copy">
            Handcrafted South Asian fashion, Columbus Ohio.
          </p>
        </div>
        <nav aria-label="Footer navigation" className="store-footer-links">
          <Link to="/shop">Shop</Link>
          <Link to="/lehenga">Lehengas</Link>
          <Link to="/saree">Sarees</Link>
          <Link to="/jewelry">Jewelry</Link>
          <Link to="/checkout">Checkout</Link>
          <Link to="/login">Sign In</Link>
          <Link to="/register">Register</Link>
          <a href="/legacy/index.html">Open Legacy Site</a>
        </nav>
      </footer>
    </div>
  )
}

StoreLayout.propTypes = {
  children: PropTypes.node.isRequired,
}
