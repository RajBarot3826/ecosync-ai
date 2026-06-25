import { useState, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, ChevronDown } from 'lucide-react';

/**
 * Main Navigation Component
 * Fully semantic and accessible navigation bar with a dropdown for advanced features.
 */
const Navbar = () => {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const toggleDropdown = () => setDropdownOpen(prev => !prev);
  const closeDropdown = () => setDropdownOpen(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navbar" aria-label="Main Navigation">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" className="nav-brand" aria-label="EcoSync AI Home" onClick={closeDropdown}>
          <Leaf color="var(--primary)" size={28} aria-hidden="true" />
          EcoSync <span>AI</span>
        </Link>
        <ul className="nav-links" role="menubar">
          <li role="none">
            <Link 
              to="/dashboard" 
              role="menuitem"
              className={isActive('/dashboard') ? 'active' : ''}
              aria-current={isActive('/dashboard') ? 'page' : undefined}
              onClick={closeDropdown}
            >
              Dashboard
            </Link>
          </li>
          <li role="none">
            <Link 
              to="/calculator" 
              role="menuitem"
              className={isActive('/calculator') ? 'active' : ''}
              aria-current={isActive('/calculator') ? 'page' : undefined}
              onClick={closeDropdown}
            >
              Calculator
            </Link>
          </li>
          <li role="none">
            <Link 
              to="/coach" 
              role="menuitem"
              className={isActive('/coach') ? 'active' : ''}
              aria-current={isActive('/coach') ? 'page' : undefined}
              onClick={closeDropdown}
            >
              AI Coach
            </Link>
          </li>

          {/* Features Dropdown Menu */}
          <li role="none" style={{ position: 'relative' }}>
            <button
              onClick={toggleDropdown}
              onMouseEnter={() => setDropdownOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                color: dropdownOpen || isActive('/challenges') || isActive('/rewards') || isActive('/community') || isActive('/tree') || isActive('/smarthome') || isActive('/travel') ? 'var(--primary)' : 'var(--text-muted)',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontWeight: 500,
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                transition: 'color 0.3s ease'
              }}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              Eco Toolkit <ChevronDown size={16} style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>
            
            {dropdownOpen && (
              <ul 
                onMouseLeave={closeDropdown}
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  background: 'var(--bg-dark)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '0.75rem 0',
                  minWidth: '180px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.5), 0 0 15px var(--primary-glow)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                  listStyle: 'none',
                  zIndex: 200,
                  marginTop: '0.5rem'
                }}
                role="menu"
              >
                <li role="none">
                  <Link 
                    to="/challenges" 
                    role="menuitem"
                    style={{
                      display: 'block',
                      padding: '0.5rem 1.5rem',
                      color: isActive('/challenges') ? 'var(--primary)' : 'var(--text-muted)',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      textAlign: 'left'
                    }}
                    onClick={closeDropdown}
                  >
                    Eco Challenges
                  </Link>
                </li>
                <li role="none">
                  <Link 
                    to="/rewards" 
                    role="menuitem"
                    style={{
                      display: 'block',
                      padding: '0.5rem 1.5rem',
                      color: isActive('/rewards') ? 'var(--primary)' : 'var(--text-muted)',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      textAlign: 'left'
                    }}
                    onClick={closeDropdown}
                  >
                    Eco Rewards
                  </Link>
                </li>
                <li role="none">
                  <Link 
                    to="/community" 
                    role="menuitem"
                    style={{
                      display: 'block',
                      padding: '0.5rem 1.5rem',
                      color: isActive('/community') ? 'var(--primary)' : 'var(--text-muted)',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      textAlign: 'left'
                    }}
                    onClick={closeDropdown}
                  >
                    Community Hub
                  </Link>
                </li>
                <li role="none">
                  <Link 
                    to="/tree" 
                    role="menuitem"
                    style={{
                      display: 'block',
                      padding: '0.5rem 1.5rem',
                      color: isActive('/tree') ? 'var(--primary)' : 'var(--text-muted)',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      textAlign: 'left'
                    }}
                    onClick={closeDropdown}
                  >
                    Tree Offset
                  </Link>
                </li>
                <li role="none">
                  <Link 
                    to="/smarthome" 
                    role="menuitem"
                    style={{
                      display: 'block',
                      padding: '0.5rem 1.5rem',
                      color: isActive('/smarthome') ? 'var(--primary)' : 'var(--text-muted)',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      textAlign: 'left'
                    }}
                    onClick={closeDropdown}
                  >
                    Smart Home IoT
                  </Link>
                </li>
                <li role="none">
                  <Link 
                    to="/travel" 
                    role="menuitem"
                    style={{
                      display: 'block',
                      padding: '0.5rem 1.5rem',
                      color: isActive('/travel') ? 'var(--primary)' : 'var(--text-muted)',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      textAlign: 'left'
                    }}
                    onClick={closeDropdown}
                  >
                    Travel Planner
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default memo(Navbar);
