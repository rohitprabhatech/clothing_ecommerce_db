import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "THE BIG FASHION SALE",
      subtitle: "UP TO 75% OFF",
      bgGradient: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1200"
    },
    {
      title: "ETHNIC CELEBRATION EDIT",
      subtitle: "EXTRA 20% OFF ON DESIGNER WEAR",
      bgGradient: "linear-gradient(135deg, #831843 0%, #db2777 100%)",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div style={{ position: 'relative', width: '94%', margin: '2rem auto', height: '420px', borderRadius: '16px', overflow: 'hidden', background: slides[currentSlide].bgGradient, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4%', color: '#fff', boxShadow: 'var(--shadow-lg)' }}>
      
      {/* Left Content */}
      <div style={{ zIndex: 2, maxWidth: '500px' }}>
        <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px' }}>POWERED BY STYLES & CO.</span>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 900, lineHeight: 1.1, margin: '1rem 0' }}>{slides[currentSlide].title}</h1>
        <p style={{ fontSize: '1.5rem', fontWeight: 600, color: '#fde047', marginBottom: '2rem' }}>{slides[currentSlide].subtitle}</p>
        <button style={{ background: '#fff', color: '#111', padding: '0.9rem 2.2rem', fontWeight: 800, borderRadius: 'var(--radius-full)', boxShadow: 'var(--shadow-sm)' }}>
          SHOP NOW
        </button>
      </div>

      {/* Right Image */}
      <div style={{ height: '100%', width: '45%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <img src={slides[currentSlide].image} alt="Banner Model" style={{ height: '90%', borderRadius: '12px', objectFit: 'cover', boxShadow: 'var(--shadow-lg)' }} />
      </div>

      {/* Controls */}
      <button onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))} style={{ position: 'absolute', left: '20px', background: 'rgba(0,0,0,0.5)', color: '#fff', padding: '10px', borderRadius: '50%' }}>
        <ChevronLeft size={24} />
      </button>
      <button onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)} style={{ position: 'absolute', right: '20px', background: 'rgba(0,0,0,0.5)', color: '#fff', padding: '10px', borderRadius: '50%' }}>
        <ChevronRight size={24} />
      </button>
    </div>
  );
}