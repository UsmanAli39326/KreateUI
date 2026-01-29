import React from 'react';

/**
 * WCAGBadge Component
 * 
 * @param {Object} props
 * @param {string} props.level - 'A', 'AA', 'AAA'
 * @param {string} [props.status='pass'] - 'pass', 'fail', 'warn'
 * @param {string} [props.className] - Additional classes
 */
const WCAGBadge = ({
    level,
    status = 'pass',
    className = ''
}) => {
    const statusLabels = {
        pass: 'PASS',
        fail: 'FAIL',
        warn: 'WARN'
    };

    return (
        <div className={`wcag-badge ${className}`}>
            <span className="wcag-level">{level}</span>
            <span className={`wcag-status wcag-${status}`}>
                {statusLabels[status]}
            </span>
        </div>
    );
};

export default WCAGBadge;
