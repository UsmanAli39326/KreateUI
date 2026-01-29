import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook to trap focus within a container element
 * 
 * @param {boolean} isActive - Whether the focus trap is active
 * @param {Object} options - Configuration options
 * @param {boolean} options.restoreFocus - Whether to restore focus on deactivation (default: true)
 * @returns {Object} - { containerRef } to attach to the container element
 */
export const useFocusTrap = (isActive, options = {}) => {
    const { restoreFocus = true } = options;
    const containerRef = useRef(null);
    const previousActiveElement = useRef(null);

    // Get all focusable elements within container
    const getFocusableElements = useCallback(() => {
        if (!containerRef.current) return [];

        const focusableSelectors = [
            'a[href]',
            'button:not([disabled])',
            'textarea:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            '[tabindex]:not([tabindex="-1"])',
        ].join(', ');

        return Array.from(containerRef.current.querySelectorAll(focusableSelectors))
            .filter(el => el.offsetParent !== null); // Filter out hidden elements
    }, []);

    // Handle Tab key navigation
    const handleKeyDown = useCallback((event) => {
        if (event.key !== 'Tab') return;

        const focusableElements = getFocusableElements();
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        // Shift + Tab: move backwards
        if (event.shiftKey) {
            if (document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            }
        } else {
            // Tab: move forwards
            if (document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }
    }, [getFocusableElements]);

    useEffect(() => {
        if (!isActive) return;

        // Store the currently focused element to restore later
        previousActiveElement.current = document.activeElement;

        // Focus the first focusable element in the container
        const focusableElements = getFocusableElements();
        if (focusableElements.length > 0) {
            // Small delay to ensure the container is rendered
            requestAnimationFrame(() => {
                focusableElements[0].focus();
            });
        }

        // Add keydown listener
        const container = containerRef.current;
        if (container) {
            container.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            if (container) {
                container.removeEventListener('keydown', handleKeyDown);
            }

            // Restore focus to the previously focused element
            if (restoreFocus && previousActiveElement.current) {
                previousActiveElement.current.focus();
            }
        };
    }, [isActive, getFocusableElements, handleKeyDown, restoreFocus]);

    return { containerRef };
};

/**
 * Hook to handle Escape key press
 * 
 * @param {boolean} isActive - Whether the handler is active
 * @param {Function} onEscape - Callback when Escape is pressed
 */
export const useEscapeKey = (isActive, onEscape) => {
    useEffect(() => {
        if (!isActive) return;

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                onEscape();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isActive, onEscape]);
};

export default useFocusTrap;
