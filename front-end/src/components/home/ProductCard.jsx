import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Eye } from 'lucide-react';

export default function ProductCard({ product, onAddToCart, onToggleWishlist, isWishlisted, onQuickView }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleAddClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    onAddToCart(product, { startX: rect.left, startY: rect.top });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image with Hover Transition */}
      <div style={{ position: 'relative', height: '280px', overflow: 'hidden', background: 'var(--bg-secondary)' }}>
        <img 
          src={isHovered && product.hoverImage ? product.hoverImage : product.image} 
          alt={product.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
          className={isHovered ? 'scale-105' : ''}
        />
        
        {/* Discount Badge */}
        {product.discount && (
          <span style={{
            position: 'absolute', top: '10px', left: '10px',
            background: 'var(--accent-pink)', color: '#fff',
            fontSize: '0.7rem', fontWeight: 800, padding: '3px 8px', borderRadius: '4px'
          }}>
            {product.discount}% OFF
          </span>
        )}

        {/* Quick View Button on Hover */}
        {isHovered && (
          <button 
            onClick={() => onQuickView(product)}
            style={{
              position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)',
              background: 'var(--card-bg)', color: 'var(--text-main)', border: '1px solid var(--border-color)',
              padding: '6px 16px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: 'var(--shadow-md)'
            }}
          >
            <Eye size={14} /> Quick View
          </button>
        )}

        {/* Wishlist Heart Icon */}
        <button 
          onClick={() => onToggleWishlist(product)}
          style={{
            position: 'absolute', top: '10px', right: '10px',
            background: 'var(--card-bg)', border: '1px solid var(--border-color)',
            borderRadius: '50%', width: '32px', height: '32px', display: 'flex',
            alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            color: isWishlisted ? 'var(--accent-pink)' : 'var(--text-main)'
          }}
        >
          <Heart size={16} fill={isWishlisted ? 'var(--accent-pink)' : 'none'} />
        </button>
      </div>

      {/* Product Details */}
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '4px', flexGrow: 1, justifyContent: 'space-between' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {product.brand}
          </span>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)', margin: '4px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {product.title}
          </h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)' }}>₹ {product.price}</span>
            {product.originalPrice && (
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>₹ {product.originalPrice}</span>
            )}
          </div>

          <button 
            onClick={handleAddClick}
            style={{
              background: 'var(--accent-pink)', color: '#fff', border: 'none',
              padding: '8px', borderRadius: '50%', cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)'
            }}
            title="Add to Cart"
          >
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}