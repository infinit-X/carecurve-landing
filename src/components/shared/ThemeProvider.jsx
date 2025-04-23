import React, { createContext, useContext } from 'react';
import { useTheme } from '../../hooks/useTheme.ts';


const ThemeContext = createContext(null);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const themeState = useTheme();

  React.useEffect(() => {
    // Update CSS variables when theme changes
    const root = document.documentElement;
    const { theme } = themeState;

    root.style.setProperty('--primary', theme.colors.current.primary);
    root.style.setProperty('--background', theme.colors.current.background);
    root.style.setProperty('--text', theme.colors.current.text);
    root.style.setProperty('--surface', theme.colors.current.surface);

    // Update color scheme meta tag
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme.colors.current.background);
    }

    // Update body class for theme
    document.body.classList.toggle('dark', theme.isDark);
  }, [themeState.theme]);

  return (
    <ThemeContext.Provider value={themeState}>
      {children}
    </ThemeContext.Provider>
  );
};
