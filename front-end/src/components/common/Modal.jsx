import { useEffect } from 'react';
import Button from './Button';

/**
 * Reusable Modal Dialog Component
 */
export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer = null,
}) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          {title && <h3 style={{ fontSize: '1.15rem', fontWeight: 600 }}>{title}</h3>}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '1.25rem',
              cursor: 'pointer',
              color: 'var(--color-text-muted)',
            }}
          >
            &times;
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footer !== null ? (
          <div className="modal-footer">{footer}</div>
        ) : (
          <div className="modal-footer">
            <Button variant="secondary" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;

