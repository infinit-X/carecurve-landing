import React from 'react';
import { motion } from 'framer-motion';

const Container = ({ children, className = '', fullWidth = false, ...props }) => {
  const baseStyle = `mx-auto px-4 sm:px-6 lg:px-8 ${fullWidth ? 'w-full' : 'max-w-7xl'}`;
  
  return (
    <motion.div
      className={`${baseStyle} ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Container;
