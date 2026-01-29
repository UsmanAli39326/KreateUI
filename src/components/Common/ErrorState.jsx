import React from 'react';
import Button from './Button';

/**
 * ErrorState Component
 * 
 * @param {Object} props
 * @param {string} [props.title='Something went wrong'] - Error title
 * @param {string} [props.message] - Error message
 * @param {function} [props.onRetry] - Retry handler
 */
const ErrorState = ({
    title = 'Something went wrong',
    message,
    onRetry,
    className = ''
}) => {
    return (
        <div className={`flex flex-col items-center justify-center p-8 bg-danger/10 border border-danger rounded-lg text-center ${className}`}>
            <div className="text-danger size-12 mb-4 flex items-center justify-center">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            </div>
            <h3 className="text-text-1 font-semibold mb-2">{title}</h3>
            {message && <p className="text-text-2 mb-4">{message}</p>}

            {onRetry && (
                <Button variant="secondary" onClick={onRetry}>
                    Try Again
                </Button>
            )}
        </div>
    );
};

export default ErrorState;
