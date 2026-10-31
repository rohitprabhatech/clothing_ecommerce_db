import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

/**
 * HomePage Route Container
 */
export function HomePage() {
  return (
    <div>
      <div className="placeholder-card" style={{ marginBottom: '2rem' }}>
        <span className="placeholder-badge">FRONTEND FOUNDATION READY</span>
        <h1 className="page-title">Modern Clothing E-Commerce</h1>
        <p className="page-subtitle" style={{ maxWidth: '600px', margin: '0 auto 1.5rem' }}>
          Welcome to the Atelier frontend foundation built with React.js, Vite, and React Router.
          Connected with our FastAPI + MySQL backend services.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/products">
            <Button variant="primary">Browse Apparel</Button>
          </Link>
          <Link to="/cart">
            <Button variant="secondary">View Cart</Button>
          </Link>
          <Link to="/login">
            <Button variant="outline">Sign In</Button>
          </Link>
        </div>
      </div>

      <div className="placeholder-card" style={{ textAlign: 'left' }}>
        <h3 style={{ marginBottom: '1rem' }}>Backend Connection Target</h3>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
          Configured API endpoint: <code>{import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1'}</code>
        </p>
        <p style={{ color: 'var(--color-text-muted)' }}>
          To verify backend health, ensure your FastAPI server is running on port 8000.
        </p>
      </div>
    </div>
  );
}

export default HomePage;

