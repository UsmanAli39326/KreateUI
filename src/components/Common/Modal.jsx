import React, { useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';
import { useFocusTrap, useEscapeKey } from '../../hooks/useFocusTrap';

/**
 * Modal Component
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Is modal open
 * @param {function} props.onClose - Close handler
 * @param {string} [props.title] - Modal title
 * @param {string} [props.size='md'] - 'sm', 'md', 'lg', 'xl'
 * @param {React.ReactNode} [props.footer] - Footer content (buttons)
 * @param {boolean} [props.closeOnOverlayClick=true] - Close when clicking overlay
 */
const Modal = ({
    isOpen,
    onClose,
    title,
    size = 'md',
    footer,
    closeOnOverlayClick = true,
    children,
    className = ''
}) => {
    const modalId = useId();
    const titleId = `modal-title-${modalId}`;

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

    const handleOverlayClick = (e) => {
        if (closeOnOverlayClick && e.target === e.currentTarget) {
            onClose();
        }
    };

    const sizeClasses = {
        sm: 'max-w-[400px]',
        md: 'max-w-[500px]',
        lg: 'max-w-[800px]',
        xl: 'max-w-[1100px]'
    };

    return createPortal(
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[200] animate-[fadeIn_0.2s_ease-out_forwards]" onClick={handleOverlayClick}>
            <div
                ref={containerRef}
                className={`bg-surface-2 rounded-xl border border-border-2 shadow-xl w-full max-h-[90vh] flex flex-col z-[200] transform scale-95 opacity-0 animate-[scaleIn_0.2s_ease-out_forwards] ${sizeClasses[size]} ${className}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? titleId : undefined}
            >
                <div className="px-6 py-5 border-b border-border-2 flex items-center justify-between shrink-0">
                    <h3 id={titleId} className="text-xl font-semibold text-text-1 m-0">{title}</h3>
                    <button
                        className="text-text-3 p-2 -m-2 rounded-full transition-all duration-150 hover:bg-bg-1 hover:text-text-1 flex items-center justify-center cursor-pointer bg-transparent border-none"
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                <div className="p-6 overflow-y-auto">
                    {children}
                </div>

                {footer && (
                    <div className="px-6 py-4 border-t border-border-2 flex items-center justify-end gap-3 shrink-0">
                        {footer}
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
};

export const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    isDestructive = false,
    isLoading = false
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            size="sm"
            footer={
                <>
                    <Button variant="secondary" onClick={onClose} isDisabled={isLoading}>
                        {cancelLabel}
                    </Button>
                    <Button
                        variant={isDestructive ? 'destructive' : 'primary'}
                        onClick={onConfirm}
                        isLoading={isLoading}
                    >
                        {confirmLabel}
                    </Button>
                </>
            }
        >
            <p className="text-text-2">{message}</p>
        </Modal>
    );
};

export default Modal;
