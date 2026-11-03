import { Link } from 'react-router-dom';

export default function Cart({ cart, setCart }) {
  const total = cart.reduce((acc, item) => acc + item.price * (item.qty || 1), 0);

  return (
    <div style={{ width: '80%', margin: '3rem auto', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem' }}>Shopping Bag ({cart.length})</h1>
      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>Your cart is empty.</p>
          <Link to="/" style={{ background: 'var(--accent-pink)', color: '#fff', padding: '0.8rem 2rem', borderRadius: 'var(--radius-full)', fontWeight: 'bold' }}>Shop Now</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {cart.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '1.5rem', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                <img src={item.image} alt={item.title} style={{ width: '100px', height: '120px', objectFit: 'cover', borderRadius: '6px' }} />
                <div>
                  <h4 style={{ fontWeight: 700 }}>{item.title}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '4px 0' }}>{item.brand}</p>
                  <p style={{ fontWeight: 800, color: 'var(--accent-pink)' }}>₹ {item.price.toLocaleString('en-IN')}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: 'var(--bg-secondary)', padding: '2rem', borderRadius: 'var(--radius-md)', height: 'fit-content' }}>
            <h3 style={{ marginBottom: '1rem', fontWeight: 800 }}>Order Summary</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span>Total Amount</span>
              <span style={{ fontWeight: 800 }}>₹ {total.toLocaleString('en-IN')}</span>
            </div>
            <button onClick={() => alert('Order Placed Successfully!')} style={{ width: '100%', background: 'var(--accent-pink)', color: '#fff', padding: '1rem', borderRadius: 'var(--radius-md)', fontWeight: 800 }}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}