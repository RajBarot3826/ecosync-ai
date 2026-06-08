import { Link, useLocation } from 'react-router-dom';
import { Leaf } from 'lucide-react';

/**
 * Main Navigation Component
 * Fully semantic and accessible navigation bar.
 */
export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar" aria-label="Main Navigation">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" className="nav-brand" aria-label="EcoSync AI Home">
          <Leaf color="var(--primary)" size={28} aria-hidden="true" />
          EcoSync <span>AI</span>
        </Link>
        <ul className="nav-links" role="menubar">
          <li role="none">
            <Link 
              to="/dashboard" 
              role="menuitem"
              className={location.pathname === '/dashboard' ? 'active' : ''}
              aria-current={location.pathname === '/dashboard' ? 'page' : undefined}
            >
              Dashboard
            </Link>
          </li>
          <li role="none">
            <Link 
              to="/calculator" 
              role="menuitem"
              className={location.pathname === '/calculator' ? 'active' : ''}
              aria-current={location.pathname === '/calculator' ? 'page' : undefined}
            >
              Calculator
            </Link>
          </li>
          <li role="none">
            <Link 
              to="/coach" 
              role="menuitem"
              className={location.pathname === '/coach' ? 'active' : ''}
              aria-current={location.pathname === '/coach' ? 'page' : undefined}
            >
              AI Coach
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
