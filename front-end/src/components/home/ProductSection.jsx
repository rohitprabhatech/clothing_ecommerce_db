import ProductCard from '../product/ProductCard';

export default function ProductSection({ title, products, onAddToCart, onToggleWishlist, wishlist }) {
  return (
    <div style={{ width: '94%', margin: '3rem auto' }}>
      <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1.5rem' }}>{title}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '2rem' }}>
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart} 
            onToggleWishlist={onToggleWishlist}
            isWishlisted={wishlist.some((item) => item.id === product.id)}
          />
        ))}
      </div>
    </div>
  );
}