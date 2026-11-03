import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag } from 'lucide-react';
import SubCategoryBar from '../components/home/SubCategoryBar';

import HeroBanner from '../components/home/HeroBanner';
import CategorySlider from '../components/home/CategorySlider';
import ProductSection from '../components/home/ProductSection';

export default function HomePage({ products, onAddToCart, onToggleWishlist, wishlist }) {
  <div>
      <SubCategoryBar /> {/* HE LINE BANNER CHYA AADHI TAKAYCHI AHE */}
      <HeroBanner />
      <CategorySlider />
      <ProductSection 
        title="Trending Collections" 
        products={products} 
        onAddToCart={onAddToCart} 
        onToggleWishlist={onToggleWishlist} 
        wishlist={wishlist} 
      />
    </div>
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const list = products || [
    { id: 1, brand: "U.S. POLO", title: "Heavyweight Hoodie", price: 3499, originalPrice: 4999, discount: 30, image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=500" },
    { id: 2, brand: "BIBA", title: "Festive Lehenga", price: 8999, originalPrice: 14999, discount: 40, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=500" }
  ];

  return (
    <div>
      <HeroBanner />
      <CategorySlider />
      <ProductSection 
        title="Trending Now" 
        products={list.slice(0, 4)} 
        onAddToCart={onAddToCart} 
        onToggleWishlist={onToggleWishlist} 
        wishlist={wishlist}
        onQuickView={setQuickViewProduct}
      />

      <AnimatePresence>
        {quickViewProduct && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{ background: 'var(--card-bg)', padding: '2rem', borderRadius: '16px', width: '500px', position: 'relative', display: 'flex', gap: '1.5rem', border: '1px solid var(--border-color)' }}
            >
              <button onClick={() => setQuickViewProduct(null)} style={{ position: 'absolute', top: '10px', right: '10px', color: 'var(--text-main)' }}>
                <X size={20} />
              </button>
              <img src={quickViewProduct.image} alt={quickViewProduct.title} style={{ width: '200px', height: '240px', objectFit: 'cover', borderRadius: '8px' }} />
              <div>
                <h3 style={{ color: 'var(--text-main)' }}>{quickViewProduct.title}</h3>
                <p style={{ fontWeight: 'bold', margin: '1rem 0', color: 'var(--text-main)' }}>₹ {quickViewProduct.price}</p>
                <button 
                  onClick={() => {
                    onAddToCart(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                  style={{ background: 'var(--accent-pink)', color: '#fff', padding: '0.6rem 1.2rem', borderRadius: '8px', fontWeight: 'bold' }}
                >
                  <ShoppingBag size={16} /> Add to Cart
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}