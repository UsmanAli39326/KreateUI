import React, { useState } from 'react';

/**
 * Input Component
 * 
 * @param {Object} props
 * @param {string} props.id - Input ID
 * @param {string} [props.label] - Label text
 * @param {string} [props.type='text'] - Input type
 * @param {string} [props.placeholder] - Placeholder text
 * @param {string} [props.value] - Input value
 * @param {function} [props.onChange] - Change handler
 * @param {string} [props.error] - Error message
 * @param {boolean} [props.success] - Success state
 * @param {string} [props.helperText] - Helper text
 * @param {boolean} [props.disabled] - Disabled state
 * @param {boolean} [props.required] - Required state
 * @param {React.ReactNode} [props.iconLeft] - Icon on the left
 * @param {React.ReactNode} [props.iconRight] - Icon on the right (overrides password toggle)
 * @param {string} [props.className] - Additional classes
 */
const Input = ({
    id,
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    error,
    success,
    helperText,
    disabled,
    required,
    iconLeft,
    iconRight,
    className = '',
    ...rest
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const effectiveType = isPassword ? (showPassword ? 'text' : 'password') : type;

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Helper to join classes
    const cx = (...classes) => classes.filter(Boolean).join(' ');

    const baseInputClasses = "w-full h-10 px-4 text-base text-text-1 bg-surface-1 border border-border-1 rounded-md transition-all appearance-none hover:not-disabled:border-border-2 hover:not-disabled:bg-surface-2 focus:outline-none focus:border-focus focus:ring-1 focus:ring-focus focus:bg-surface-2 placeholder:text-text-3 disabled:bg-bg-0 disabled:border-border-1 disabled:text-text-3 disabled:cursor-not-allowed";

    const stateClasses = error
        ? "border-danger focus:ring-danger focus:border-danger"
        : success
            ? "border-success focus:ring-success focus:border-success"
            : "";

    const paddingClasses = cx(
        iconLeft ? "pl-10" : "",
        (iconRight || isPassword) ? "pr-10" : ""
    );

    const inputClasses = cx(baseInputClasses, stateClasses, paddingClasses);

    return (
        <div className={`flex flex-col gap-2 w-full ${className}`}>
            {label && (
                <label htmlFor={id} className="flex justify-between text-sm font-medium text-text-2">
                    <span>{label}</span>
                    {!required && <span className="text-xs text-text-3 font-normal">Optional</span>}
                </label>
            )}

            <div className="relative flex items-center w-full">
                {iconLeft && (
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 flex items-center justify-center text-text-3 pointer-events-none size-10">
                        {iconLeft}
                    </div>
                )}

                <input
                    id={id}
                    type={effectiveType}
                    className={inputClasses}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    required={required}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
                    {...rest}
                />

                {isPassword && !iconRight ? (
                    <button
                        type="button"
                        className="absolute top-1/2 -translate-y-1/2 right-0 flex items-center justify-center text-text-3 pointer-events-auto cursor-pointer bg-none border-none size-10"
                        onClick={togglePasswordVisibility}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        )}
                    </button>
                ) : iconRight ? (
                    <div className="absolute top-1/2 -translate-y-1/2 right-0 flex items-center justify-center text-text-3 pointer-events-none size-10">
                        {iconRight}
                    </div>
                ) : null}
            </div>

            {error ? (
                <div id={`${id}-error`} className="text-danger text-xs flex items-center gap-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                    {error}
                </div>
            ) : helperText ? (
                <div id={`${id}-helper`} className="text-xs text-text-3 mt-0">
                    {helperText}
                </div>
            ) : null}
        </div>
    );
};

export default Input;
