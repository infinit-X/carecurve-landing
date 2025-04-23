// Simple analytics utility for tracking user interactions and performance
const Analytics = {
  events: {},
  performanceMarks: {},

  // Track user interaction events
  trackEvent(eventName, data = {}) {
    const timestamp = new Date().toISOString();
    this.events[timestamp] = {
      event: eventName,
      ...data
    };

    // In a real application, you would send this to your analytics service
    console.log('Track event:', { timestamp, event: eventName, data });
  },

  // Track performance metrics
  markPerformance(markName) {
    if (typeof performance !== 'undefined') {
      performance.mark(markName);
      this.performanceMarks[markName] = performance.now();
    }
  },

  // Measure time between two performance marks
  measurePerformance(startMark, endMark, measureName) {
    if (typeof performance !== 'undefined') {
      try {
        performance.measure(measureName, startMark, endMark);
        const measure = performance.getEntriesByName(measureName)[0];
        return measure.duration;
      } catch (error) {
        console.error('Error measuring performance:', error);
        return null;
      }
    }
    return null;
  },

  // Track page load metrics using Performance API
  trackPageLoad() {
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        const navigationTiming = performance.getEntriesByType('navigation')[0];
        const pageLoadTime = navigationTiming.loadEventEnd - navigationTiming.startTime;
        
        this.trackEvent('page_load', {
          loadTime: pageLoadTime,
          domContentLoaded: navigationTiming.domContentLoadedEventEnd - navigationTiming.startTime,
          firstContentfulPaint: this.getFirstContentfulPaint(),
          url: window.location.pathname
        });
      });
    }
  },

  // Get First Contentful Paint metric
  getFirstContentfulPaint() {
    if (typeof performance !== 'undefined') {
      const paintMetrics = performance.getEntriesByType('paint');
      const fcpEntry = paintMetrics.find(entry => entry.name === 'first-contentful-paint');
      return fcpEntry ? fcpEntry.startTime : null;
    }
    return null;
  },

  // Track component render time
  trackComponentRender(componentName, renderTime) {
    this.trackEvent('component_render', {
      component: componentName,
      renderTime
    });
  },

  // Track user engagement
  trackEngagement() {
    let lastScrollPosition = 0;
    let scrollTimeout;

    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const currentPosition = window.scrollY;
        const scrollDirection = currentPosition > lastScrollPosition ? 'down' : 'up';
        const scrollDistance = Math.abs(currentPosition - lastScrollPosition);
        
        this.trackEvent('user_scroll', {
          direction: scrollDirection,
          distance: scrollDistance,
          position: currentPosition
        });
        
        lastScrollPosition = currentPosition;
      }, 150);
    });
  },

  // Initialize all tracking
  init() {
    this.trackPageLoad();
    this.trackEngagement();
    this.markPerformance('app_init');
  }
};

export default Analytics;
