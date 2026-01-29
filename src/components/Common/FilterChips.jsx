import React from 'react';

/**
 * FilterChips Component
 * 
 * @param {Object} props
 * @param {Array} props.options - Array of { value, label } objects
 * @param {string|Array} props.value - Selected value(s)
 * @param {function} props.onChange - Change handler
 * @param {boolean} [props.multiple=false] - Allow multiple selection
 * @param {string} [props.className] - Additional classes
 */
const FilterChips = ({
    options,
    value,
    onChange,
    multiple = false,
    className = ''
}) => {
    const isSelected = (optionValue) => {
        if (multiple) {
            return Array.isArray(value) && value.includes(optionValue);
        }
        return value === optionValue;
    };

    const handleClick = (optionValue) => {
        if (multiple) {
            const newValue = Array.isArray(value) ? [...value] : [];
            if (newValue.includes(optionValue)) {
                onChange(newValue.filter(v => v !== optionValue));
            } else {
                onChange([...newValue, optionValue]);
            }
        } else {
            onChange(optionValue === value ? null : optionValue);
        }
    };

    return (
        <div className={`flex flex-wrap gap-2 ${className}`}>
            {options.map((option) => (
                <button
                    key={option.value}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm cursor-pointer transition-all duration-150 
                        ${isSelected(option.value)
                            ? 'bg-primary border-primary text-white'
                            : 'bg-surface-1 border-border-2 text-text-2 hover:bg-surface-2 hover:border-border-3 hover:text-text-1'
                        }`}
                    onClick={() => handleClick(option.value)}
                    aria-pressed={isSelected(option.value)}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
};

export default FilterChips;
