import React from 'react';
import '../../assets/styles/header.css';

export default function CategoryNavbar() {
  return (
    <nav style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-color)', padding: '0.8rem 0' }}>
      
      {/* 1. WOMEN TAB (Updated with missing subtabs from image) */}
      <div className="nav-item-wrapper">
        <span style={{ fontWeight: 'bold', cursor: 'pointer', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          WOMEN
        </span>
        <div className="mega-menu-dropdown">
          <div className="menu-column">
            <h4>Ethnic Wear</h4>
            <ul>
              <li><a href="/products">Kurta Kurtis</a></li>
              <li><a href="/products">Sarees</a></li>
              <li><a href="/products">Ethnic Sets</a></li>
              <li><a href="/products">Lehengas And Blouse</a></li>
              <li><a href="/products">Skirts</a></li>
              <li><a href="/products">Leggings, Salwar & Churidaar</a></li>
              <li><a href="/products">Shawls & Dupattas</a></li>
              <li><a href="/products">Tapered Pants</a></li>
              <li><a href="/products">Woolen Kurta</a></li>
              <li><a href="/products">Unstitched & Semi Stitched Suits</a></li>
            </ul>
            <h4 style={{ marginTop: '1rem' }}>Winter Wear</h4>
            <ul>
              <li><a href="/products">Accessories Combo</a></li>
            </ul>
          </div>

          <div className="menu-column">
            <h4>Western Wear</h4>
            <ul>
              <li><a href="/products">Dresses</a></li>
              <li><a href="/products">Jeans</a></li>
              <li><a href="/products">Tops</a></li>
              <li><a href="/products">T-Shirts</a></li>
              <li><a href="/products">Trousers</a></li>
              <li><a href="/products">Co Ord Set</a></li>
              <li><a href="/products">Shirts</a></li>
              <li><a href="/products">Jumpsuits</a></li>
              <li><a href="/products">Shorts</a></li>
              <li><a href="/products">Kaftans</a></li>
              <li><a href="/products">Shrugs</a></li>
              <li><a href="/products">Cargos</a></li>
              <li><a href="/products">Joggers</a></li>
              <li><a href="/products">Shackets</a></li>
              <li><a href="/products">Sweaters & Sweatshirts</a></li>
              <li><a href="/products">Jackets, Blazers & Coats</a></li>
              <li><a href="/products">Mufflers, Gloves & Caps</a></li>
              <li><a href="/products">Stoles</a></li>
            </ul>
          </div>

          <div className="menu-column">
            <h4>Lingerie & Plus Size</h4>
            <ul>
              <li><a href="/products">Panties</a></li>
              <li><a href="/products">Lingerie Sets</a></li>
              <li><a href="/products">Sleepwear & Loungewear</a></li>
              <li><a href="/products">Shape Wear</a></li>
              <li><a href="/products">Camisoles & Thermals</a></li>
            </ul>
            <h4 style={{ marginTop: '1rem' }}>Western Wear Plus Size</h4>
            <ul>
              <li><a href="/products">Dresses</a></li>
              <li><a href="/products">Tops</a></li>
              <li><a href="/products">Co Ords</a></li>
              <li><a href="/products">T-Shirts</a></li>
            </ul>
          </div>

          <div className="menu-column">
            <h4>Footwear & Electronics</h4>
            <ul>
              <li><a href="/products">Flats & Heels</a></li>
              <li><a href="/products">Casual Shoes</a></li>
              <li><a href="/products">Flip Flops</a></li>
              <li><a href="/products">Sport Shoes & Sneakers</a></li>
              <li><a href="/products">Boots</a></li>
            </ul>
            <h4 style={{ marginTop: '1rem' }}>Electronics</h4>
            <ul>
              <li><a href="/products">Smart Watches</a></li>
              <li><a href="/products">Bluetooth Speaker</a></li>
              <li><a href="/products">Earbuds</a></li>
              <li><a href="/products">Bluetooth Neckband</a></li>
            </ul>
          </div>

          <div className="menu-column">
            <h4>Brands</h4>
            <ul>
              <li><a href="/products">Drape And Dazzle</a></li>
              <li><a href="/products">Globus</a></li>
              <li><a href="/products">Hive91</a></li>
              <li><a href="/products">Miss Chase</a></li>
              <li><a href="/products">MELON - By PlusS</a></li>
              <li><a href="/products">Moomaya</a></li>
              <li><a href="/products">Oxolloxo</a></li>
              <li><a href="/products">SOCH</a></li>
              <li><a href="/products">Styli</a></li>
              <li><a href="/products">VredeVogel</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* 2. MEN TAB (Updated with missing subtabs from second image) */}
      <div className="nav-item-wrapper">
        <span style={{ fontWeight: 'bold', cursor: 'pointer', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          MEN
        </span>
        <div className="mega-menu-dropdown">
          <div className="menu-column">
            <h4>Top Wear</h4>
            <ul>
              <li><a href="/products">T-Shirts</a></li>
              <li><a href="/products">Oversized T Shirts</a></li>
              <li><a href="/products">Casual Shirts</a></li>
              <li><a href="/products">Formal Shirts</a></li>
              <li><a href="/products">Polo T Shirts</a></li>
              <li><a href="/products">Suits & Blazers</a></li>
            </ul>
            <h4 style={{ marginTop: '1rem' }}>Bottom Wear</h4>
            <ul>
              <li><a href="/products">Cargos</a></li>
              <li><a href="/products">Casual Trousers</a></li>
              <li><a href="/products">Formal Trousers</a></li>
              <li><a href="/products">Jeans</a></li>
              <li><a href="/products">Joggers</a></li>
              <li><a href="/products">Shorts & Three Fourth</a></li>
            </ul>
          </div>

          <div className="menu-column">
            <h4>Sports Wear</h4>
            <ul>
              <li><a href="/products">Shorts</a></li>
              <li><a href="/products">T-Shirts</a></li>
              <li><a href="/products">Track Pants</a></li>
              <li><a href="/products">Track Suits</a></li>
            </ul>
            <h4 style={{ marginTop: '1rem' }}>Plus Size</h4>
            <ul>
              <li><a href="/products">Bottom Wear</a></li>
              <li><a href="/products">Inner Wear</a></li>
              <li><a href="/products">Top Wear</a></li>
            </ul>
          </div>

          <div className="menu-column">
            <h4>Winter Wear</h4>
            <ul>
              <li><a href="/products">Sweatshirts</a></li>
              <li><a href="/products">Jackets</a></li>
              <li><a href="/products">Sweaters</a></li>
              <li><a href="/products">Shackets</a></li>
              <li><a href="/products">Shawls & Mufflers</a></li>
              <li><a href="/products">Thermals</a></li>
              <li><a href="/products">Gloves</a></li>
              <li><a href="/products">Accessories Combos</a></li>
              <li><a href="/products">Coats</a></li>
            </ul>
          </div>

          <div className="menu-column">
            <h4>Accessories & Innerwear</h4>
            <ul>
              <li><a href="/products">Socks</a></li>
              <li><a href="/products">Ties & Pocket Squares</a></li>
              <li><a href="/products">Boxers</a></li>
              <li><a href="/products">Briefs</a></li>
              <li><a href="/products">Vests</a></li>
            </ul>
            <h4 style={{ marginTop: '1rem' }}>Electronics</h4>
            <ul>
              <li><a href="/products">Smart Watches</a></li>
              <li><a href="/products">Bluetooth Speaker</a></li>
              <li><a href="/products">Earbuds</a></li>
              <li><a href="/products">Bluetooth Neckband</a></li>
            </ul>
          </div>

          <div className="menu-column">
            <h4>Brands</h4>
            <ul>
              <li><a href="/products">Duke</a></li>
              <li><a href="/products">FTX</a></li>
              <li><a href="/products">Dollar</a></li>
              <li><a href="/products">Classic Polo</a></li>
              <li><a href="/products">Jompers</a></li>
              <li><a href="/products">GETGOLF</a></li>
              <li><a href="/products">UNIBERRY</a></li>
              <li><a href="/products">BLISS BOYS</a></li>
              <li><a href="/products">CHKOKKO</a></li>
              <li><a href="/products">XYRIS</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. KIDS TAB */}
      <div className="nav-item-wrapper">
        <span style={{ fontWeight: 'bold', cursor: 'pointer', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          KIDS
        </span>
        <div className="mega-menu-dropdown">
          <div className="menu-column">
            <h4>Boys</h4>
            <ul>
              <li><a href="/products">T-Shirts</a></li>
              <li><a href="/products">Shirts</a></li>
              <li><a href="/products">Bottom Wear</a></li>
            </ul>
          </div>
          <div className="menu-column">
            <h4>Girls</h4>
            <ul>
              <li><a href="/products">Dresses & Frocks</a></li>
              <li><a href="/products">Tees & Tops</a></li>
              <li><a href="/products">Leggings</a></li>
            </ul>
          </div>
          <div className="menu-column">
            <h4>Footwear & Toys</h4>
            <ul>
              <li><a href="/products">Sandals</a></li>
              <li><a href="/products">Casual Shoes</a></li>
            </ul>
          </div>
          <div className="menu-column">
            <h4>Brands</h4>
            <ul>
              <li><a href="/products">Fashion Dream</a></li>
              <li><a href="/products">Polka Tots</a></li>
            </ul>
          </div>
          <div className="menu-column">
            <h4>Age Categories</h4>
            <ul>
              <li><a href="/products">Infants (0-24M)</a></li>
              <li><a href="/products">Kids (2-8Y)</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* 4. HOME TAB */}
      <div className="nav-item-wrapper">
        <span style={{ fontWeight: 'bold', cursor: 'pointer', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          HOME
        </span>
        <div className="mega-menu-dropdown" style={{ minWidth: '600px', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <div className="menu-column">
            <h4>Bed Linen & Furnishing</h4>
            <ul>
              <li><a href="/products">Bed Sheet Sets</a></li>
              <li><a href="/products">Quilts & Comforters</a></li>
              <li><a href="/products">Blankets</a></li>
            </ul>
          </div>
          <div className="menu-column">
            <h4>Bath</h4>
            <ul>
              <li><a href="/products">Towels</a></li>
              <li><a href="/products">Bath Mats</a></li>
            </ul>
          </div>
          <div className="menu-column">
            <h4>Brands</h4>
            <ul>
              <li><a href="/products">Bella Casa</a></li>
              <li><a href="/products">Cortina</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* 5. OFFERS TAB */}
      <span style={{ fontWeight: '600', cursor: 'pointer', fontSize: '0.95rem', textTransform: 'uppercase', color: 'var(--accent-pink)' }}>
        OFFERS
      </span>

      {/* 6. VMART TAB */}
      <span style={{ fontWeight: '600', cursor: 'pointer', fontSize: '0.95rem', textTransform: 'uppercase' }}>
        VMART
      </span>

    </nav>
  );
}