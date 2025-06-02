// Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { MdOutlineDarkMode } from "react-icons/md";
import logoSrc from "../sport_3000_logo.svg";
import "../styles/App.css";

// Import the usePreferences hook:
import { usePreferences } from "../contexts/PreferencesContext";

const Header = () => {
  // Pull darkMode & toggleDarkMode from context
  const { darkMode, toggleDarkMode } = usePreferences();

  return (
    <header id="main-header">
      <div className="header-container">
        <img src={logoSrc} alt="Sport 3000 Logo" className="logo-image" />
        <h1 className="site-title">
          <Link to="/">Sport 3000</Link>
        </h1>
      </div>

      <nav className="main-nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          {/* Admin Dropdown */}
          <li className="nav-item dropdown">
            <button className="nav-link dropdown-toggle">Products</button>
            <ul className="dropdown-menu">
              <li>
                <Link to="/products" className="dropdown-link">
                  All
                </Link>
              </li>
              <li>
                <Link to="/sales" className="dropdown-link">
                  Sales
                </Link>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
          </li>

          {/* Admin Dropdown */}
          <li className="nav-item dropdown">
            <button className="nav-link dropdown-toggle">Admin</button>
            <ul className="dropdown-menu">
              <li>
                <Link to="/admin" className="dropdown-link">
                  Admin Dashboard
                </Link>
              </li>
              <li>
                <Link to="/orders" className="dropdown-link">
                  Orders
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <Link to="/checkout" className="nav-link cart-link">
              <TiShoppingCart />
            </Link>
          </li>
          <li className="nav-item">
            <button
              className="dark-mode-toggle"
              onClick={toggleDarkMode}
              aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
            >
              <MdOutlineDarkMode />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
