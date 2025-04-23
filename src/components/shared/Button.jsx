import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = 'px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800',
    secondary: 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
    glass: 'bg-white/10 backdrop-blur-[10px] border border-white/20 text-white hover:bg-white/20',
  };

  return (
    <motion.button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
