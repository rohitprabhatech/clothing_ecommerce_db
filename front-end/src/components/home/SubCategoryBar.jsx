import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SubCategoryBar() {
  const navigate = useNavigate();

  const subTabs = [
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
    <div style={{
      background: 'var(--bg-secondary, #f8f9fa)',
      borderBottom: '1px solid var(--border-color, #e5e7eb)',
      padding: '1.2rem 2%',
      display: 'flex',
      justifyContent: 'center',
      gap: '2.2rem',
      overflowX: 'auto',
      scrollbarWidth: 'none',
      width: '100%'
    }}>
      {subTabs.map((sub, idx) => (
        <div 
          key={idx}
          onClick={() => navigate(`/products?category=${sub.name.toLowerCase()}`)}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', minWidth: '70px', flexShrink: 0 }}
        >
          <div style={{
            width: '58px', height: '58px', borderRadius: '50%', overflow: 'hidden',
            border: idx === 0 ? '2px solid var(--accent-pink, #e91e63)' : '2px solid #ccc',
            marginBottom: '6px', background: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}>
            <img src={sub.icon} alt={sub.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, textAlign: 'center', color: 'var(--text-main, #111)', whiteSpace: 'nowrap', letterSpacing: '0.3px' }}>
            {sub.name}
          </span>
        </div>
      ))}
    </div>
  );
}