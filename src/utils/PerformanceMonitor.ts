class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Record<string, any> = {};
  private marks: Set<string> = new Set();

  private constructor() {
    this.initializePerformanceObserver();
  }

  public static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  private initializePerformanceObserver(): void {
    if (typeof window !== 'undefined') {
      // Observe paint timings
      const paintObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          this.metrics[entry.name] = entry.startTime;
        });
      });
      paintObserver.observe({ entryTypes: ['paint'] });

      // Observe layout shifts
      const clsObserver = new PerformanceObserver((list) => {
        let cumulativeLayoutShift = 0;
        list.getEntries().forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            cumulativeLayoutShift += entry.value;
          }
        });
        this.metrics.cumulativeLayoutShift = cumulativeLayoutShift;
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // Observe long tasks
      const longTaskObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          this.metrics.longTasks = this.metrics.longTasks || [];
          this.metrics.longTasks.push({
            duration: entry.duration,
            startTime: entry.startTime
          });
        });
      });
      longTaskObserver.observe({ entryTypes: ['longtask'] });
    }
  }

  public mark(name: string): void {
    if (typeof performance !== 'undefined') {
      performance.mark(name);
      this.marks.add(name);
    }
  }

  public measure(name: string, startMark: string, endMark: string): number | null {
    if (typeof performance !== 'undefined' && 
        this.marks.has(startMark) && 
        this.marks.has(endMark)) {
      try {
        performance.measure(name, startMark, endMark);
        const measures = performance.getEntriesByName(name, 'measure');
        if (measures.length > 0) {
          const duration = measures[0].duration;
          this.metrics[name] = duration;
          return duration;
        }
      } catch (error) {
        console.error('Error measuring performance:', error);
      }
    }
    return null;
  }

  public getMetrics(): Record<string, any> {
    return {
      ...this.metrics,
      timestamp: Date.now(),
      url: window.location.pathname
    };
  }

  public trackComponentRender(componentName: string, duration: number): void {
    if (!this.metrics.componentRenders) {
      this.metrics.componentRenders = {};
    }
    if (!this.metrics.componentRenders[componentName]) {
      this.metrics.componentRenders[componentName] = [];
    }
    this.metrics.componentRenders[componentName].push({
      duration,
      timestamp: Date.now()
    });
  }

  public clearMetrics(): void {
    this.metrics = {};
    this.marks.clear();
    if (typeof performance !== 'undefined') {
      performance.clearMarks();
      performance.clearMeasures();
    }
  }
}
