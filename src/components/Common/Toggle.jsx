import React from 'react';

/**
 * Toggle Component
 * 
 * @param {Object} props
 * @param {string} props.id - Input ID
 * @param {string} [props.label] - Label text
 * @param {boolean} [props.checked] - Checked state
 * @param {function} [props.onChange] - Change handler
 * @param {boolean} [props.disabled] - Disabled state
 * @param {string} [props.className] - Additional classes
 */
const Toggle = ({
    id,
    label,
    checked,
    onChange,
    disabled,
    className = '',
    ...rest
}) => {
    return (
        <label className={`toggle-wrapper ${className}`} htmlFor={id}>
            <span className="input-label-text">{label}</span>
            <input
                id={id}
                type="checkbox"
                className="toggle-input sr-only"
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                {...rest}
            />
            <div className="toggle-switch">
                <span className="toggle-slider"></span>
            </div>
        </label>
    );
};

export default Toggle;
