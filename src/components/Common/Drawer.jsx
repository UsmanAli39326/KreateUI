import React, { useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
import { useFocusTrap, useEscapeKey } from '../../hooks/useFocusTrap';

/**
 * Drawer Component
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Is drawer open
 * @param {function} props.onClose - Close handler
 * @param {string} [props.position='right'] - 'left', 'right'
 * @param {string} [props.title] - Drawer title
 * @param {string} [props.className] - Additional classes
 */
const Drawer = ({
    isOpen,
    onClose,
    position = 'right',
    title,
    children,
    className = '',
    noPadding = false
}) => {
    const drawerId = useId();
    const titleId = `drawer-title-${drawerId}`;

    // Focus trap and escape key handling
    const { containerRef } = useFocusTrap(isOpen);
    useEscapeKey(isOpen, onClose);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const positionClasses = {
        left: "left-0 w-[300px] border-r border-border-2 animate-[slideRight_0.3s_ease-out_forwards]",
        right: "right-0 w-[400px] border-l border-border-2 animate-[slideLeft_0.3s_ease-out_forwards]"
    };

    return createPortal(
        <>
            <div className="fixed inset-0 bg-black/50 z-[200] animate-[fadeIn_0.3s_ease-out_forwards]" onClick={onClose} aria-hidden="true" />
            <div
                ref={containerRef}
                className={`fixed inset-y-0 bg-surface-1 shadow-xl z-[200] flex flex-col transition-transform duration-300 ease-out ${positionClasses[position]} ${className}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? titleId : undefined}
            >
                {title && (
                    <div className="px-6 py-4 border-b border-border-2 flex items-center justify-between shrink-0">
                        <h3 id={titleId} className="text-xl font-semibold text-text-1 m-0">{title}</h3>
                        <button
                            className="text-text-3 p-2 -m-2 rounded-full transition-all duration-150 hover:bg-bg-1 hover:text-text-1 flex items-center justify-center cursor-pointer bg-transparent border-none"
                            onClick={onClose}
                            aria-label="Close drawer"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>
                )}
                <div className={`${noPadding ? '' : 'p-6'} overflow-y-auto flex-1`}>
                    {children}
                </div>
            </div>
        </>,
        document.body
    );
};

export default Drawer;
