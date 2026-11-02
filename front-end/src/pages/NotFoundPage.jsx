import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

/**
 * NotFoundPage (404) Route Container
 */
export function NotFoundPage() {
  return (
    <div style={{ maxWidth: '500px', margin: '4rem auto', textAlign: 'center' }}>
      <div className="placeholder-card">
        <span style={{ fontSize: '4rem', display: 'block', fontWeight: 800, color: 'var(--color-primary)' }}>
          404
        </span>
        <h2 className="page-title" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
          Page Not Found
        </h2>
        <p className="page-subtitle" style={{ marginBottom: '2rem' }}>
          The apparel page or category you are looking for does not exist or has been relocated.
        </p>

        <Link to="/">
          <Button variant="primary">Return to Homepage</Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;

