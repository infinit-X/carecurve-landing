import React from 'react';
import { motion } from 'framer-motion';
import {
  TwitterLogoIcon,
  LinkedInLogoIcon,
  InstagramLogoIcon,
} from '@radix-ui/react-icons';
import './Footer.css';
import logoLight from '../../assets/images/logo full - w.png';

const FacebookIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

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
    { label: 'Twitter', href: 'https://twitter.com', icon: <TwitterLogoIcon width="1.2em" height="1.2em" /> },
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: <LinkedInLogoIcon width="1.2em" height="1.2em" /> },
    { label: 'Instagram', href: 'https://instagram.com', icon: <InstagramLogoIcon width="1.2em" height="1.2em" /> },
    { label: 'Facebook', href: 'https://facebook.com', icon: <FacebookIcon /> }
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
