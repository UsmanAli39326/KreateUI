import React from 'react';

/**
 * Skeleton Component
 * 
 * @param {Object} props
 * @param {string} [props.variant='text'] - 'text', 'rect', 'circle'
 * @param {string} [props.width] - Width (e.g., '100%', '200px')
 * @param {string} [props.height] - Height
 * @param {string} [props.className] - Additional classes
 */
const Skeleton = ({
    variant = 'text',
    width,
    height,
    className = '',
    style = {}
}) => {
    const getStyles = () => {
        const s = { ...style };
        if (width) s.width = width;
        if (height) s.height = height;
        return s;
    };

    const variantClasses = {
        text: "h-[1em] w-full mb-2 rounded-sm",
        rect: "w-full h-full rounded-sm",
        circle: "rounded-full"
    };

    return (
        <div
            className={`bg-surface-2 animate-pulse ${variantClasses[variant] || ''} ${className}`}
            style={getStyles()}
            aria-hidden="true"
        />
    );
};

export default Skeleton;
