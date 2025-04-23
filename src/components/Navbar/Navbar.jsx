import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

// Import both logo variants
import logoLight from '../../assets/images/logo full - w.png';
import logoDark from '../../assets/images/logo full - b.png';

const Navbar = ({ darkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Update active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      const scrollY = window.scrollY;

      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveLink(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#platform', label: 'Platform' },
    { href: '#services', label: 'Services' },
    { href: '#features', label: 'Features' },
    { href: '#help', label: 'Help' }
  ];

  return (
    <motion.nav 
      className={`navbar${darkMode ? ' navbar-dark' : ''}${isScrolled ? ' navbar-scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="navbar-content">
        <motion.div 
          className="navbar-logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src={darkMode ? logoDark : logoLight} alt="CareCurve Logo" />
        </motion.div>

        <div className="navbar-links-container">
          <ul className="navbar-links">
            {navLinks.map(({ href, label }) => (
              <motion.li key={href}>
                <a 
                  href={href} 
                  className={`nav-link${activeLink === href.slice(1) ? ' active' : ''}`}
                >
                  {label}
                  {activeLink === href.slice(1) && (
                    <motion.div 
                      className="link-indicator"
                      layoutId="indicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div 
          className="navbar-contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button className="contact-button">Contact Us</button>
        </motion.div>
      </div>
      
      {/* Glass effect overlay */}
      <div className="navbar-glass-effect" />
    </motion.nav>
  );
};

export default Navbar;