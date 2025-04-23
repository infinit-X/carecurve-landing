class ErrorTracker {
  private static instance: ErrorTracker;
  private errors: Array<{
    timestamp: string;
    error: Error;
    componentStack?: string;
    context?: any;
  }> = [];

  private constructor() {
    this.initializeErrorListeners();
  }

  public static getInstance(): ErrorTracker {
    if (!ErrorTracker.instance) {
      ErrorTracker.instance = new ErrorTracker();
    }
    return ErrorTracker.instance;
  }

  private initializeErrorListeners(): void {
    window.addEventListener('error', (event) => {
      this.logError(event.error);
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.logError(event.reason);
    });
  }

  public logError(error: Error, componentStack?: string, context?: any): void {
    const errorLog = {
      timestamp: new Date().toISOString(),
      error,
      componentStack,
      context
    };

    this.errors.push(errorLog);
    this.reportError(errorLog);
  }

  private reportError(errorLog: any): void {
    // In a production environment, you would send this to your error tracking service
    console.error('Error tracked:', errorLog);

    // If you're using a service like Sentry, you would call their API here
    // Sentry.captureException(errorLog.error, {
    //   extra: {
    //     componentStack: errorLog.componentStack,
    //     context: errorLog.context
    //   }
    // });
  }

  public getErrors(): Array<any> {
    return this.errors;
  }

  public clearErrors(): void {
    this.errors = [];
  }
}
