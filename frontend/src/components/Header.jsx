// Header.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { MdOutlineDarkMode } from "react-icons/md";
import logoSrc from "../sport_3000_logo.svg";
import "../styles/App.css";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };
  return (
    <header>
      <div>
        <img src={logoSrc} alt="Sport 3000 Logo" className="logo-image" />
        <h1>
          <Link to="/">Sport 3000</Link>
        </h1>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/sales">Sales</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/checkout">
              <TiShoppingCart />
            </Link>
          </li>
          <li>
            <button onClick={toggleDarkMode}>
              <MdOutlineDarkMode />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
