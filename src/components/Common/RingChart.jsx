import React from 'react';

/**
 * RingChart Component
 * 
 * Displays a circular progress ring chart for scores/percentages
 * 
 * @param {Object} props
 * @param {number} props.value - Current value (0-100)
 * @param {number} props.size - Size of the ring in pixels (default: 120)
 * @param {number} props.strokeWidth - Width of the stroke (default: 8)
 * @param {string} props.color - Color of the progress ring (default: accent-1)
 * @param {string} [props.label] - Label text to display in center
 * @param {string} [props.sublabel] - Sub-label text below main label
 * @param {string} [props.className] - Additional classes
 */
const RingChart = ({
    value,
    size = 120,
    strokeWidth = 8,
    color = 'var(--accent-1)',
    label,
    sublabel,
    className = ''
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    // Determine color based on value
    const getColor = () => {
        if (value >= 90) return 'var(--success)';
        if (value >= 70) return 'var(--warning)';
        if (value >= 50) return 'var(--info)';
        return 'var(--danger)';
    };

    const ringColor = color === 'var(--accent-1)' ? getColor() : color;

    return (
        <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
            <svg
                width={size}
                height={size}
                className="absolute top-0 left-0"
                style={{ transform: 'rotate(-90deg)' }}
            >
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="var(--surface-2)"
                    strokeWidth={strokeWidth}
                />
                {/* Progress circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={ringColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="transition-[stroke-dashoffset] duration-600 ease-in-out"
                />
            </svg>
            <div className="relative z-10 flex flex-col items-center justify-center text-center">
                {label && <div className="text-2xl font-bold text-text-1 leading-tight">{label}</div>}
                {sublabel && <div className="text-xs text-text-2 mt-0.5 font-medium">{sublabel}</div>}
            </div>
        </div>
    );
};

export default RingChart;
