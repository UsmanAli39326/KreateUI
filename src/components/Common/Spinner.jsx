import React from 'react';

/**
 * Spinner Component
 * 
 * @param {Object} props
 * @param {string} [props.size='md'] - 'sm', 'md', 'lg'
 * @param {string} [props.className] - Additional classes
 */
const Spinner = ({ size = 'md', className = '' }) => {
    // Size classes
    const sizeClasses = {
        sm: "size-4 border-2",
        md: "size-6 border-[3px]",
        lg: "size-8 border-4"
    };

    return (
        <div
            className={`inline-block rounded-full border-solid border-current border-t-transparent animate-spin ${sizeClasses[size] || sizeClasses.md} ${className}`}
            role="status"
            aria-label="Loading"
        />
    );
};

export default Spinner;
