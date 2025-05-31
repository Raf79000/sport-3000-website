// Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import logoSrc from "../sport_3000_logo.svg";
import "../styles/App.css";

const Footer = () => {
  return (
    <footer id="main-footer">
      <div className="footer-top">
        {/* Logo & Tagline */}
        <div className="footer-column footer-logo-section">
          <img
            src={logoSrc}
            alt="Sport 3000 Logo"
            className="footer-logo-image"
          />
          <h3 className="footer-site-title">Sport 3000</h3>
          <p className="footer-tagline">
            Premium sports equipment for the modern athlete
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-column footer-links-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links-list">
            <li className="footer-link-item">
              <Link to="/" className="footer-link">
                Products
              </Link>
            </li>
            <li className="footer-link-item">
              <Link to="/about" className="footer-link">
                About Us
              </Link>
            </li>
            <li className="footer-link-item">
              <Link to="/faq" className="footer-link">
                FAQs
              </Link>
            </li>
            <li className="footer-link-item">
              <Link to="/contact" className="footer-link">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="footer-column footer-contact-section">
          <h3 className="footer-heading">Contact Us</h3>
          <p className="footer-contact-text">Email: info@sport3000.com</p>
          <p className="footer-contact-text">Phone: +123 456 789</p>
          <div className="footer-social-links">
            <a href="#" className="footer-social-link" aria-label="Facebook">
              FB
            </a>
            <a href="#" className="footer-social-link" aria-label="Instagram">
              IG
            </a>
            <a href="#" className="footer-social-link" aria-label="Twitter">
              TW
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p className="footer-copy">
          &copy; 2025 Sport 3000 - All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
