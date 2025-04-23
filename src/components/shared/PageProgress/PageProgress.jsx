import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { useScrollProgress } from '../../../hooks/useScrollProgress';
import './PageProgress.css';

const PageProgress = () => {
  const { progress } = useScrollProgress();

  return (
    <div className="page-progress-container">
      <motion.div 
        className="progress-bar"
        style={{ 
          scaleX: progress / 100,
          transformOrigin: '0%'
        }}
      />
    </div>
  );
};

export default PageProgress;
