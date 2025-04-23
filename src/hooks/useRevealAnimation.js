import { useEffect } from 'react';
import { useInView } from 'framer-motion';

export const useRevealAnimation = (ref, options = {}) => {
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
    ...options
  });

  useEffect(() => {
    if (isInView && ref.current) {
      ref.current.style.transform = "translateY(0)";
      ref.current.style.opacity = "1";
    }
  }, [isInView, ref]);

  return isInView;
};
