import React from 'react';

/**
 * Badge Component
 * 
 * @param {Object} props
 * @param {string} [props.variant='neutral'] - 'critical', 'high', 'medium', 'low', 'info', 'neutral'
 * @param {string} [props.size='md'] - 'sm', 'md', 'lg'
 * @param {boolean} [props.dot=false] - Show status dot
 * @param {string} [props.className] - Additional classes
 */
const Badge = ({
    variant = 'neutral',
    size = 'md',
    dot = false,
    children,
    className = ''
}) => {
    // Base classes
    const baseClasses = "inline-flex items-center justify-center rounded-full font-semibold tracking-wide whitespace-nowrap leading-relaxed";

    // Variant classes
    const variants = {
        critical: "bg-red-500/15 text-red-500 border border-red-500/20",
        high: "bg-orange-500/15 text-orange-500 border border-orange-500/20",
        medium: "bg-amber-500/15 text-amber-500 border border-amber-500/20",
        low: "bg-green-500/15 text-green-500 border border-green-500/20",
        info: "bg-blue-500/15 text-blue-500 border border-blue-500/20",
        neutral: "bg-surface-2 text-text-2 border border-border-2"
    };

    // Size classes
    const sizes = {
        sm: "px-[6px] text-[10px]",
        md: "px-2 py-[2px] text-xs",
        lg: "px-[10px] py-1 text-sm"
    };

    const classes = [
        baseClasses,
        variants[variant] || variants.neutral,
        sizes[size] || sizes.md,
        className
    ].filter(Boolean).join(' ');

    return (
        <span className={classes}>
            {dot && <span className="size-1.5 rounded-full mr-1.5 bg-current" />}
            {children}
        </span>
    );
};

export default Badge;
