import { useState, useEffect } from 'react';
import { LocalStorageManager } from '../utils/LocalStorageManager';
import { colors, glassMorphism } from '../utils/theme';

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const storage = LocalStorageManager.getInstance();

  useEffect(() => {
    // Check user's preferred color scheme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = storage.get<'light' | 'dark'>('theme');
    setIsDarkMode(savedTheme ? savedTheme === 'dark' : prefersDark);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!storage.hasKey('theme')) {
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newTheme = !prev;
      storage.set('theme', newTheme ? 'dark' : 'light');
      return newTheme;
    });
  };

  const theme = {
    colors: {
      ...colors,
      current: {
        primary: isDarkMode ? colors.primary[400] : colors.primary[500],
        background: isDarkMode ? colors.neutral[900] : colors.neutral[50],
        text: isDarkMode ? colors.neutral[50] : colors.neutral[900],
        surface: isDarkMode ? colors.neutral[800] : colors.neutral[100],
      }
    },
    glass: isDarkMode ? glassMorphism.dark : glassMorphism.light,
    isDark: isDarkMode
  };

  return { theme, isDarkMode, toggleTheme };
};
