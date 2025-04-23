import React from 'react';
import { motion } from 'framer-motion';
import { colors, zIndices, fonts } from '../../utils/theme';

const LoadingSpinner = () => (
  <div className="loading-container">
    <motion.div
      className="loading-ring"
      animate={{
        rotate: 360,
        borderColor: [
          `${colors.primary[500]} transparent transparent transparent`,
          `${colors.secondary[500]} transparent transparent transparent`,
          `${colors.accent[500]} transparent transparent transparent`,
          `${colors.primary[500]} transparent transparent transparent`,
        ]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "linear"
      }}
    />
    <style jsx>{`
      .loading-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 200px;
      }

      .loading-ring {
        width: 50px;
        height: 50px;
        border: 4px solid;
        border-radius: 50%;
      }
    `}</style>
  </div>
);

const Loading = ({ fullScreen, message }) => {
  if (fullScreen) {
    return (
      <div className="fullscreen-loading">
        <LoadingSpinner />
        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="loading-message"
          >
            {message}
          </motion.p>
        )}
        <style jsx>{`
          .fullscreen-loading {
            position: fixed;
            inset: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: rgba(15, 23, 42, 0.9);
            backdrop-filter: blur(10px);
            z-index: ${zIndices.overlay};
          }

          .loading-message {
            margin-top: 1rem;
            color: white;
            font-family: ${fonts.body};
          }
        `}</style>
      </div>
    );
  }

  return <LoadingSpinner />;
};

export default Loading;
