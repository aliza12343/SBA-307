import PropTypes from 'prop-types'

export default function Skeleton({ className = '', count = 1, height, width }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          aria-hidden="true"
          className={`skeleton ${className}`.trim()}
          style={{ height, width }}
        />
      ))}
    </>
  )
}

Skeleton.propTypes = {
  className: PropTypes.string,
  count: PropTypes.number,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
