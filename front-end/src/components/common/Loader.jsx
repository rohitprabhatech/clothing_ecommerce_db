/**
 * Reusable Loading Spinner Component
 */
export function Loader({
  size = 'md',
  text = 'Loading...',
  className = '',
}) {
  const sizeClass = `loader-${size}`;

  return (
    <div className={`loader-wrapper ${className}`.trim()} role="status">
      <div className={`loader-spinner ${sizeClass}`} />
      {text && <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{text}</span>}
    </div>
  );
}

export default Loader;

