import { useEffect, useRef } from 'react';
import PerformanceMonitor from '../utils/PerformanceMonitor';

export const usePerformance = (componentName: string) => {
  const renderStart = useRef<number>(0);
  const performanceMonitor = PerformanceMonitor.getInstance();

  useEffect(() => {
    const renderTime = performance.now() - renderStart.current;
    performanceMonitor.trackComponentRender(componentName, renderTime);
  });

  useEffect(() => {
    renderStart.current = performance.now();

    return () => {
      const unmountTime = performance.now() - renderStart.current;
      performanceMonitor.trackComponentRender(`${componentName}_unmount`, unmountTime);
    };
  }, [componentName]);

  return {
    markInteraction: (interactionName: string) => {
      const markName = `${componentName}_${interactionName}`;
      performanceMonitor.mark(markName);
      return markName;
    },
    measureInteraction: (startMark: string, endMark: string, measureName: string) => {
      return performanceMonitor.measure(measureName, startMark, endMark);
    }
  };
};
