import { motion, AnimatePresence } from 'framer-motion';

export default function FlyToCartAnimation({ flyingItem, onAnimationComplete }) {
  if (!flyingItem) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ 
          opacity: 1, 
          scale: 1, 
          x: flyingItem.startX, 
          y: flyingItem.startY,
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          position: 'fixed',
          zIndex: 9999,
          pointerEvents: 'none'
        }}
        animate={{ 
          opacity: [1, 0.9, 0.5, 0], 
          scale: [1, 1.2, 0.6, 0.15], 
          x: [flyingItem.startX, (flyingItem.startX + window.innerWidth) / 2, window.innerWidth - 60],
          y: [flyingItem.startY, flyingItem.startY - 180, 30], // Bird sarakhi upward arc curve (parabola)
          rotateX: [0, 25, -15, 0],
          rotateY: [0, 45, -20, 0],
          rotateZ: [0, -15, 10, 360] // 3D rotation while flying
        }}
        exit={{ opacity: 0 }}
        transition={{ 
          duration: 1.0, 
          ease: [0.25, 1, 0.5, 1], // Custom smooth cubic-bezier for natural bird flight feel
          times: [0, 0.4, 0.8, 1] 
        }}
        onAnimationComplete={onAnimationComplete}
        style={{
          width: '70px',
          height: '80px',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 20px 30px rgba(233, 30, 99, 0.4)',
          border: '2px solid var(--accent-pink)',
          background: '#fff'
        }}
      >
        <img src={flyingItem.image} alt="bird-flying-product" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </motion.div>
    </AnimatePresence>
  );
}