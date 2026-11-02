import { NavLink } from 'react-router-dom';

/**
 * Category Navigation Bar Component
 */
export function Navigation() {
  const categories = [
    { name: 'All Products', path: '/products' },
    { name: 'New Arrivals', path: '/products?category=new-arrivals' },
    { name: 'Men', path: '/products?category=men' },
    { name: 'Women', path: '/products?category=women' },
    { name: 'Accessories', path: '/products?category=accessories' },
  ];

  return (
    <nav
      style={{
        background: '#ffffff',
        borderBottom: '1px solid var(--color-border)',
        padding: '0.5rem 0',
      }}
      aria-label="Product categories"
    >
      <div className="container" style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto' }}>
        {categories.map((cat) => (
          <NavLink
            key={cat.name}
            to={cat.path}
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
            style={({ isActive }) => ({
              padding: '0.25rem 0',
              borderBottom: isActive ? '2px solid var(--color-primary)' : '2px solid transparent',
              whiteSpace: 'nowrap',
            })}
          >
            {cat.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default Navigation;

