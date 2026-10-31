import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';

/**
 * Site Header Component
 */
export function Header() {
  const { totalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand-logo">
          <span>ATELIER</span>
          <span className="brand-badge">CLOTHING</span>
        </Link>

        <div className="header-actions">
          <Link to="/products" className="nav-link">
            Shop Catalog
          </Link>

          <Link to="/cart" className="nav-link" aria-label="Shopping Cart">
            Cart
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>

          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                {user?.name || 'Account'}
              </span>
              <button
                type="button"
                onClick={logout}
                className="btn btn-secondary btn-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Link to="/login" className="btn btn-secondary btn-sm">
                Sign In
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

