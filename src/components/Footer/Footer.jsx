import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';
import logoLight from '../../assets/images/logo full - w.png';

const footerLinks = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'How it Works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Security', href: '#security' }
  ],
  company: [
    { label: 'About Us', href: '#about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Blog', href: '/blog' },
    { label: 'Press Kit', href: '/press' }
  ],
  support: [
    { label: 'Help Center', href: '#help' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' }
  ],
  social: [
    { label: 'Twitter', href: 'https://twitter.com', icon: '𝕏' },
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: '𝕃𝕀' },
    { label: 'Instagram', href: 'https://instagram.com', icon: '📸' },
    { label: 'Facebook', href: 'https://facebook.com', icon: '𝔽' }
  ]
};

const FooterSection = ({ title, links }) => (
  <div className="footer-section">
    <h3 className="footer-title">{title}</h3>
    <ul className="footer-links">
      {links.map((link, index) => (
        <motion.li
          key={link.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <a href={link.href} className="footer-link">
            {link.icon && <span className="link-icon">{link.icon}</span>}
            {link.label}
          </a>
        </motion.li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <motion.img 
            src={logoLight} 
            alt="CareCurve Logo" 
            className="footer-logo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <p className="brand-description">
            Securing your child's health journey through innovative digital solutions.
          </p>
          <div className="app-badges">
            <motion.button 
              className="app-store-badge"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              App Store
            </motion.button>
            <motion.button 
              className="play-store-badge"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Play Store
            </motion.button>
          </div>
        </div>

        <div className="footer-links-container">
          <FooterSection title="Product" links={footerLinks.product} />
          <FooterSection title="Company" links={footerLinks.company} />
          <FooterSection title="Support" links={footerLinks.support} />
          <FooterSection title="Follow Us" links={footerLinks.social} />
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="copyright">
            © {new Date().getFullYear()} CareCurve. All rights reserved.
          </p>
          <div className="legal-links">
            <a href="/privacy" className="legal-link">Privacy Policy</a>
            <span className="separator">•</span>
            <a href="/terms" className="legal-link">Terms of Service</a>
            <span className="separator">•</span>
            <a href="/cookies" className="legal-link">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
