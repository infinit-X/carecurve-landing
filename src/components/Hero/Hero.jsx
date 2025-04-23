import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';
import backgroundVideo from '../../assets/videos/hero-background.mp4';

const FloatingParticle = ({ delay }) => (
  <motion.div
    className="floating-particle"
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0.2, 0.5, 0.2],
      scale: [1, 1.2, 1],
      y: [0, -30, 0]
    }}
    transition={{
      duration: 4,
      delay: delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
);

const Hero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      containerRef.current.style.setProperty('--mouse-x', x);
      containerRef.current.style.setProperty('--mouse-y', y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={containerRef} className="hero-section">
      <div className="video-background">
        <video autoPlay loop muted playsInline>
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="hero-overlay" />
      
      {/* Floating particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <FloatingParticle key={i} delay={i * 0.2} />
      ))}

      <motion.div 
        className="hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Your Child's Health Journey, <br/> Digitally Secured
        </motion.h1>
        
        <motion.button 
          className="learn-more-button"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          Learn more
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;