import React from 'react';
import '../styles/Footer.css';
import logoSrc from '../sport_3000_logo.svg';

const Footer = () => {
    return (
        <footer className="App-footer">
            <div className="footer-content">
                <div className="footer-section brand">
                    <img src={logoSrc} alt="Sport 3000 Logo" className="footer-logo" />
                    <h3>Sport 3000</h3>
                    <p>Premium sports equipment for the modern athlete</p>
                </div>
                
                <div className="footer-section links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/">Products</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/faq">FAQs</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>
                
                <div className="footer-section contact">
                    <h3>Contact Us</h3>
                    <p>Email: info@sport3000.com</p>
                    <p>Phone: +123 456 789</p>
                    <div className="social-icons">
                        <a href="#" className="social-icon">FB</a>
                        <a href="#" className="social-icon">IG</a>
                        <a href="#" className="social-icon">TW</a>
                    </div>
                </div>
            </div>
            
            <div className="footer-bottom">
                <p>&copy; 2025 Sport 3000 - All rights reserved</p>
            </div>
        </footer>
    );
};

export default Footer;