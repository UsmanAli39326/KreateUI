import React from 'react';
import Button from './Button';

/**
 * EmptyState Component
 * 
 * @param {Object} props
 * @param {React.ReactNode} [props.icon] - Icon to display
 * @param {string} props.title - Title text
 * @param {string} [props.description] - Description text
 * @param {string} [props.actionLabel] - Button label
 * @param {function} [props.onAction] - Button click handler
 */
const EmptyState = ({
    icon,
    title,
    description,
    actionLabel,
    onAction,
    className = ''
}) => {
    return (
        <div className={`flex flex-col items-center justify-center text-center p-12 bg-bg-1 border border-dashed border-border-2 rounded-lg ${className}`}>
            {icon && <div className="size-16 text-text-3 mb-4 opacity-50 flex items-center justify-center">{icon}</div>}
            <h3 className="text-lg font-semibold text-text-1 mb-2">{title}</h3>
            {description && <p className="text-text-2 max-w-[400px] mb-6">{description}</p>}

            {actionLabel && onAction && (
                <Button variant="primary" onClick={onAction}>
                    {actionLabel}
                </Button>
            )}
        </div>
    );
};

export default EmptyState;
