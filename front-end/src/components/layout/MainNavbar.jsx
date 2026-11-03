import { useState } from 'react';
import { Search, User, Heart, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function MainNavbar({ cartCount, wishlistCount, isLuxe, setIsLuxe }) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 3%', borderBottom: '1px solid var(--border-color)', background: '#fff' }}>
      {/* Brand Logo */}
      <Link to="/" style={{ fontSize: '1.6rem', fontWeight: 900, letterSpacing: '1px', color: '#111' }}>
        AURA <span style={{ color: 'var(--accent-pink)' }}>FASHION</span>
      </Link>

      {/* Main Nav Tabs */}
      <nav style={{ display: 'flex', gap: '2rem', fontWeight: 600, fontSize: '0.95rem' }}>
        <Link to="/" style={{ color: 'var(--accent-pink)', borderBottom: '2px solid var(--accent-pink)', paddingBottom: '4px' }}>Women</Link>
        <Link to="/products?cat=men" style={{ color: 'var(--text-main)' }}>Men</Link>
        <Link to="/products?cat=kids" style={{ color: 'var(--text-main)' }}>Kids</Link>
        <Link to="/products?cat=home" style={{ color: 'var(--text-main)' }}>Home</Link>
        <Link to="/products?cat=more" style={{ color: 'var(--text-main)' }}>More</Link>
      </nav>

      {/* Search Bar */}
      <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-full)', padding: '0.5rem 1rem', width: '300px', border: '1px solid var(--border-color)' }}>
        <Search size={18} color="var(--text-muted)" style={{ marginRight: '8px' }} />
        <input 
          type="text" 
          placeholder="Search for products, styles, brands..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.85rem' }}
        />
      </form>

      {/* Right Actions & Luxe Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        {/* Fashion / Luxe Switch */}
        <div style={{ display: 'flex', background: '#f3f4f6', borderRadius: '20px', padding: '3px' }}>
          <button 
            onClick={() => setIsLuxe(false)} 
            style={{ padding: '4px 10px', fontSize: '0.75rem', fontWeight: 'bold', borderRadius: '16px', background: !isLuxe ? '#fff' : 'transparent', boxShadow: !isLuxe ? 'var(--shadow-sm)' : 'none' }}>
            Fashion
          </button>
          <button 
            onClick={() => setIsLuxe(true)} 
            style={{ padding: '4px 10px', fontSize: '0.75rem', fontWeight: 'bold', borderRadius: '16px', background: isLuxe ? '#111' : 'transparent', color: isLuxe ? '#fff' : '#666', boxShadow: isLuxe ? 'var(--shadow-sm)' : 'none' }}>
            Luxe
          </button>
        </div>

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
  );
}