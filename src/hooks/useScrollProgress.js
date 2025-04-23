import { useState, useEffect } from 'react';

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState('down');
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight - winHeight;
      const scrollTop = window.scrollY;
      const scrollProgress = (scrollTop / docHeight) * 100;

      // Determine scroll direction
      const currentDirection = scrollTop > lastScrollTop ? 'down' : 'up';
      
      setProgress(Math.min(100, Math.max(0, scrollProgress)));
      setDirection(currentDirection);
      setLastScrollTop(scrollTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop]);

  return { progress, direction };
};
