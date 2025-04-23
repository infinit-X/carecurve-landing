import React from 'react';
import { motion } from 'framer-motion';
import { useAnimation } from '../hooks/useAnimation';

const Motion = ({ 
  children, 
  animation = 'fadeInUp',
  delay = 0,
  direction,
  threshold = 0.2,
  ...props 
}) => {
  const animations = useAnimation();

  // Select the animation variant based on the animation prop
  const getVariant = () => {
    switch (animation) {
      case 'fadeInUp':
        return animations.fadeInUp;
      case 'fadeInScale':
        return animations.fadeInScale;
      case 'slideIn':
        return animations.slideIn(direction);
      case 'float':
        return animations.float;
      case 'buttonHover':
        return animations.buttonHover;
      case 'cardHover':
        return animations.cardHover;
      case 'textReveal':
        return animations.textReveal;
      case 'listReveal':
        return animations.listReveal;
      default:
        return animations.fadeInUp;
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, threshold }}
      variants={getVariant()}
      custom={delay}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Compound components for specific use cases
Motion.Button = ({ children, ...props }) => (
  <Motion animation="buttonHover" {...props}>
    {children}
  </Motion>
);

Motion.Card = ({ children, ...props }) => (
  <Motion animation="cardHover" {...props}>
    {children}
  </Motion>
);

Motion.Text = ({ children, delay, ...props }) => (
  <Motion animation="textReveal" delay={delay} {...props}>
    {children}
  </Motion>
);

Motion.List = ({ children, ...props }) => (
  <motion.div
    variants={useAnimation().staggerChildren}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    {...props}
  >
    {React.Children.map(children, (child, index) => (
      <motion.div variants={useAnimation().listReveal} custom={index}>
        {child}
      </motion.div>
    ))}
  </motion.div>
);

Motion.Float = ({ children, ...props }) => (
  <Motion animation="float" {...props}>
    {children}
  </Motion>
);

export default Motion;
