import ProductCard from '../components/product/ProductCard';

export default function Wishlist({ wishlist, onAddToCart, onToggleWishlist }) {
  return (
    <div style={{ width: '90%', margin: '3rem auto', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem' }}>My Wishlist ({wishlist.length})</h1>
      {wishlist.length === 0 ? (
        <p style={{ color: 'var(--text-muted)' }}>Your wishlist is empty.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '2rem' }}>
          {wishlist.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart} 
              onToggleWishlist={onToggleWishlist} 
              isWishlisted={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}