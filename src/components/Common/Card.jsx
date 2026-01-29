import React from 'react';

/**
 * Card Component
 * 
 * @param {Object} props
 * @param {string} [props.title] - Card title
 * @param {string} [props.subtitle] - Card subtitle
 * @param {React.ReactNode} [props.actions] - Header actions
 * @param {React.ReactNode} [props.footer] - Footer content
 * @param {boolean} [props.hoverable] - Hover effect
 * @param {string} [props.className] - Additional classes
 */
const Card = ({
    title,
    subtitle,
    actions,
    footer,
    hoverable = false,
    children,
    className = '',
    ...rest
}) => {
    return (
        <div
            className={`bg-surface-1 border border-border-1 rounded-lg overflow-hidden transition-all duration-200 ${hoverable ? 'hover:border-border-2 hover:-translate-y-0.5 hover:shadow-lg' : ''} ${className}`}
            {...rest}
        >
            {(title || actions) && (
                <div className="px-6 py-4 border-b border-border-1 flex items-center justify-between">
                    <div className="flex-1">
                        {title && <h3 className="text-lg font-semibold text-text-1 m-0">{title}</h3>}
                        {subtitle && <p className="text-sm text-text-2 mt-0.5">{subtitle}</p>}
                    </div>
                    {actions && <div>{actions}</div>}
                </div>
            )}

            <div className="p-6">
                {children}
            </div>

            {footer && (
                <div className="px-6 py-4 border-t border-border-1 bg-bg-0 flex items-center justify-end gap-3">
                    {footer}
                </div>
            )}
        </div>
    );
};

export default Card;
