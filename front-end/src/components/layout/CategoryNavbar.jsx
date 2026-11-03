import { useState } from 'react';
import MegaMenu from './MegaMenu';

export default function CategoryNavbar() {
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = [
    { name: "What's New", key: 'whats-new' },
    { name: "Sale", key: 'sale' },
    { name: "Topwear", key: 'topwear' },
    { name: "Bottomwear", key: 'bottomwear' },
    { name: "Ethnicwear", key: 'ethnicwear' },
    { name: "Footwear", key: 'footwear' },
    { name: "Activewear", key: 'activewear' },
    { name: "Innerwear & Sleepwear", key: 'innerwear' },
    { name: "Accessories", key: 'accessories' }
  ];

  return (
    <div style={{ position: 'relative', borderBottom: '1px solid var(--border-color)', background: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', padding: '0.75rem 0', fontSize: '0.9rem', fontWeight: 500 }}>
        {categories.map((cat) => (
          <div 
            key={cat.key}
            onMouseEnter={() => setActiveCategory(cat.key)}
            onMouseLeave={() => setActiveCategory(null)}
            style={{ cursor: 'pointer', padding: '4px 8px', position: 'relative' }}
          >
            <span style={{ color: activeCategory === cat.key ? 'var(--accent-pink)' : 'var(--text-main)' }}>{cat.name}</span>
            {activeCategory === cat.key && <MegaMenu category={cat.key} />}
          </div>
        ))}
      </div>
    </div>
  );
}