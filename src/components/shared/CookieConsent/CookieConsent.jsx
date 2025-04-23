import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CookieConsent.css';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    } else {
      setPreferences(JSON.parse(consent));
    }
  }, []);

  const handleAcceptAll = () => {
    const allConsent = {
      necessary: true,
      analytics: true,
      marketing: true
    };
    localStorage.setItem('cookie-consent', JSON.stringify(allConsent));
    setPreferences(allConsent);
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    setIsVisible(false);
  };

  const handleToggle = (type) => {
    if (type === 'necessary') return; // Cannot toggle necessary cookies
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="cookie-consent"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
      >
        <div className="cookie-content">
          <h3>Cookie Preferences</h3>
          <p>
            We use cookies to enhance your experience and analyze our website traffic. 
            Please choose your preferences below.
          </p>
          
          <div className="cookie-options">
            <div className="cookie-option">
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={preferences.necessary}
                  disabled
                />
                <span className="slider" />
              </label>
              <div className="option-text">
                <span>Necessary Cookies</span>
                <small>Required for the website to function properly</small>
              </div>
            </div>

            <div className="cookie-option">
              <label className="switch">
                <input 
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={() => handleToggle('analytics')}
                />
                <span className="slider" />
              </label>
              <div className="option-text">
                <span>Analytics Cookies</span>
                <small>Help us improve our website by collecting usage data</small>
              </div>
            </div>

            <div className="cookie-option">
              <label className="switch">
                <input 
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={() => handleToggle('marketing')}
                />
                <span className="slider" />
              </label>
              <div className="option-text">
                <span>Marketing Cookies</span>
                <small>Allow us to personalize your experience</small>
              </div>
            </div>
          </div>
        </div>

        <div className="cookie-actions">
          <motion.button
            className="save-preferences"
            onClick={handleSavePreferences}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Save Preferences
          </motion.button>
          <motion.button
            className="accept-all"
            onClick={handleAcceptAll}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Accept All
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CookieConsent;
