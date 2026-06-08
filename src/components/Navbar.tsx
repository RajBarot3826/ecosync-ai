import { Link, useLocation } from 'react-router-dom';
import { Leaf } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" className="nav-brand">
          <Leaf color="var(--primary)" size={28} />
          EcoSync <span>AI</span>
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/calculator" className={location.pathname === '/calculator' ? 'active' : ''}>
              Calculator
            </Link>
          </li>
          <li>
            <Link to="/coach" className={location.pathname === '/coach' ? 'active' : ''}>
              AI Coach
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
