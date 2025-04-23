import React from 'react';
import { motion } from 'framer-motion';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <motion.div 
            className="error-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Oops! Something went wrong</h2>
            <p>We apologize for the inconvenience. Please try refreshing the page.</p>
            <motion.button
              className="retry-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </motion.button>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}
