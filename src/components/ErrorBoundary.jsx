import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Generate unique error ID for tracking
    const errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    console.error('ErrorBoundary caught an error:', {
      errorId,
      error,
      errorInfo,
      component: this.props.name || 'Unknown Component',
      timestamp: new Date().toISOString()
    });

    this.setState({
      error,
      errorInfo,
      errorId
    });

    // Report error to monitoring service if available
    if (window.analytics) {
      window.analytics.track('React Error Boundary Triggered', {
        errorId,
        errorMessage: error.message,
        errorStack: error.stack,
        component: this.props.name || 'Unknown Component',
        componentStack: errorInfo.componentStack
      });
    }

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo, errorId);
    }
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.handleRetry, this.state.errorId);
      }

      // Different UI based on error severity
      const isGameCritical = this.props.critical || this.props.name?.includes('Game');

      return (
        <div className="error-boundary-container min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
          <div className="error-boundary-content bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🛡️</div>
              <h1 className="text-3xl font-bold text-red-600 mb-2">
                {isGameCritical ? 'Game Error' : 'Component Error'}
              </h1>
              <p className="text-gray-600">
                {isGameCritical
                  ? 'The game encountered an unexpected error and needs to restart.'
                  : 'A component has crashed, but the game should continue working.'
                }
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">Error Details:</h3>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Component:</strong> {this.props.name || 'Unknown'}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Error ID:</strong> {this.state.errorId}
              </p>
              <details className="mt-2">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                  Technical Details
                </summary>
                <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto max-h-32">
                  {this.state.error && this.state.error.toString()}
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </details>
            </div>

            <div className="flex gap-4 justify-center">
              {!isGameCritical && (
                <button
                  onClick={this.handleRetry}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
              )}
              <button
                onClick={this.handleReload}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                {isGameCritical ? 'Restart Game' : 'Reload Page'}
              </button>
            </div>

            {this.props.supportInfo && (
              <div className="mt-6 text-center text-sm text-gray-500">
                <p>If this error persists, please contact support with Error ID: {this.state.errorId}</p>
                {this.props.supportInfo.email && (
                  <p>Email: {this.props.supportInfo.email}</p>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for easy wrapping
export const withErrorBoundary = (Component, options = {}) => {
  const WrappedComponent = React.forwardRef((props, ref) => (
    <ErrorBoundary name={options.name || Component.displayName || Component.name} {...options}>
      <Component {...props} ref={ref} />
    </ErrorBoundary>
  ));

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;

  return WrappedComponent;
};

// Hook for error reporting from functional components
export const useErrorHandler = () => {
  const handleError = React.useCallback((error, errorInfo = {}) => {
    const errorId = `hook_error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    console.error('useErrorHandler caught an error:', {
      errorId,
      error,
      errorInfo,
      timestamp: new Date().toISOString()
    });

    // Report to monitoring if available
    if (window.analytics) {
      window.analytics.track('Manual Error Report', {
        errorId,
        errorMessage: error.message || error.toString(),
        errorStack: error.stack,
        ...errorInfo
      });
    }

    return errorId;
  }, []);

  return handleError;
};

export default ErrorBoundary;