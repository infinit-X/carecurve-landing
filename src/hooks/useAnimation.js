import { useCallback } from 'react';
import { usePreloadImages } from './usePreloadImages';
import { useIntersectionObserver } from './useIntersectionObserver';

export const useAnimation = () => {
  // Shared animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const fadeInScale = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const staggerChildren = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const slideIn = (direction = 'left') => {
    const x = direction === 'left' ? -50 : direction === 'right' ? 50 : 0;
    const y = direction === 'up' ? 50 : direction === 'down' ? -50 : 0;

    return {
      hidden: { opacity: 0, x, y },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1]
        }
      }
    };
  };

  // Button hover animation
  const buttonHover = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    },
    tap: { scale: 0.95 }
  };

  // Card hover animation
  const cardHover = {
    rest: { 
      y: 0,
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    hover: { 
      y: -5,
      boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  };

  // Text reveal animation
  const textReveal = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: delay * 0.2,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  // Optimized list item reveal
  const listReveal = {
    hidden: { opacity: 0, x: -20 },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  // Infinite floating animation
  const float = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  // Scroll-triggered fade
  const scrollFade = useCallback((threshold = 0.2) => {
    const [ref, isVisible] = useIntersectionObserver({ threshold });
    return { ref, isVisible };
  }, []);

  return {
    fadeInUp,
    fadeInScale,
    staggerChildren,
    slideIn,
    buttonHover,
    cardHover,
    textReveal,
    listReveal,
    float,
    scrollFade
  };
};
