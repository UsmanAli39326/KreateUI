import React from 'react';
import Spinner from './Spinner';

/**
 * Button Component
 * 
 * @param {Object} props
 * @param {string} [props.variant='primary'] - 'primary', 'secondary', 'tertiary', 'destructive'
 * @param {string} [props.size='md'] - 'sm', 'md', 'lg'
 * @param {boolean} [props.isLoading=false] - Show loading spinner
 * @param {boolean} [props.isDisabled=false] - Disable button
 * @param {boolean} [props.fullWidth=false] - 100% width
 * @param {React.ReactNode} [props.icon] - Icon component to display before text
 * @param {React.ReactNode} [props.iconRight] - Icon component to display after text
 * @param {function} [props.onClick] - Click handler
 * @param {string} [props.type='button'] - Button type
 * @param {string} [props.className] - Additional classes
 * @param {React.ReactNode} props.children - Button content
 */
const Button = ({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    isDisabled = false,
    fullWidth = false,
    icon,
    iconRight,
    onClick,
    type = 'button',
    className = '',
    children,
    ...rest
}) => {
    // Base classes
    const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium rounded-md cursor-pointer transition-all duration-150 border border-transparent outline-none select-none no-underline disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none";

    // Variant classes
    const variants = {
        main: "bg-primary text-white enabled:hover:bg-accent-hover enabled:hover:text-white enabled:active:bg-accent-3 focus-visible:ring-3 focus-visible:ring-accent-3/50 disabled:opacity-50 disabled:cursor-not-allowed",
        primary: "bg-accent-1 text-white hover:not-disabled:bg-accent-hover hover:not-disabled:shadow-lg active:not-disabled:bg-accent-3 active:not-disabled:translate-y-px focus-visible:ring-3 focus-visible:ring-accent-3/50",
        secondary: "bg-surface-2 border-border-2 text-text-1 hover:not-disabled:bg-surface-3 hover:not-disabled:border-border-3 hover:not-disabled:text-white active:not-disabled:bg-bg-0 active:not-disabled:translate-y-px",
        tertiary: "bg-transparent text-text-2 hover:not-disabled:bg-white/5 hover:not-disabled:text-text-1 active:not-disabled:bg-white/10",
        destructive: "bg-transparent border-danger text-danger hover:not-disabled:bg-danger hover:not-disabled:text-white active:not-disabled:bg-red-700"
    };

    // Size classes
    const sizes = {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 px-6 text-lg"
    };

    // Icon only adjustments (if children is empty or visually hidden, but here we assume standard button usage. 
    // If strict icon-only support is needed, checking !children might be necessary, but usually handled by passing icon-only props or just size)
    // The previous CSS had .btn-icon-only, but it wasn't explicitly used in the JS logic except maybe by consumer passing className.
    // We'll trust the consumer or add a prop if needed. For now standard padding works well.

    const widthClass = fullWidth ? 'w-full' : '';
    const loadingClass = isLoading ? 'opacity-80' : '';

    // Combine classes
    const classes = [
        baseClasses,
        variants[variant] || variants.primary,
        sizes[size] || sizes.md,
        widthClass,
        loadingClass,
        className
    ].filter(Boolean).join(' ');

    return (
        <button
            type={type}
            className={classes}
            onClick={onClick}
            disabled={isDisabled || isLoading}
            {...rest}
        >
            {isLoading && (
                <Spinner size="sm" className="mr-2" />
            )}

            {!isLoading && icon && (
                <span className="flex items-center">{icon}</span>
            )}

            <span>{children}</span>

            {!isLoading && iconRight && (
                <span className="flex items-center">{iconRight}</span>
            )}
        </button>
    );
};

export default Button;
