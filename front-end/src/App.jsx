import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import './assets/styles/main.css';

export default function App() {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('aura_cart')) || []);
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('aura_wishlist')) || []);

  useEffect(() => {
    localStorage.setItem('aura_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('aura_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const sampleProducts = [
    { id: 1, brand: "U.S. POLO ASSN.", title: "Signature Heavyweight Hoodie", price: 3499, originalPrice: 4999, discount: 30, image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=500" },
    { id: 2, brand: "AUTUMN LANE", title: "Embroidered Festive Lehenga", price: 8999, originalPrice: 14999, discount: 40, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=500" },
    { id: 3, brand: "MONTE CARLO", title: "Tailored Streetwear Cargo Pants", price: 2899, originalPrice: 4599, discount: 35, image: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&q=80&w=500" },
    { id: 4, brand: "ARROW", title: "Classic Formal Cotton Shirt", price: 1799, originalPrice: 2999, discount: 40, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=500" }
  ];

  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const handleToggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  return (
    <ThemeProvider>
      <Router>
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-main)', transition: 'background 0.3s, color 0.3s' }}>
          <Header cartCount={cart.length} wishlistCount={wishlist.length} />
          <Routes>
            <Route path="/" element={<HomePage products={sampleProducts} onAddToCart={handleAddToCart} onToggleWishlist={handleToggleWishlist} wishlist={wishlist} />} />
            <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
            <Route path="/wishlist" element={<Wishlist wishlist={wishlist} onAddToCart={handleAddToCart} onToggleWishlist={handleToggleWishlist} />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}