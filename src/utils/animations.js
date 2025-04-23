export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

export const slideIn = (direction = "left") => {
  const x = direction === "left" ? -100 : direction === "right" ? 100 : 0;
  const y = direction === "up" ? 100 : direction === "down" ? -100 : 0;

  return {
    hidden: {
      x,
      y,
      opacity: 0
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  };
};

export const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export const glowAnimation = {
  opacity: [0.5, 1, 0.5],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};
