import { useState } from 'react';
import { Search, User, Heart, ShoppingBag, Sun, Moon, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

export default function Header({ cartCount, wishlistCount }) {
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const searchSuggestions = ['Heavyweight Hoodie', 'Designer Kurta', 'Cargo Pants', 'Festive Lehenga', 'Cotton Shirt'];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setShowSuggestions(false);
    }
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1100, background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
      
      {/* Promotional Announcement Bar */}
      <div style={{ background: 'var(--accent-pink)', color: '#fff', textAlign: 'center', padding: '6px 0', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.5px' }}>
        🔥 LIMITED TIME OFFER: Get Flat 50% Off on New Arrivals & Free Shipping on Orders Over ₹999! Shop Now.
      </div>

      {/* Main Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 3%' }}>
        
        {/* Left: Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button style={{ display: 'none' }} className="mobile-menu-btn"><Menu size={24} /></button>
          <Link to="/" style={{ fontSize: '1.6rem', fontWeight: 900, letterSpacing: '1px', color: 'var(--text-main)' }}>
            AURA <span style={{ color: 'var(--accent-pink)' }}>FASHION</span>
          </Link>
        </div>

        {/* Center: Main Navigation Categories */}
        <nav style={{ display: 'flex', gap: '2rem', fontWeight: 600, fontSize: '0.95rem' }}>
          <Link to="/" style={{ color: 'var(--accent-pink)', borderBottom: '2px solid var(--accent-pink)', paddingBottom: '4px' }}>Women</Link>
          <Link to="/products?cat=men" style={{ color: 'var(--text-main)' }}>Men</Link>
          <Link to="/products?cat=kids" style={{ color: 'var(--text-main)' }}>Kids</Link>
          <Link to="/products?cat=home" style={{ color: 'var(--text-main)' }}>Home</Link>
          <Link to="/products?cat=trending" style={{ color: 'var(--text-main)' }}>Trending</Link>
        </nav>

        {/* Search Bar with Live Suggestions */}
        <div style={{ position: 'relative', width: '280px' }}>
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-full)', padding: '0.5rem 1rem', border: '1px solid var(--border-color)' }}>
            <Search size={18} color="var(--text-muted)" style={{ marginRight: '8px' }} />
            <input 
              type="text" 
              placeholder="Search for products, brands..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.85rem', color: 'var(--text-main)' }}
            />
          </form>

          {showSuggestions && searchQuery && (
            <div style={{ position: 'absolute', top: '110%', left: 0, right: 0, background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)', zIndex: 1200, padding: '0.5rem 0' }}>
              {searchSuggestions.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase())).map((item, idx) => (
                <div 
                  key={idx} 
                  onClick={() => {
                    setSearchQuery(item);
                    setShowSuggestions(false);
                    navigate(`/products?search=${encodeURIComponent(item)}`);
                  }}
                  style={{ padding: '8px 16px', fontSize: '0.85rem', cursor: 'pointer', color: 'var(--text-main)' }}
                  onMouseOver={(e) => e.target.style.background = 'var(--bg-secondary)'}
                  onMouseOut={(e) => e.target.style.background = 'transparent'}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Actions & Theme Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme} 
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', padding: '8px', borderRadius: '50%', color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} color="#fde047" /> : <Moon size={18} color="#111" />}
          </button>

          <Link to="/login" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-main)' }}>
            <User size={20} />
            <span>Account</span>
          </Link>
          
          <Link to="/wishlist" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-main)', position: 'relative' }}>
            <Heart size={20} />
            <span>Wishlist</span>
            {wishlistCount > 0 && (
              <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'var(--accent-pink)', color: '#fff', fontSize: '0.65rem', padding: '2px 5px', borderRadius: '50%' }}>{wishlistCount}</span>
            )}
          </Link>

          <Link to="/cart" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-main)', position: 'relative' }}>
            <ShoppingBag size={20} />
            <span>Cart</span>
            {cartCount > 0 && (
              <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'var(--accent-pink)', color: '#fff', fontSize: '0.65rem', padding: '2px 5px', borderRadius: '50%' }}>{cartCount}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}