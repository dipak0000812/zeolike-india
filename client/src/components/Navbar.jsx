import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, FaCalculator, FaQuestionCircle, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';
import { useAuth } from '../App'; // Import useAuth hook
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth(); // Use the authentication context

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : 'unset';
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          <img src="/logo.png" alt="Zeolike India logo, homepage" />
        </Link>

        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          <Link to="/" className={isActive('/') ? 'active' : ''} onClick={closeMenu}>Home</Link>
          <Link to="/buy" className={isActive('/buy') ? 'active' : ''} onClick={closeMenu}>Buy</Link>
          <Link to="/rent" className={isActive('/rent') ? 'active' : ''} onClick={closeMenu}>Rent</Link>
          <Link to="/sell" className={isActive('/sell') ? 'active' : ''} onClick={closeMenu}>Sell</Link>
          <Link to="/map" className={isActive('/map') ? 'active' : ''} onClick={closeMenu}>Map</Link>
          <Link to="/about" className={isActive('/about') ? 'active' : ''} onClick={closeMenu}>About</Link>
          <Link to="/contact" className={isActive('/contact') ? 'active' : ''} onClick={closeMenu}>Contact</Link>
        </div>

        <div className="nav-actions">
          <Link to="/calculator" className="action-btn calculator" onClick={closeMenu}>
            <FaCalculator /> Calculator
          </Link>
          <Link to="/help" className="action-btn help" onClick={closeMenu}>
            <FaQuestionCircle /> Help
          </Link>
          {user ? (
            <>
              {user.role === 'admin' && (
                <Link to="/admin" className="action-btn admin-dashboard" onClick={closeMenu}>
                  <FaTachometerAlt /> Admin Dashboard
                </Link>
              )}
              <Link to="/dashboard" className="action-btn signin" onClick={closeMenu}>
                <FaTachometerAlt /> Dashboard
              </Link>
              <button onClick={handleLogout} className="action-btn signin" aria-label="Sign Out">
                <FaSignOutAlt /> Sign Out
              </button>
            </>
          ) : (
            <Link to="/login" className="action-btn signin" onClick={closeMenu}>
              <FaUser /> Sign In
            </Link>
          )}
        </div>

        <button className="mobile-menu-btn" onClick={toggleMenu} aria-label={isOpen ? 'Close menu' : 'Open menu'}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar; 