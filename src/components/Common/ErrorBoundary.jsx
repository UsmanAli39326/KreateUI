import React, { Component } from 'react';
import Button from './Button';

/**
 * Error Boundary Component
 * 
 * Catches JavaScript errors in child component tree and displays fallback UI.
 * 
 * @example
 * <ErrorBoundary fallback={<CustomError />}>
 *   <MyComponent />
 * </ErrorBoundary>
 */
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError(error) {
        // Update state so next render shows fallback UI
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // Log error details for debugging
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        this.setState({ errorInfo });

        // Optional: Send to error reporting service
        // logErrorToService(error, errorInfo);
    }

    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null
        });

        // Call optional onReset callback
        if (this.props.onReset) {
            this.props.onReset();
        }
    };

    render() {
        if (this.state.hasError) {
            // Custom fallback provided
            if (this.props.fallback) {
                return this.props.fallback;
            }

            // Default fallback UI
            return (
                <div className="flex items-center justify-center min-h-[400px] p-8" role="alert">
                    <div className="flex flex-col items-center text-center max-w-[500px]">
                        <div className="text-danger mb-4">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-semibold text-text-1 mb-2">Something went wrong</h2>
                        <p className="text-text-2 mb-6">
                            {this.props.message || "We're sorry, but something unexpected happened. Please try again."}
                        </p>
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="w-full mb-6 text-left">
                                <summary className="cursor-pointer text-text-3 text-sm mb-2">Error Details</summary>
                                <pre className="bg-surface-1 p-3 rounded-md text-xs overflow-x-auto text-danger">{this.state.error.toString()}</pre>
                                {this.state.errorInfo && (
                                    <pre className="bg-surface-1 p-3 rounded-md text-xs overflow-x-auto text-danger mt-2">{this.state.errorInfo.componentStack}</pre>
                                )}
                            </details>
                        )}
                        <div className="flex gap-3">
                            <Button onClick={this.handleReset} variant="primary">
                                Try Again
                            </Button>
                            <Button onClick={() => window.location.reload()} variant="secondary">
                                Reload Page
                            </Button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
