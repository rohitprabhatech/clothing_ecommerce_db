import { Heart, ShoppingBag } from 'lucide-react';

export default function ProductCard({ product, onAddToCart, onToggleWishlist, isWishlisted }) {
  return (
    <div style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', overflow: 'hidden', position: 'relative', boxShadow: 'var(--shadow-sm)', transition: 'transform 0.2s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
      {/* Wishlist Button */}
      <button onClick={() => onToggleWishlist(product)} style={{ position: 'absolute', top: '10px', right: '10px', background: '#fff', padding: '6px', borderRadius: '50%', boxShadow: 'var(--shadow-sm)', zIndex: 2 }}>
        <Heart size={18} color={isWishlisted ? 'var(--accent-pink)' : '#111'} fill={isWishlisted ? 'var(--accent-pink)' : 'none'} />
      </button>

      {/* Product Image */}
      <div style={{ height: '280px', overflow: 'hidden', background: '#f3f4f6' }}>
        <img src={product.image} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* Details */}
      <div style={{ padding: '1rem' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{product.brand}</span>
        <h4 style={{ fontSize: '0.9rem', fontWeight: 600, margin: '4px 0 8px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.title}</h4>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>₹ {product.price.toLocaleString('en-IN')}</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>₹ {product.originalPrice.toLocaleString('en-IN')}</span>
          <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--accent-pink)' }}>({product.discount}% OFF)</span>
        </div>

        <button onClick={() => onAddToCart(product)} style={{ width: '100%', background: '#111', color: '#fff', padding: '0.6rem', borderRadius: 'var(--radius-md)', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.85rem' }}>
          <ShoppingBag size={16} /> Add to Cart
        </button>
      </div>
    </div>
  );
}