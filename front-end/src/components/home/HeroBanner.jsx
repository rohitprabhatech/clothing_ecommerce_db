import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const banners = [
    {
      title: "ETHNIC CELEBRATION EDIT",
      subtitle: "EXTRA 20% OFF ON DESIGNER WEAR",
      bg: "#9c27b0",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "THE BIG FASHION SALE",
      subtitle: "UP TO 75% OFF ON TRENDING STYLES",
      bg: "#3f51b5",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "WINTER LAYER STREETWEAR",
      subtitle: "FLAT 40% OFF ON HOODIES & JACKETS",
      bg: "#e91e63",
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "KIDS FASHION PARADE",
      subtitle: "EXCITING DISCOUNTS ON ETHNIC & CASUALS",
      bg: "#009688",
      image: "https://images.unsplash.com/photo-1503944583266-f14a1236fb6b?auto=format&fit=crop&q=80&w=600"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const current = banners[currentIndex];

  return (
    <div style={{ width: '92%', margin: '1.5rem auto', position: 'relative' }}>
      
      <div style={{
        background: current.bg,
        borderRadius: '16px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-lg)',
        minHeight: '340px'
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '3rem 4%',
              color: '#fff',
              width: '100%',
              height: '100%'
            }}
          >
            {/* Left Content Slide-In from Left */}
            <motion.div 
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ maxWidth: '55%', zIndex: 2 }}
            >
              <span style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
                Powered by Styles & Co.
              </span>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: '1.2', margin: '1rem 0', letterSpacing: '1px' }}>
                {current.title}
              </h1>
              <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fde047', marginBottom: '1.5rem', letterSpacing: '0.5px' }}>
                {current.subtitle}
              </p>
              <button 
                onClick={() => navigate('/products')}
                style={{
                  background: '#fff', color: '#111', border: 'none', padding: '0.8rem 2rem',
                  borderRadius: 'var(--radius-full)', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer',
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                SHOP NOW
              </button>
            </motion.div>

            {/* Right Image Card: Baherun (Right side tun aat madhe yene) Slide-In Animation */}
            <motion.div 
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              style={{ width: '400px', height: '280px', borderRadius: '12px', overflow: 'hidden', background: '#fff', boxShadow: 'var(--shadow-md)', zIndex: 2 }}
            >
              <img src={current.image} alt={current.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Left Arrow */}
        <button 
          onClick={prevSlide}
          style={{
            position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(0,0,0,0.4)', border: 'none', borderRadius: '50%',
            width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', cursor: 'pointer', zIndex: 10
          }}
        >
          <ChevronLeft size={22} />
        </button>

        {/* Right Arrow */}
        <button 
          onClick={nextSlide}
          style={{
            position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(0,0,0,0.4)', border: 'none', borderRadius: '50%',
            width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', cursor: 'pointer', zIndex: 10
          }}
        >
          <ChevronRight size={22} />
        </button>

      </div>

      {/* Dots Indicator */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '1rem' }}>
        {banners.map((_, idx) => (
          <div 
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            style={{
              width: currentIndex === idx ? '24px' : '8px', height: '8px', borderRadius: '4px',
              background: currentIndex === idx ? 'var(--accent-pink)' : 'var(--border-color)',
              cursor: 'pointer', transition: 'width 0.3s ease'
            }}
          />
        ))}
      </div>

    </div>
  );
}