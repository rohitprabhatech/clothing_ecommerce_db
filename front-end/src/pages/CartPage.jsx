import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatINR } from '../utils/currency';
import Button from '../components/common/Button';

/**
 * CartPage Route Container
 */
export function CartPage() {
  const { cartItems, totalItems, totalAmount, updateQuantity, removeFromCart, clearCart } =
    useCart();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="page-header">
        <h1 className="page-title">Shopping Cart</h1>
        <p className="page-subtitle">
          Review your selected apparel before proceeding to checkout.
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div className="placeholder-card">
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>🛒</span>
          <h3 style={{ marginBottom: '0.5rem' }}>Your Cart is Empty</h3>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
            Looks like you haven&apos;t added any clothing items yet.
          </p>
          <Link to="/products">
            <Button variant="primary">Explore Catalog</Button>
          </Link>
        </div>
      ) : (
        <div className="placeholder-card" style={{ textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <span style={{ fontWeight: 600 }}>{totalItems} Item(s) in Cart</span>
            <button
              type="button"
              onClick={clearCart}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-danger)',
                cursor: 'pointer',
                fontSize: '0.875rem',
              }}
            >
              Clear Cart
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            {cartItems.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid var(--color-border)',
                  paddingBottom: '1rem',
                }}
              >
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>{item.name}</h4>
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                    Unit Price: {formatINR(item.price)}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                    >
                      -
                    </button>
                    <span style={{ minWidth: '1.5rem', textAlign: 'center', fontWeight: 600 }}>
                      {item.quantity || 1}
                    </span>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                    >
                      +
                    </button>
                  </div>

                  <span style={{ fontWeight: 700, minWidth: '80px', textAlign: 'right' }}>
                    {formatINR((item.price || 0) * (item.quantity || 1))}
                  </span>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-text-muted)',
                      cursor: 'pointer',
                      fontSize: '1.25rem',
                    }}
                    aria-label="Remove item"
                  >
                    &times;
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '1rem',
              borderTop: '2px solid var(--color-border)',
            }}
          >
            <div>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                Estimated Total
              </span>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{formatINR(totalAmount)}</div>
            </div>

            <Link to="/checkout">
              <Button variant="primary" size="lg">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;

