import React from 'react';
import { motion } from 'framer-motion';

const gridVariants = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Grid = ({
  children,
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  gap = '2rem',
  className = '',
  animate = false,
  ...props
}) => {
  const getGridTemplateColumns = () => {
    return {
      gridTemplateColumns: `repeat(${columns.mobile}, 1fr)`,
      '@media (min-width: 768px)': {
        gridTemplateColumns: `repeat(${columns.tablet}, 1fr)`
      },
      '@media (min-width: 1024px)': {
        gridTemplateColumns: `repeat(${columns.desktop}, 1fr)`
      }
    };
  };

  const gridStyles = {
    display: 'grid',
    gap,
    ...getGridTemplateColumns()
  };

  if (animate) {
    return (
      <motion.div
        style={gridStyles}
        className={className}
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div style={gridStyles} className={className} {...props}>
      {children}
    </div>
  );
};

export default Grid;
