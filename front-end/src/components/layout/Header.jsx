import { useState } from 'react';
import { Search, User, Heart, ShoppingBag, Sun, Moon, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import '../../assets/styles/header.css';

export default function Header({ cartCount, wishlistCount }) {
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const searchSuggestions = ['Heavyweight Hoodie', 'Designer Kurta', 'Cargo Pants', 'Festive Lehenga', 'Cotton Shirt'];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setShowSuggestions(false);
    }
  };
  const [activeSubcategoryBar, setActiveSubcategoryBar] = useState(false); // HE STATE ADD KR

  const womenSubTabs = [
    { name: "MY FEED", icon: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" },
    { name: "WINTER", icon: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&q=80&w=100" },
    { name: "SWEATSHIRTS", icon: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=100" },
    { name: "SAREES", icon: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=100" },
    { name: "ETHNIC SETS", icon: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=100" },
    { name: "DRESSES", icon: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=100" },
    { name: "KURTAS", icon: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=100" },
    { name: "JACKETS", icon: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=100" },
    { name: "TOPS", icon: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=100" },
    { name: "CO ORD SETS", icon: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=100" },
    { name: "BOTTOMS", icon: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=100" },
    { name: "SUITS", icon: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=100" },
    { name: "LINGERIE", icon: "https://images.unsplash.com/photo-1583846971131-30fc71d604b9?auto=format&fit=crop&q=80&w=100" },
    { name: "FOOTWEAR", icon: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=100" },
    { name: "ACCESSORIES", icon: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=100" }
  ];
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1100, background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
      
      {/* Promotional Announcement Bar */}
      <div style={{ background: 'var(--accent-pink)', color: '#fff', textAlign: 'center', padding: '6px 0', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.5px' }}>
        🔥 LIMITED TIME OFFER: Get Flat 50% Off on New Arrivals & Free Shipping on Orders Over ₹999! Shop Now.
      </div>

      {/* Main Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 3%' }}>
        
        {/* Left: Brand Logo */}
        <Link to="/" style={{ fontSize: '1.6rem', fontWeight: 900, letterSpacing: '1px', color: 'var(--text-main)' }}>
          AURA <span style={{ color: 'var(--accent-pink)' }}>FASHION</span>
        </Link>

        {/* Search Bar with Live Suggestions */}
        <div style={{ position: 'relative', width: '280px' }}>
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-full)', padding: '0.5rem 1rem', border: '1px solid var(--border-color)' }}>
            <Search size={18} color="var(--text-muted)" style={{ marginRight: '8px' }} />
            <input 
              type="text" 
              placeholder="Search products, brands..." 
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

          {/* Profile / Account Dropdown Section */}
          <div 
            style={{ position: 'relative' }}
            onMouseEnter={() => setShowProfileMenu(true)}
            onMouseLeave={() => setShowProfileMenu(false)}
          >
            <Link to="/login" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-main)', textDecoration: 'none' }}>
              <User size={20} />
              <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>Account <ChevronDown size={12} /></span>
            </Link>

            {showProfileMenu && (
              <div style={{
                position: 'absolute', top: '100%', right: 0, width: '240px',
                background: 'var(--card-bg)', border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)', padding: '1.2rem', zIndex: 1300,
                display: 'flex', flexDirection: 'column', gap: '1rem'
              }}>
                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>WELCOME!</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>To view account details & orders</p>
                </div>
                <Link to="/login" style={{ background: 'var(--accent-pink)', color: '#fff', textAlign: 'center', padding: '0.6rem', borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: '0.85rem' }}>LOGIN</Link>
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.8rem' }}>
                  <Link to="/orders" style={{ color: 'var(--text-main)', fontWeight: 600 }}>ORDERS</Link>
                  <Link to="/returns" style={{ color: 'var(--text-muted)' }}>RETURN / REPLACEMENT</Link>
                  <Link to="/credits" style={{ color: 'var(--text-muted)' }}>AURA CREDITS</Link>
                </div>
              </div>
            )}
          </div>
          
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

      {/* Second Level Navigation Bar with Mega Menus */}
      <nav style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', background: 'var(--bg-primary)', borderTop: '1px solid var(--border-color)', padding: '0.8rem 0' }}>
        
        {/* 1. WOMEN TAB (Complete Subtabs with Scrollbar) */}
        <div className="nav-item-wrapper">
          <span style={{ fontWeight: 'bold', cursor: 'pointer', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>WOMEN</span>
          <div className="mega-menu-dropdown" style={{ maxHeight: '480px', overflowY: 'auto' }}>
            <div className="menu-column">
              <h4>Ethnic Wear</h4>
              <ul>
                <li><Link to="/products">Kurta Kurtis</Link></li>
                <li><Link to="/products">Sarees</Link></li>
                <li><Link to="/products">Ethnic Sets</Link></li>
                <li><Link to="/products">Ethnic Co Ord Sets</Link></li>
                <li><Link to="/products">Lehengas And Blouse</Link></li>
                <li><Link to="/products">Ethnic Dresses</Link></li>
                <li><Link to="/products">Skirts</Link></li>
                <li><Link to="/products">Leggings & Churidaar</Link></li>
                <li><Link to="/products">Shawls & Dupattas</Link></li>
                <li><Link to="/products">Tapered Pants</Link></li>
                <li><Link to="/products">Woolen Kurta</Link></li>
                <li><Link to="/products">Unstitched Suits</Link></li>
              </ul>
              <h4 style={{ marginTop: '1rem' }}>Winter Wear</h4>
              <ul>
                <li><Link to="/products">Accessories Combo</Link></li>
              </ul>
            </div>

            <div className="menu-column">
              <h4>Western Wear</h4>
              <ul>
                <li><Link to="/products">Dresses</Link></li>
                <li><Link to="/products">Jeans</Link></li>
                <li><Link to="/products">Jeggings</Link></li>
                <li><Link to="/products">Tops</Link></li>
                <li><Link to="/products">Tunics</Link></li>
                <li><Link to="/products">T-Shirts</Link></li>
                <li><Link to="/products">Trousers</Link></li>
                <li><Link to="/products">Co Ord Set</Link></li>
                <li><Link to="/products">Shirts</Link></li>
                <li><Link to="/products">Jumpsuits</Link></li>
                <li><Link to="/products">Shorts</Link></li>
                <li><Link to="/products">Kaftans</Link></li>
                <li><Link to="/products">Shrugs</Link></li>
                <li><Link to="/products">Cargos</Link></li>
                <li><Link to="/products">Joggers</Link></li>
                <li><Link to="/products">Shackets</Link></li>
                <li><Link to="/products">Sweaters & Sweatshirts</Link></li>
                <li><Link to="/products">Jackets & Coats</Link></li>
                <li><Link to="/products">Mufflers & Caps</Link></li>
                <li><Link to="/products">Stoles</Link></li>
              </ul>
            </div>

            <div className="menu-column">
              <h4>Sports & Lingerie</h4>
              <ul>
                <li><Link to="/products">Swim Wear</Link></li>
                <li><Link to="/products">Tights</Link></li>
                <li><Link to="/products">Track Pants</Link></li>
                <li><Link to="/products">Sports Bra</Link></li>
                <li><Link to="/products">Bra & Panties</Link></li>
                <li><Link to="/products">Lingerie Sets</Link></li>
                <li><Link to="/products">Sleepwear</Link></li>
                <li><Link to="/products">Shape Wear</Link></li>
                <li><Link to="/products">Camisoles & Thermals</Link></li>
              </ul>
              <h4 style={{ marginTop: '1rem' }}>Western Wear Plus Size</h4>
              <ul>
                <li><Link to="/products">Dresses & Tops</Link></li>
                <li><Link to="/products">Co Ords & T-Shirts</Link></li>
              </ul>
            </div>

            <div className="menu-column">
              <h4>Jewellery & Footwear</h4>
              <ul>
                <li><Link to="/products">Imitation Jewellery</Link></li>
                <li><Link to="/products">Earrings</Link></li>
                <li><Link to="/products">Necklaces & Pendants</Link></li>
                <li><Link to="/products">Rings & Bracelets</Link></li>
                <li><Link to="/products">Flats & Heels</Link></li>
                <li><Link to="/products">Casual Shoes</Link></li>
                <li><Link to="/products">Flip Flops</Link></li>
                <li><Link to="/products">Sneakers & Boots</Link></li>
              </ul>
              <h4 style={{ marginTop: '1rem' }}>Electronics</h4>
              <ul>
                <li><Link to="/products">Smart Watches</Link></li>
                <li><Link to="/products">Bluetooth Speaker</Link></li>
                <li><Link to="/products">Earbuds & Neckband</Link></li>
              </ul>
            </div>

            <div className="menu-column">
              <h4>Brands</h4>
              <ul>
                <li><Link to="/products">3Buddy Fashion</Link></li>
                <li><Link to="/products">Anubhutte</Link></li>
                <li><Link to="/products">Aurelia</Link></li>
                <li><Link to="/products">Azira</Link></li>
                <li><Link to="/products">Baggit</Link></li>
                <li><Link to="/products">Clovia</Link></li>
                <li><Link to="/products">Cottinfab</Link></li>
                <li><Link to="/products">Drape And Dazzle</Link></li>
                <li><Link to="/products">Globus</Link></li>
                <li><Link to="/products">Hive91</Link></li>
                <li><Link to="/products">Miss Chase</Link></li>
                <li><Link to="/products">MELON - By PlusS</Link></li>
                <li><Link to="/products">Moomaya</Link></li>
                <li><Link to="/products">Oxolloxo</Link></li>
                <li><Link to="/products">SOCH</Link></li>
                <li><Link to="/products">Styli</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* 2. MEN TAB (Cleaned without citation numbers) */}
        <div className="nav-item-wrapper" onClick={() => setActiveSubcategoryBar(!activeSubcategoryBar)}>
          <span style={{ fontWeight: 'bold', cursor: 'pointer', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>MEN</span>
          <div className="mega-menu-dropdown" style={{ maxHeight: '480px', overflowY: 'auto' }}>
            <div className="menu-column">
              <h4>Top Wear</h4>
              <ul>
                <li><Link to="/products">Casual Shirts</Link></li>
                <li><Link to="/products">Co Ord Set</Link></li>
                <li><Link to="/products">Formal Shirts</Link></li>
                <li><Link to="/products">Polo T Shirts</Link></li>
                <li><Link to="/products">Suits & Blazers</Link></li>
                <li><Link to="/products">T-Shirts</Link></li>
                <li><Link to="/products">Oversized T Shirts</Link></li>
              </ul>
              <h4 style={{ marginTop: '1rem' }}>Bottom Wear</h4>
              <ul>
                <li><Link to="/products">Cargos</Link></li>
                <li><Link to="/products">Casual Trousers</Link></li>
                <li><Link to="/products">Formal Trousers</Link></li>
                <li><Link to="/products">Jeans</Link></li>
                <li><Link to="/products">Joggers</Link></li>
                <li><Link to="/products">Shorts & Three Fourth</Link></li>
              </ul>
            </div>

            <div className="menu-column">
              <h4>Ethnic Wear</h4>
              <ul>
                <li><Link to="/products">Ethnic Wear Sets</Link></li>
                <li><Link to="/products">Ethnic Bottom Wear</Link></li>
                <li><Link to="/products">Kurtas</Link></li>
                <li><Link to="/products">Nehru Jackets</Link></li>
                <li><Link to="/products">Waist Coat</Link></li>
              </ul>
              <h4 style={{ marginTop: '1rem' }}>Sports Wear</h4>
              <ul>
                <li><Link to="/products">Shorts</Link></li>
                <li><Link to="/products">T-Shirts</Link></li>
                <li><Link to="/products">Track Pants</Link></li>
                <li><Link to="/products">Track Suits</Link></li>
              </ul>
              <h4 style={{ marginTop: '1rem' }}>Plus Size</h4>
              <ul>
                <li><Link to="/products">Bottom Wear</Link></li>
                <li><Link to="/products">Inner Wear</Link></li>
                <li><Link to="/products">Top Wear</Link></li>
              </ul>
            </div>

            <div className="menu-column">
              <h4>Footwear</h4>
              <ul>
                <li><Link to="/products">Casual Shoes</Link></li>
                <li><Link to="/products">Formal Shoes</Link></li>
                <li><Link to="/products">Jutis And Mojaris</Link></li>
                <li><Link to="/products">Sports Shoes</Link></li>
                <li><Link to="/products">Slippers & Sandals</Link></li>
              </ul>
              <h4 style={{ marginTop: '1rem' }}>Winter Wear</h4>
              <ul>
                <li><Link to="/products">Sweatshirts</Link></li>
                <li><Link to="/products">Jackets</Link></li>
                <li><Link to="/products">Sweaters</Link></li>
                <li><Link to="/products">Shackets</Link></li>
                <li><Link to="/products">Shawls & Mufflers</Link></li>
                <li><Link to="/products">Thermals</Link></li>
                <li><Link to="/products">Gloves</Link></li>
                <li><Link to="/products">Accessories Combos</Link></li>
                <li><Link to="/products">Coats</Link></li>
              </ul>
            </div>

            <div className="menu-column">
              <h4>Accessories</h4>
              <ul>
                <li><Link to="/products">Caps And Hats</Link></li>
                <li><Link to="/products">Cufflinks & Bracelets</Link></li>
                <li><Link to="/products">Lapel Pins & Brooch</Link></li>
                <li><Link to="/products">Handkerchiefs</Link></li>
                <li><Link to="/products">Headphones & Speakers</Link></li>
                <li><Link to="/products">Socks</Link></li>
                <li><Link to="/products">Ties & Pocket Squares</Link></li>
              </ul>
              <h4 style={{ marginTop: '1rem' }}>Innerwear</h4>
              <ul>
                <li><Link to="/products">Boxers</Link></li>
                <li><Link to="/products">Briefs</Link></li>
                <li><Link to="/products">Vests</Link></li>
              </ul>
              <h4 style={{ marginTop: '1rem' }}>Electronics</h4>
              <ul>
                <li><Link to="/products">Smart Watches</Link></li>
                <li><Link to="/products">Bluetooth Speaker</Link></li>
                <li><Link to="/products">Earbuds</Link></li>
                <li><Link to="/products">Bluetooth Neckband</Link></li>
              </ul>
            </div>

            <div className="menu-column">
              <h4>Brands</h4>
              <ul>
                <li><Link to="/products">Linaria</Link></li>
                <li><Link to="/products">Xee</Link></li>
                <li><Link to="/products">Ketch</Link></li>
                <li><Link to="/products">RIGO</Link></li>
                <li><Link to="/products">SHOWOFF</Link></li>
                <li><Link to="/products">Duke</Link></li>
                <li><Link to="/products">FTX</Link></li>
                <li><Link to="/products">Dollar</Link></li>
                <li><Link to="/products">Veera Paridhaan</Link></li>
                <li><Link to="/products">MERRIMENT</Link></li>
                <li><Link to="/products">Classic Polo</Link></li>
                <li><Link to="/products">CAMEY</Link></li>
                <li><Link to="/products">Jompers</Link></li>
                <li><Link to="/products">GETGOLF</Link></li>
                <li><Link to="/products">UNIBERRY</Link></li>
                <li><Link to="/products">BLISS BOYS</Link></li>
                <li><Link to="/products">CHKOKKO</Link></li>
                <li><Link to="/products">CINOCCI</Link></li>
                <li><Link to="/products">KEPA</Link></li>
                <li><Link to="/products">OGEN</Link></li>
                <li><Link to="/products">UG Fashion</Link></li>
                <li><Link to="/products">VIDA LOCA</Link></li>
                <li><Link to="/products">XYRIS</Link></li>
              </ul>
            </div>
          </div>
        </div>
        {/* 3. KIDS TAB */}
        <div className="nav-item-wrapper">
          <span style={{ fontWeight: 'bold', cursor: 'pointer', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>KIDS</span>
          <div className="mega-menu-dropdown" style={{ maxHeight: '480px', overflowY: 'auto' }}>
            
            <div className="menu-column">
              <h4>Boys</h4>
              <ul>
                <li><Link to="/products">T-Shirts</Link></li>
                <li><Link to="/products">Shirts</Link></li>
                <li><Link to="/products">Bottom Wear</Link></li>
                <li><Link to="/products">Ethnic Wear</Link></li>
                <li><Link to="/products">Sweater & Sweatshirt</Link></li>
                <li><Link to="/products">Innerwear & Nightwear</Link></li>
                <li><Link to="/products">Twin Sets & Dungarees</Link></li>
                <li><Link to="/products">Suit Sets</Link></li>
              </ul>
              <h4 style={{ marginTop: '1rem' }}>Shop By Age</h4>
              <ul>
                <li><Link to="/products">0-2 Years</Link></li>
                <li><Link to="/products">2-6 Years</Link></li>
                <li><Link to="/products">6-12 Years</Link></li>
                <li><Link to="/products">12-16 Years</Link></li>
              </ul>
              <h4 style={{ marginTop: '1rem' }}>Winter Wear</h4>
              <ul>
                <li><Link to="/products">Sweatshirts</Link></li>
                <li><Link to="/products">Sweater & Cardigans</Link></li>
                <li><Link to="/products">Jackets</Link></li>
              </ul>
            </div>

            <div className="menu-column">
              <h4>Girls</h4>
              <ul>
                <li><Link to="/products">Dresses & Frocks</Link></li>
                <li><Link to="/products">Tees & Tops</Link></li>
                <li><Link to="/products">Bottom Wear</Link></li>
                <li><Link to="/products">Ethnic Wear</Link></li>
                <li><Link to="/products">Sweater, Sweatshirts & Cardigans</Link></li>
                <li><Link to="/products">Twin Sets & Jump Suits</Link></li>
                <li><Link to="/products">Innerwear & Nightwear</Link></li>
                <li><Link to="/products">Leggings</Link></li>
                <li><Link to="/products">Party Gowns</Link></li>
                <li><Link to="/products">Girls Panty</Link></li>
              </ul>
              <h4 style={{ marginTop: '1rem' }}>Shop By Age</h4>
              <ul>
                <li><Link to="/products">0-2 Years</Link></li>
                <li><Link to="/products">2-6 Years</Link></li>
                <li><Link to="/products">6-12 Years</Link></li>
                <li><Link to="/products">12-16 Years</Link></li>
              </ul>
            </div>

            <div className="menu-column">
              <h4>Footwear</h4>
              <ul>
                <li><Link to="/products">Sandals & Floaters</Link></li>
                <li><Link to="/products">Casual Shoes</Link></li>
                <li><Link to="/products">Sports Shoes</Link></li>
                <li><Link to="/products">Formal Shoes</Link></li>
              </ul>
              <h4 style={{ marginTop: '1rem' }}>Accessories</h4>
              <ul>
                <li><Link to="/products">Socks</Link></li>
                <li><Link to="/products">Cap</Link></li>
                <li><Link to="/products">Sunglasses</Link></li>
                <li><Link to="/products">Bag</Link></li>
              </ul>
              <h4 style={{ marginTop: '1rem' }}>Bed & Bath</h4>
              <ul>
                <li><Link to="/products">Bedsheet</Link></li>
                <li><Link to="/products">Mat</Link></li>
                <li><Link to="/products">Blanket</Link></li>
                <li><Link to="/products">Curtain</Link></li>
              </ul>
              <h4 style={{ marginTop: '1rem' }}>Infants</h4>
              <ul>
                <li><Link to="/products">Onesizes & Rompers</Link></li>
                <li><Link to="/products">Frocks</Link></li>
                <li><Link to="/products">Twin Sets</Link></li>
                <li><Link to="/products">Diaper</Link></li>
              </ul>
            </div>

            <div className="menu-column">
              <h4>Brands</h4>
              <ul>
                <li><Link to="/products">Eavan</Link></li>
                <li><Link to="/products">Under Fourteen Only</Link></li>
                <li><Link to="/products">BEING NAUGHTY</Link></li>
                <li><Link to="/products">Fashion Dream</Link></li>
                <li><Link to="/products">MoMaa</Link></li>
                <li><Link to="/products">Polka Tots</Link></li>
                <li><Link to="/products">U.S. Polo Assn. Kids</Link></li>
                <li><Link to="/products">TALES & STORIES</Link></li>
                <li><Link to="/products">NeuVin</Link></li>
              </ul>
            </div>

            <div className="menu-column">
              <h4>Age Groups</h4>
              <ul>
                <li><Link to="/products" style={{ background: 'var(--accent-pink)', color: '#fff', padding: '4px 8px', borderRadius: '4px', display: 'inline-block', marginBottom: '6px' }}>Infants (0-24M)</Link></li>
                <li><Link to="/products" style={{ background: 'var(--accent-pink)', color: '#fff', padding: '4px 8px', borderRadius: '4px', display: 'inline-block', marginBottom: '6px' }}>Kids (2-8Y)</Link></li>
                <li><Link to="/products" style={{ background: 'var(--accent-pink)', color: '#fff', padding: '4px 8px', borderRadius: '4px', display: 'inline-block', marginBottom: '6px' }}>Pre Teen (8-12Y)</Link></li>
                <li><Link to="/products" style={{ background: 'var(--accent-pink)', color: '#fff', padding: '4px 8px', borderRadius: '4px', display: 'inline-block' }}>Teen (12-18Y)</Link></li>
              </ul>
            </div>

          </div>
        </div>

        {/* 4. HOME TAB */}
        <div className="nav-item-wrapper">
          <span style={{ fontWeight: 'bold', cursor: 'pointer', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>HOME</span>
          <div className="mega-menu-dropdown" style={{ minWidth: '600px', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div className="menu-column">
              <h4>Bed Linen</h4>
              <ul>
                <li><Link to="/products">Bed Sheet Sets</Link></li>
                <li><Link to="/products">Comforters</Link></li>
                <li><Link to="/products">Blankets</Link></li>
              </ul>
            </div>
            <div className="menu-column">
              <h4>Bath</h4>
              <ul>
                <li><Link to="/products">Towels</Link></li>
                <li><Link to="/products">Bath Mats</Link></li>
              </ul>
            </div>
            <div className="menu-column">
              <h4>Brands</h4>
              <ul>
                <li><Link to="/products">Bella Casa</Link></li>
                <li><Link to="/products">Cortina</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <span style={{ fontWeight: '600', cursor: 'pointer', fontSize: '0.95rem', textTransform: 'uppercase', color: 'var(--accent-pink)' }}>OFFERS</span>
        <span style={{ fontWeight: '600', cursor: 'pointer', fontSize: '0.95rem', textTransform: 'uppercase' }}>VMART</span>
      {activeSubcategoryBar && (
  <div style={{
    background: 'var(--bg-secondary)',
    borderTop: '1px solid var(--border-color)',
    borderBottom: '2px solid var(--accent-pink)',
    padding: '1rem 2%',
    display: 'flex',
    gap: '1.8rem',
    overflowX: 'auto',
    zIndex: 1050
  }}>
    {[
      { name: "MY FEED", icon: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" },
      { name: "WINTER", icon: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&q=80&w=100" },
      { name: "SWEATSHIRTS", icon: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=100" },
      { name: "SAREES", icon: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=100" },
      { name: "DRESSES", icon: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=100" }
    ].map((sub, idx) => (
      <div 
        key={idx}
        onClick={() => navigate(`/products?category=${sub.name.toLowerCase()}`)}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', minWidth: '70px', flexShrink: 0 }}
      >
        <div style={{ width: '55px', height: '55px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--accent-pink)', marginBottom: '6px', background: '#fff' }}>
          <img src={sub.icon} alt={sub.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <span style={{ fontSize: '0.7rem', fontWeight: 700, textAlign: 'center', color: 'var(--text-main)', whiteSpace: 'nowrap' }}>
          {sub.name}
        </span>
      </div>
    ))}
  </div>
)}
      </nav>
    </header>
  );
}