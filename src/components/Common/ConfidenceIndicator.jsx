import React from 'react';

/**
 * ConfidenceIndicator Component
 * 
 * @param {Object} props
 * @param {number} props.score - 0 to 100
 * @param {string} [props.className] - Additional classes
 */
const ConfidenceIndicator = ({ score, className = '' }) => {
    const radius = 16;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    // Determine color based on score
    let color = 'var(--danger)';
    if (score >= 90) color = 'var(--success)';
    else if (score >= 70) color = 'var(--accent-1)';
    else if (score >= 50) color = 'var(--warning)';

    return (
        <div className={`confidence-indicator ${className}`} title={`AI Confidence: ${score}%`}>
            <svg className="confidence-svg" width="36" height="36">
                <circle
                    className="confidence-bg"
                    cx="18"
                    cy="18"
                    r={radius}
                />
                <circle
                    className="confidence-progress"
                    cx="18"
                    cy="18"
                    r={radius}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    style={{ stroke: color }}
                />
            </svg>
            <span className="confidence-value">{score}</span>
        </div>
    );
};

export default ConfidenceIndicator;
