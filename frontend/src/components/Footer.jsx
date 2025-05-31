// Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import logoSrc from "../sport_3000_logo.svg";
import "../styles/App.css";

const Footer = () => {
  return (
    <footer>
      <div>
        <div>
          <img src={logoSrc} alt="Sport 3000 Logo" className="logo-image" />
          <h3>Sport 3000</h3>
          <p>Premium sports equipment for the modern athlete</p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/">Products</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/faq">FAQs</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3>Contact Us</h3>
          <p>Email: info@sport3000.com</p>
          <p>Phone: +123 456 789</p>
          <div>
            <a href="#">
              FB
            </a>
            <a href="#">
              IG
            </a>
            <a href="#">
              TW
            </a>
          </div>
        </div>
      </div>

      <div>
        <p>&copy; 2025 Sport 3000 - All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
