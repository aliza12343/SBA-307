import PropTypes from 'prop-types'

export default function Spinner({ label = 'Loading...', size = 'md' }) {
  return (
    <span aria-label={label} className={`spinner spinner-${size}`} role="status">
      <span className="sr-only">{label}</span>
    </span>
  )
}

Spinner.propTypes = {
  label: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
}
