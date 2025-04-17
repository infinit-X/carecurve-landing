import React from 'react';
import './Navbar.css'; // We'll create this file next
import logo from '../../assets/images/logo.svg'; // Adjust the path/name if your logo is different

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="CareCurve Logo" />
        {/* Or just use the image */}
      </div>

      {/* This div holds the central, glassy part */}
      <div className="navbar-links-container">
        <ul className="navbar-links">
          <li><a href="#home" className="nav-link">Home</a></li>
          <li><a href="#platform" className="nav-link">Platform</a></li>
          <li><a href="#services" className="nav-link">Services</a></li>
          <li><a href="#help" className="nav-link">Help</a></li>
          <li><a href="#features" className="nav-link">Features</a></li>
        </ul>
      </div>

      <div className="navbar-contact">
        <button className="contact-button">Contact Us</button>
      </div>
    </nav>
  );
};

export default Navbar;