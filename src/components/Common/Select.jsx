import React from 'react';

/**
 * Select Component
 * 
 * @param {Object} props
 * @param {string} props.id - Input ID
 * @param {string} [props.label] - Label text
 * @param {Array} props.options - Array of { value, label } objects
 * @param {string} [props.value] - Selected value
 * @param {function} [props.onChange] - Change handler
 * @param {string} [props.error] - Error message
 * @param {string} [props.helperText] - Helper text
 * @param {boolean} [props.disabled] - Disabled state
 * @param {boolean} [props.required] - Required state
 * @param {string} [props.className] - Additional classes
 */
const Select = ({
    id,
    label,
    options = [],
    value,
    onChange,
    error,
    helperText,
    disabled,
    required,
    className = '',
    ...rest
}) => {
    const containerClasses = [
        'input-container',
        'select-wrapper',
        error ? 'input-error' : ''
    ].filter(Boolean).join(' ');

    return (
        <div className={`input-wrapper ${className}`}>
            {label && (
                <label htmlFor={id} className="input-label">
                    <span className="input-label-text">{label}</span>
                    {!required && <span className="input-optional">Optional</span>}
                </label>
            )}

            <div className={containerClasses}>
                <select
                    id={id}
                    className="input-field"
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    required={required}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
                    {...rest}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                <div className="select-chevron">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
            </div>

            {error ? (
                <div id={`${id}-error`} className="input-error-msg">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                    {error}
                </div>
            ) : helperText ? (
                <div id={`${id}-helper`} className="input-helper">
                    {helperText}
                </div>
            ) : null}
        </div>
    );
};

export default Select;
