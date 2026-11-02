import { Link } from 'react-router-dom';

/**
 * Site Footer Component
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>ATELIER CLOTHING</h4>
            <p style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
              Premium apparel engineered for everyday confidence and effortless style.
            </p>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">All Apparel</Link></li>
              <li><Link to="/cart">My Cart</Link></li>
              <li><Link to="/login">Sign In</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Customer Care</h4>
            <ul className="footer-links">
              <li><a href="#shipping">Shipping & Delivery</a></li>
              <li><a href="#returns">Returns & Exchanges</a></li>
              <li><a href="#size-guide">Size Guide</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Backend Status</h4>
            <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
              FastAPI + MySQL REST API
            </p>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem' }}>
              API Base: <code>{import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1'}</code>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Atelier Clothing E-Commerce. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

