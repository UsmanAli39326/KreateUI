import React from 'react';
import Spinner from './Spinner';

/**
 * PageLoader Component
 * 
 * Full-page loading component for Suspense fallback
 */
const PageLoader = ({ message = 'Loading...' }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4" role="status" aria-live="polite">
            <Spinner size="lg" />
            <p className="text-text-2 text-sm">{message}</p>
        </div>
    );
};

export default PageLoader;
