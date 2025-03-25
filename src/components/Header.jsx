import React from 'react';
import '../styles/Header.css';
import logoSrc from '../sport_3000_logo.svg';

const Header = () => {
    return (
        <header className="App-header">
            <div className="App-header-left">
                <img src={logoSrc} alt="Sport 3000 Logo" className="App-header-logo" />
                <h1 className='App-header-title'><a href='/'>Sport 3000</a></h1>
            </div>
            
            <div className="App-header-center">
            </div>
            
            <nav className="App-header-right">
                <ul className='App-header-menu'>
                    <li className='App-header-menu-item'><a href='/'>Products</a></li>
                    <li className='App-header-menu-item'><a href='/about'>About</a></li>
                    <li className='App-header-menu-item'><a href='/contact'>Contact</a></li>
                    <li className='App-header-menu-item'><a href='/checkout'>Checkout</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;