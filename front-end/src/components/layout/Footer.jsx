export default function Footer() {
  return (
    <footer style={{ background: '#111', color: '#fff', padding: '4rem 5%', marginTop: '5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', marginBottom: '3rem' }}>
        <div>
          <h3 style={{ color: 'var(--accent-pink)', marginBottom: '1rem' }}>AURA FASHION</h3>
          <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Your ultimate destination for contemporary style, luxury wear, and ethnic curation.</p>
        </div>
        <div>
          <h4 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Who are we</h4>
          <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Careers | Press | Policies</p>
        </div>
        <div>
          <h4 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Help & Support</h4>
          <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Shipping | Returns | FAQ</p>
        </div>
        <div>
          <h4 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Experience App on Mobile</h4>
          <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Available on iOS & Android</p>
        </div>
      </div>
      <div style={{ textAlign: 'center', borderTop: '1px solid #333', paddingTop: '2rem', color: '#9ca3af', fontSize: '0.8rem' }}>
        &copy; 2026 AURA Fashion Marketplace. All rights reserved.
      </div>
    </footer>
  );
}