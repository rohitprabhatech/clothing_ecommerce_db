import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';
import Footer from './Footer';

/**
 * Primary Application Shell Layout
 */
export function Layout() {
  return (
    <div className="app-container">
      <Header />
      <Navigation />
      <main className="main-content">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;

