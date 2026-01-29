import React from 'react';

/**
 * StatusChip Component
 * 
 * @param {Object} props
 * @param {string} props.status - 'active', 'inactive', 'pending', 'error'
 * @param {string} props.label - Status text
 * @param {string} [props.className] - Additional classes
 */
const StatusChip = ({
    status = 'inactive',
    label,
    className = ''
}) => {
    return (
        <span className={`status-chip status-${status} ${className}`}>
            <span className="status-dot" />
            {label}
        </span>
    );
};

export default StatusChip;
