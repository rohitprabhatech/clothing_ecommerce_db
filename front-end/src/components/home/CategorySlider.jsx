export default function CategorySlider() {
  const categories = [
    { name: 'Westernwear', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=300' },
    { name: 'Indianwear', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=300' },
    { name: 'Men', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300' },
    { name: 'Kids', img: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&q=80&w=300' },
    { name: 'Home', img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=300' },
    { name: 'Footwear', img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=300' },
    { name: 'Lingerie', img: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?auto=format&fit=crop&q=80&w=300' },
    { name: 'Bags', img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=300' }
  ];

  return (
    <div style={{ width: '94%', margin: '3rem auto' }}>
      <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1.5rem', textAlign: 'center' }}>Celebration-Ready Categories</h2>
      <div className="no-scrollbar" style={{ display: 'flex', gap: '2rem', overflowX: 'auto', paddingBottom: '1rem' }}>
        {categories.map((cat, idx) => (
          <div key={idx} style={{ minWidth: '130px', textAlign: 'center', cursor: 'pointer' }}>
            <div style={{ width: '130px', height: '130px', borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--accent-pink)', marginBottom: '10px', boxShadow: 'var(--shadow-sm)' }}>
              <img src={cat.img} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.target.style.transform = 'scale(1)'} />
            </div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{cat.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}