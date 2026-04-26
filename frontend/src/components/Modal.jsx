import { useEffect } from 'react'
import PropTypes from 'prop-types'

export default function Modal({ children, onClose, open, title }) {
  useEffect(() => {
    if (!open) return
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      aria-labelledby={title ? 'modal-title' : undefined}
      aria-modal="true"
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
    >
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          {title ? <h2 id="modal-title">{title}</h2> : null}
          <button
            aria-label="Close modal"
            className="modal-close"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
}
