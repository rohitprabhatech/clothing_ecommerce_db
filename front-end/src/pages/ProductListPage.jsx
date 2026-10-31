import { Link } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import { useCart } from '../hooks/useCart';

/**
 * ProductListPage Route Container (Placeholder Foundation)
 */
export function ProductListPage() {
  const { addToCart } = useCart();

  // Single representative template item to demonstrate ProductCard integration
  const sampleItem = {
    id: '101',
    name: 'Atelier Premium Heavyweight Cotton Tee',
    price: 1499,
    originalPrice: 1999,
    category: 'Essential Tees',
    badge: 'NEW',
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Apparel Catalog</h1>
        <p className="page-subtitle">
          Explore our seasonal collection of handcrafted menswear and womenswear.
        </p>
      </div>

      <div className="placeholder-card" style={{ marginBottom: '2rem', textAlign: 'left' }}>
        <span className="placeholder-badge">ROUTING & CARD VERIFICATION</span>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
          This page represents the main catalog container. When the catalog backend API is integrated,
          products fetched from <code>/catalog</code> will render in the responsive grid below.
        </p>

        <div className="grid-cols-4">
          <ProductCard
            product={sampleItem}
            onAddToCart={() => addToCart(sampleItem, 1)}
          />
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
          Test dynamic product detail routing:{' '}
          <Link to="/products/101" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>
            Go to Product #101 Detail Page
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ProductListPage;

