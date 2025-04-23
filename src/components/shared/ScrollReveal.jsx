import React from 'react';
import { motion } from 'framer-motion';

const fadeInUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: custom * 0.2,
      ease: 'easeOut'
    }
  })
};

const ScrollReveal = ({ 
  children, 
  className = '', 
  delay = 0,
  threshold = 0.2,
  duration = 0.6,
  ...props 
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, threshold }}
      variants={fadeInUpVariant}
      custom={delay}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
