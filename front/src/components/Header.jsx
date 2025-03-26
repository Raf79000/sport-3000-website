import React from 'react';
import { Link } from 'react-router-dom';
import { TiShoppingCart } from "react-icons/ti";
import { MdOutlineDarkMode } from "react-icons/md";
import '../styles/Header.css';
import logoSrc from '../sport_3000_logo.svg';

const Header = () => {
    return (
        <header className="App-header">
            <div className="App-header-left">
                <img src={logoSrc} alt="Sport 3000 Logo" className="App-header-logo" />
                <h1 className='App-header-title'><Link to='/'>Sport 3000</Link></h1>
            </div>
            
            <div className="App-header-center">
            </div>
            
            <nav className="App-header-right">
                <ul className='App-header-menu'>
                    <li className='App-header-menu-item'><Link to='/'>Products</Link></li>
                    <li className='App-header-menu-item'><Link to='/Linkbout'>About</Link></li>
                    <li className='App-header-menu-item'><Link to='/contact'>Contact</Link></li>
                    <li className='App-header-menu-item'><Link to='/checkout'><TiShoppingCart /></Link></li>
                    <li className='App-header-menu-item'><MdOutlineDarkMode /></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;