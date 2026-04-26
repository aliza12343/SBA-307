import PropTypes from 'prop-types'
import Spinner from './Spinner'

export default function Button({
  children,
  className = '',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  variant = 'primary',
}) {
  return (
    <button
      aria-busy={loading || undefined}
      aria-disabled={disabled || loading || undefined}
      className={`${variant === 'primary' ? 'primary-btn' : 'secondary-btn'} ${className}`.trim()}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
    >
      {loading ? <Spinner size="sm" label="Loading" /> : null}
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['primary', 'secondary']),
}
