import React from 'react';
import { Apple, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-secondary, #f9fafb)', color: 'var(--text-main, #111827)', borderTop: '1px solid var(--border-color, #e5e7eb)', padding: '4rem 5% 2rem 5%', marginTop: '5rem', fontSize: '0.85rem' }}>
      
      {/* Main Footer Columns Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>
        
        {/* Column 1: Marketplace Info */}
        <div>
          <h4 style={{ fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '1.2rem', letterSpacing: '0.5px', fontSize: '0.9rem' }}>Aura MarketPlace</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
            <li><Link to="/about" style={{ color: 'var(--text-muted, #4b5563)', textDecoration: 'none' }}>About Us</Link></li>
            <li><Link to="/careers" style={{ color: 'var(--text-muted, #4b5563)', textDecoration: 'none' }}>Careers</Link></li>
            <li><Link to="/terms" style={{ color: 'var(--text-muted, #4b5563)', textDecoration: 'none' }}>Terms of Use</Link></li>
            <li><Link to="/privacy" style={{ color: 'var(--text-muted, #4b5563)', textDecoration: 'none' }}>Privacy Policy</Link></li>
            <li><Link to="/affiliates" style={{ color: 'var(--text-muted, #4b5563)', textDecoration: 'none' }}>Affiliates</Link></li>
            <li><Link to="/sitemap" style={{ color: 'var(--text-muted, #4b5563)', textDecoration: 'none' }}>Sitemap</Link></li>
            <li><Link to="/blog" style={{ color: 'var(--text-muted, #4b5563)', textDecoration: 'none' }}>Blog</Link></li>
          </ul>
        </div>

        {/* Column 2: Customer Service */}
        <div>
          <h4 style={{ fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '1.2rem', letterSpacing: '0.5px', fontSize: '0.9rem' }}>Customer Service</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
            <li><Link to="/shopping" style={{ color: 'var(--text-muted, #4b5563)', textDecoration: 'none' }}>Shopping</Link></li>
            <li><Link to="/offers" style={{ color: 'var(--text-muted, #4b5563)', textDecoration: 'none' }}>Offers & Promotions</Link></li>
            <li><Link to="/payments" style={{ color: 'var(--text-muted, #4b5563)', textDecoration: 'none' }}>Payments</Link></li>
            <li><Link to="/cancellation" style={{ color: 'var(--text-muted, #4b5563)', textDecoration: 'none' }}>Cancellation</Link></li>
            <li><Link to="/returns" style={{ color: 'var(--text-muted, #4b5563)', textDecoration: 'none' }}>Returns & Refunds</Link></li>
            <li><Link to="/returns-policy" style={{ color: 'var(--text-muted, #4b5563)', textDecoration: 'none' }}>Returns Policy</Link></li>
            <li><Link to="/contact" style={{ color: 'var(--text-muted, #4b5563)', textDecoration: 'none' }}>Contact Us</Link></li>
            <li><Link to="/help" style={{ color: 'var(--text-muted, #4b5563)', textDecoration: 'none' }}>FAQ & Help</Link></li>
          </ul>
        </div>

        {/* Column 3: My Account */}
        <div>
          <h4 style={{ fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '1.2rem', letterSpacing: '0.5px', fontSize: '0.9rem' }}>My Aura Fashion</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
            <li><Link to="/login" style={{ color: 'var(--text-muted, #4b5563)', textDecoration: 'none' }}>My Account</Link></li>
            <li><Link to="/orders" style={{ color: 'var(--text-muted, #4b5563)', textDecoration: 'none' }}>My Orders</Link></li>
            <li><Link to="/cart" style={{ color: 'var(--text-muted, #4b5563)', textDecoration: 'none' }}>My Shopping Bag</Link></li>
            <li><Link to="/wishlist" style={{ color: 'var(--text-muted, #4b5563)', textDecoration: 'none' }}>My Wishlist</Link></li>
          </ul>
        </div>

        {/* Column 4: Offerings / Popular Search Links */}
        <div style={{ gridColumn: 'span 2' }}>
          <h4 style={{ fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '1.2rem', letterSpacing: '0.5px', fontSize: '0.9rem' }}>Aura Fashion Offerings</h4>
          <p style={{ color: 'var(--text-muted, #4b5563)', lineHeight: '1.8', fontSize: '0.8rem' }}>
            <a href="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Watches for Men</a> | <a href="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Campus Shoes</a> | <a href="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Sandals for Men</a> | <a href="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Sneakers for Men</a> | <a href="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Reebok Shoes</a> | <a href="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Cotton Kurtis</a> | <a href="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Woodland Shoes</a> | <a href="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Jumpsuits</a> | <a href="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Allen Solly</a> | <a href="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Sparx Shoes</a> | <a href="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Gold Rings</a> | <a href="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Formal Shoes for Men</a> | <a href="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Sports Shoes for Men</a> | <a href="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Wallets for Men</a> | <a href="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Ladies Watches</a> | <a href="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Handbags for Women</a> | <a href="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Sling Bags for Women</a> | <a href="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Casual Shoes for Men</a> | <a href="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Boots for Men</a> | <a href="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Digital Watches</a> | <a href="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Sonata Watches</a> | <a href="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Puma Shoes</a> | <a href="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Fabindia</a> | <a href="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Utsa</a> | <a href="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Vark</a> | <a href="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Gia</a>
          </p>
        </div>

      </div>

      {/* Bottom Bar: App Download & Social Links & Copyright */}
      <div style={{ borderTop: '1px solid var(--border-color, #e5e7eb)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
        
        {/* Download App */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontWeight: 'bold', fontSize: '0.85rem' }}>Download App</span>
          <div style={{ display: 'flex', gap: '0.8rem', color: 'var(--text-main)' }}>
            <Smartphone size={20} style={{ cursor: 'pointer' }} />
            <Apple size={20} style={{ cursor: 'pointer' }} />
          </div>
        </div>

        {/* Social Media Links text/icons */}
        <div style={{ display: 'flex', gap: '1.2rem', fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <span style={{ cursor: 'pointer' }}>Facebook</span>
          <span style={{ cursor: 'pointer' }}>Twitter</span>
          <span style={{ cursor: 'pointer' }}>Instagram</span>
          <span style={{ cursor: 'pointer' }}>YouTube</span>
          <span style={{ cursor: 'pointer' }}>LinkedIn</span>
        </div>

        {/* Copyright */}
        <div style={{ color: 'var(--text-muted, #4b5563)', fontSize: '0.8rem' }}>
          &copy; 2026 AURA Fashion. All rights reserved.
        </div>

      </div>
    </footer>
  );
}