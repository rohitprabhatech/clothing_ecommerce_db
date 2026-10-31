import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatINR } from '../utils/currency';
import Button from '../components/common/Button';

/**
 * CheckoutPage Route Container (Placeholder Foundation)
 */
export function CheckoutPage() {
  const { totalItems, totalAmount } = useCart();

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto' }}>
      <div className="page-header">
        <h1 className="page-title">Secure Checkout</h1>
        <p className="page-subtitle">
          Complete your order with encrypted transaction processing.
        </p>
      </div>

      <div className="placeholder-card" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
        <span className="placeholder-badge">CHECKOUT INTEGRATION READY</span>
        <h3 style={{ marginBottom: '1rem' }}>Order Overview</h3>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <span>Total Items:</span>
          <strong>{totalItems}</strong>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <span>Subtotal:</span>
          <strong>{formatINR(totalAmount)}</strong>
        </div>

        <div
          style={{
            background: '#f9fafb',
            border: '1px dashed var(--color-border)',
            padding: '1.5rem',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center',
            marginBottom: '1.5rem',
          }}
        >
          <span style={{ fontSize: '1.75rem', display: 'block', marginBottom: '0.5rem' }}>🔒</span>
          <h4 style={{ marginBottom: '0.25rem' }}>Payment Gateway & Shipping Integration</h4>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
            Full checkout and payment processing will be integrated in subsequent milestones.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link to="/cart">
            <Button variant="secondary">&larr; Return to Cart</Button>
          </Link>
          <Button variant="primary" disabled>
            Place Order ({formatINR(totalAmount)})
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;

