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

    // Variant classes — Ivory & Amber Modernist
    const variants = {
        main: "bg-primary text-white enabled:hover:bg-accent-hover enabled:active:bg-accent-3 focus-visible:ring-3 focus-visible:ring-primary/30 disabled:opacity-50 disabled:cursor-not-allowed",
        primary: "bg-primary text-white hover:not-disabled:bg-accent-hover hover:not-disabled:shadow-lg active:not-disabled:bg-accent-3 active:not-disabled:translate-y-px focus-visible:ring-3 focus-visible:ring-primary/30",
        secondary: "bg-white border-border-1 text-text-1 hover:not-disabled:bg-bg-2 hover:not-disabled:border-border-2 active:not-disabled:bg-bg-3 active:not-disabled:translate-y-px shadow-sm",
        tertiary: "bg-transparent text-text-2 hover:not-disabled:bg-bg-2 hover:not-disabled:text-text-1 active:not-disabled:bg-bg-3",
        destructive: "bg-transparent border-danger text-danger hover:not-disabled:bg-danger hover:not-disabled:text-white active:not-disabled:bg-red-700"
    };

    // Size classes
    const sizes = {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 px-6 text-lg"
    };

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
