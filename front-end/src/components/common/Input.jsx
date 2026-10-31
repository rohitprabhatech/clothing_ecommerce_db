/**
 * Reusable Form Input Component
 */
export function Input({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  error = null,
  disabled = false,
  required = false,
  className = '',
  ...props
}) {
  const inputId = id || name;

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
          {required && <span style={{ color: 'var(--color-danger)' }}> *</span>}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`form-input ${error ? 'has-error' : ''} ${className}`.trim()}
        {...props}
      />
      {error && <span className="form-error">{error}</span>}
    </div>
  );
}

export default Input;

