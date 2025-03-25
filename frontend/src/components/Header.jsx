<<<<<<< HEAD:frontend/src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { TiShoppingCart } from "react-icons/ti";
import { MdOutlineDarkMode } from "react-icons/md";
import '../styles/Header.css';
import logoSrc from '../sport_3000_logo.svg';
=======
import '../styles/Header.css';
import logoSrc from '../sport_3000_logo.svg';
import { TiShoppingCart } from "react-icons/ti";
import { TiCogOutline } from "react-icons/ti";
>>>>>>> 252aa09 (feat: went for tailwindcss):src/components/Header.jsx

const Header = () => {
    return (
        <header className="App-header">
            <div className="App-header-left">
                <img src={logoSrc} alt="Sport 3000 Logo" className="App-header-logo" />
<<<<<<< HEAD:frontend/src/components/Header.jsx
                <h1 className='App-header-title'><Link to='/'>Sport 3000</Link></h1>
=======
                <h1 className='App-header-title'><a href='/'>Sport 3000</a></h1>
>>>>>>> 252aa09 (feat: went for tailwindcss):src/components/Header.jsx
            </div>
            
            <div className="App-header-center">
            </div>
            
            <nav className="App-header-right">
                <ul className='App-header-menu'>
<<<<<<< HEAD:frontend/src/components/Header.jsx
                    <li className='App-header-menu-item'><Link to='/'>Products</Link></li>
                    <li className='App-header-menu-item'><Link to='/About'>About</Link></li>
                    <li className='App-header-menu-item'><Link to='/contact'>Contact</Link></li>
                    <li className='App-header-menu-item'><Link to='/checkout'><TiShoppingCart /></Link></li>
                    <li className='App-header-menu-item'><MdOutlineDarkMode /></li>
=======
                    <li className='App-header-menu-item'><a href='/'>Products</a></li>
                    <li className='App-header-menu-item'><a href='/about'>About</a></li>
                    <li className='App-header-menu-item'><a href='/contact'>Contact</a></li>
                    <li className='App-header-menu-item'><a href='/checkout'><TiShoppingCart /></a></li>
                    <li className='App-header-menu-item'><a href='/preferences'><TiCogOutline /></a></li>
>>>>>>> 252aa09 (feat: went for tailwindcss):src/components/Header.jsx
                </ul>
            </nav>
        </header>
    );
};

export default Header;