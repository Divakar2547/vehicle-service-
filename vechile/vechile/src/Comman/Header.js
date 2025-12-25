import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="https://i.pinimg.com/1200x/a8/6f/38/a86f38c6bf1263e4555ba6cb3ccec1ce.jpg" alt="AutoService Logo" className="logo-image" />
        <span>AutoService</span>
      </div>
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/services" className="active">Services</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;