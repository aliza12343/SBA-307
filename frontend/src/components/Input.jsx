import PropTypes from 'prop-types'

export default function Input({
  error,
  id,
  label,
  name,
  onChange,
  placeholder,
  required = false,
  type = 'text',
  value,
}) {
  const inputId = id || name
  return (
    <div className="field">
      <label htmlFor={inputId}>
        {label}
        {required ? <span aria-hidden="true" className="required-mark"> *</span> : null}
      </label>
      <input
        aria-describedby={error ? `${inputId}-error` : undefined}
        aria-invalid={error ? true : undefined}
        aria-required={required || undefined}
        className={error ? 'has-error' : ''}
        id={inputId}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      {error ? (
        <span className="field-error" id={`${inputId}-error`} role="alert">
          {error}
        </span>
      ) : null}
    </div>
  )
}

Input.propTypes = {
  error: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
}
