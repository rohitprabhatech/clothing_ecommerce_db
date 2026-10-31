import { Link } from 'react-router-dom';
import { formatINR } from '../../utils/currency';
import Button from '../common/Button';

/**
 * Reusable Product Card Component
 */
export function ProductCard({
  product = {},
  onAddToCart,
}) {
  const {
    id = '1',
    name = 'Classic Apparel Item',
    price = 0,
    originalPrice = null,
    category = 'Apparel',
    badge = null,
  } = product;

  return (
    <div className="product-card">
      <Link to={`/products/${id}`} className="product-image-box">
        {badge && <span className="product-badge">{badge}</span>}
        <span className="product-placeholder-icon" aria-hidden="true">
          👕
        </span>
      </Link>

      <div className="product-info">
        <span className="product-category">{category}</span>
        <Link to={`/products/${id}`}>
          <h3 className="product-title">{name}</h3>
        </Link>

        <div className="product-pricing">
          <span className="product-price">{formatINR(price)}</span>
          {originalPrice && originalPrice > price && (
            <span className="product-original-price">
              {formatINR(originalPrice)}
            </span>
          )}
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => onAddToCart?.(product)}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;

