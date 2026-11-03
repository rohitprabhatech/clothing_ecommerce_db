export default function MegaMenu({ category }) {
  const menuData = {
    'ethnicwear': {
      columns: [
        { title: 'Indian Wear', items: ['Kurtas & Kurtis', 'Lehengas', 'Sarees', 'Ethnic Sets', 'Dupattas'] },
        { title: 'Fusion Wear', items: ['Ethnic Dresses', 'Tunics', 'Skirts', 'Palazzos'] },
        { title: 'Fabrics & Material', items: ['Chanderi', 'Silk', 'Cotton Blends', 'Georgette'] }
      ]
    },
    'topwear': {
      columns: [
        { title: 'Western Tops', items: ['T-Shirts', 'Shirts & Blouses', 'Crop Tops', 'Sweatshirts'] },
        { title: 'Outerwear', items: ['Blazers & Jackets', 'Cardigans', 'Shrugs', 'Hoodies'] }
      ]
    },
    'sale': {
      columns: [
        { title: 'Hot Deals', items: ['Flat 50% Off', 'Clearance Sale', 'Buy 1 Get 1', 'Festive Specials'] }
      ]
    }
  };

  const currentMenu = menuData[category] || {
    columns: [
      { title: 'Trending Now', items: ['Bestsellers', 'New Arrivals', 'Limited Edition', 'Editor Picks'] },
      { title: 'Essentials', items: ['Dailywear', 'Office Edit', 'Party Edit', 'Weekend Casuals'] }
    ]
  };

  return (
    <div style={{
      position: 'absolute',
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#fff',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-lg)',
      padding: '2rem',
      display: 'flex',
      gap: '3rem',
      zIndex: 1000,
      minWidth: '600px'
    }}>
      {currentMenu.columns.map((col, idx) => (
        <div key={idx} style={{ flex: 1 }}>
          <h4 style={{ color: 'var(--accent-pink)', fontSize: '0.9rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{col.title}</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {col.items.map((item, iIdx) => (
              <li key={iIdx}>
                <a href="/products" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = 'var(--text-main)'}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}