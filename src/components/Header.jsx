// src/components/Header.jsx
import React from 'react';
import './Header.css'; // We'll create this CSS file next
// import logo from '../assets/images/logo.svg'; // Import your logo - adjust path!

function Header() {
  return (
    <header className="header-container">
      <div className="logo-container">
        {/* <img src={logo} alt="CareCurve Logo" /> */}
        <span>CareCurve</span> {/* Placeholder until logo is exported */}
      </div>
      <nav className="nav-links">
        {/* Add navigation links based on your Figma design */}
        <a href="#features">Features</a>
        <a href="#how-it-works">How it Works</a>
        <a href="#pricing">Pricing</a>
      </nav>
      <button className="cta-button">Get Started</button> {/* Or Sign Up, etc. */}
    </header>
  );
}

export default Header;