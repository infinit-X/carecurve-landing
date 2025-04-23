import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../shared/ScrollReveal';
import Button from '../shared/Button';
import './FinalCTA.css';

const FinalCTA = () => {
  return (
    <section className="final-cta">
      <div className="cta-background">
        <div className="gradient-sphere sphere-1" />
        <div className="gradient-sphere sphere-2" />
        <motion.div 
          className="floating-particles-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="floating-particle"
              animate={{
                y: [0, -30, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </div>

      <ScrollReveal>
        <div className="cta-content">
          <motion.h2 
            className="cta-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Ready to Secure Your Child's Health Journey?
          </motion.h2>
          
          <motion.p 
            className="cta-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join thousands of parents who trust CareCurve with their children's health records
          </motion.p>

          <motion.div 
            className="cta-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button variant="glass" className="get-started-btn">
              Get Started Now
            </Button>
            <Button variant="outline" className="learn-more-btn">
              Schedule Demo
            </Button>
          </motion.div>

          <motion.div 
            className="trust-indicators"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="indicator">
              <span className="indicator-number">10k+</span>
              <span className="indicator-label">Active Users</span>
            </div>
            <div className="indicator">
              <span className="indicator-number">99.9%</span>
              <span className="indicator-label">Uptime</span>
            </div>
            <div className="indicator">
              <span className="indicator-number">256bit</span>
              <span className="indicator-label">Encryption</span>
            </div>
          </motion.div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default FinalCTA;
