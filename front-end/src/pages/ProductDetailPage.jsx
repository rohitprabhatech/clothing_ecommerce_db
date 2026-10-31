import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { formatINR } from '../utils/currency';
import VariantSwatch from '../components/product/VariantSwatch';
import SizeSelector from '../components/product/SizeSelector';
import Button from '../components/common/Button';
import { useCart } from '../hooks/useCart';

/**
 * ProductDetailPage Route Container (Dynamic Route: /products/:id)
 */
export function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState('M');

  const variants = [
    { id: 'black', name: 'Onyx Black', colorHex: '#111827' },
    { id: 'white', name: 'Chalk White', colorHex: '#f3f4f6' },
    { id: 'navy', name: 'Deep Navy', colorHex: '#1e3a8a' },
  ];

  const handleAddToCart = () => {
    addToCart(
      {
        id: id || '101',
        name: `Apparel Item #${id || '101'}`,
        price: 1499,
      },
      1,
      { color: selectedColor, size: selectedSize }
    );
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/products" style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
          &larr; Back to Catalog
        </Link>
      </div>

      <div
        className="placeholder-card"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          textAlign: 'left',
        }}
      >
        <div
          style={{
            background: '#f3f4f6',
            borderRadius: 'var(--radius-md)',
            aspectRatio: '3/4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '4rem',
          }}
        >
          🧥
        </div>

        <div>
          <span className="placeholder-badge">PRODUCT ID: {id}</span>
          <h1 className="page-title" style={{ fontSize: '1.75rem', marginTop: '0.5rem' }}>
            Atelier Essential Apparel Item #{id}
          </h1>

          <div style={{ margin: '1rem 0' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>
              {formatINR(1499)}
            </span>
          </div>

          <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
            High-density organic cotton tailored for an elevated, comfortable silhouette.
            Engineered with reinforced stitching and pre-shrunk fabric.
          </p>

          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
              Color: {selectedColor}
            </span>
            <VariantSwatch
              variants={variants}
              selectedId={selectedColor}
              onSelect={(v) => setSelectedColor(v.id)}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
              Size: {selectedSize}
            </span>
            <SizeSelector
              sizes={['XS', 'S', 'M', 'L', 'XL']}
              selectedSize={selectedSize}
              disabledSizes={['XS']}
              onSelect={(size) => setSelectedSize(size)}
            />
          </div>

          <Button variant="primary" size="lg" onClick={handleAddToCart} style={{ width: '100%' }}>
            Add to Shopping Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;

