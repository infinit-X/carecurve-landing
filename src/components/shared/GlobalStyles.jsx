import React from 'react';
import { Global, css } from '@emotion/react';
import { useThemeContext } from './ThemeProvider';

const GlobalStyles = () => {
  const { theme } = useThemeContext();

  return (
    <Global
      styles={css`
        :root {
          --font-sans: 'RethinkSans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          --primary: ${theme.colors.current.primary};
          --background: ${theme.colors.current.background};
          --text: ${theme.colors.current.text};
          --surface: ${theme.colors.current.surface};
        }

        html {
          box-sizing: border-box;
          scroll-behavior: smooth;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        *,
        *::before,
        *::after {
          box-sizing: inherit;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: var(--font-sans);
          background-color: var(--background);
          color: var(--text);
          line-height: 1.5;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        img {
          max-width: 100%;
          height: auto;
        }

        a {
          color: var(--primary);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        button {
          font-family: var(--font-sans);
        }

        ::selection {
          background-color: var(--primary);
          color: white;
        }

        /* Scrollbar styles */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }

        /* Dark mode scrollbar */
        @media (prefers-color-scheme: dark) {
          ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
          }

          ::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
          }

          ::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.3);
          }
        }

        /* Focus styles */
        :focus-visible {
          outline: 2px solid var(--primary);
          outline-offset: 2px;
        }

        /* Remove focus outline for mouse users */
        :focus:not(:focus-visible) {
          outline: none;
        }
      `}
    />
  );
};

export default GlobalStyles;
