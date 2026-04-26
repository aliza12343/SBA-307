import PropTypes from 'prop-types'

export default function Card({ children, className = '', onClick }) {
  const isInteractive = typeof onClick === 'function'
  return (
    <div
      className={`card ${className}`.trim()}
      onClick={onClick}
      onKeyDown={isInteractive ? (e) => e.key === 'Enter' && onClick(e) : undefined}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
    >
      {children}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
}
