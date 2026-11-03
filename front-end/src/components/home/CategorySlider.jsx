import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CategorySlider() {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const categories = [
    { name: "Westernwear", image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=300" },
    { name: "Indianwear", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=300" },
    { name: "Men", image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=300" },
    { name: "Kids", image: "https://images.unsplash.com/photo-1503944583266-f14a1236fb6b?auto=format&fit=crop&q=80&w=300" },
    { name: "Home", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=300" },
    { name: "Footwear", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=300" },
    { name: "Lingerie", image: "https://images.unsplash.com/photo-1583846971131-30fc71d604b9?auto=format&fit=crop&q=80&w=300" },
    { name: "Bags", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=300" },
    { name: "Sportswear", image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=300" },
    { name: "Jewellery", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=300" },
    { name: "Sneakers", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=300" },
    { name: "Watches", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=300" },
    { name: "Sunglasses", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=300" }
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const offset = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ position: 'relative', width: '90%', margin: '2rem auto', padding: '0 1rem' }}>
      
      {/* Left Scroll Button */}
      <button 
        onClick={() => scroll('left')}
        style={{
          position: 'absolute', left: '-15px', top: '50%', transform: 'translateY(-50%)',
          zIndex: 10, background: 'var(--card-bg)', border: '1px solid var(--border-color)',
          borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: 'var(--shadow-md)', cursor: 'pointer', color: 'var(--text-main)'
        }}
      >
        <ChevronLeft size={22} />
      </button>

      {/* Scrollable Container */}
      <div 
        ref={scrollRef}
        style={{
          display: 'flex', gap: '1.5rem', overflowX: 'auto', scrollbarWidth: 'none',
          msOverflowStyle: 'none', padding: '1rem 0.5rem', scrollBehavior: 'smooth'
        }}
      >
        {categories.map((cat, index) => (
          <div 
            key={index}
            onClick={() => navigate(`/products?category=${cat.name.toLowerCase()}`)}
            style={{ minWidth: '110px', textAlign: 'center', cursor: 'pointer', flexShrink: 0 }}
          >
            <div style={{
              width: '100px', height: '110px', borderRadius: '12px', overflow: 'hidden',
              border: '2px solid var(--border-color)', boxShadow: 'var(--shadow-sm)', margin: '0 auto 8px auto',
              background: 'var(--bg-secondary)', transition: 'transform 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
            >
              <img src={cat.image} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>{cat.name}</span>
          </div>
        ))}
      </div>

      {/* Right Scroll Button */}
      <button 
        onClick={() => scroll('right')}
        style={{
          position: 'absolute', right: '-15px', top: '50%', transform: 'translateY(-50%)',
          zIndex: 10, background: 'var(--card-bg)', border: '1px solid var(--border-color)',
          borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: 'var(--shadow-md)', cursor: 'pointer', color: 'var(--text-main)'
        }}
      >
        <ChevronRight size={22} />
      </button>
    </div>
  );
}