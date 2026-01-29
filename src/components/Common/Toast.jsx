import React, { createContext, useContext, useState, useCallback } from 'react';


const ToastContext = createContext(null);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

const Toast = ({ id, type, title, message, onClose }) => {
    const icons = {
        success: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>,
        error: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>,
        warning: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>,
        info: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
    };

    const typeClasses = {
        success: "border-l-4 border-l-success",
        error: "border-l-4 border-l-danger",
        warning: "border-l-4 border-l-warning",
        info: "border-l-4 border-l-info"
    };

    const iconColors = {
        success: "text-success",
        error: "text-danger",
        warning: "text-warning",
        info: "text-info"
    };

    return (
        <div className={`flex items-start gap-3 p-4 bg-surface-2 border border-border-2 rounded-md shadow-lg min-w-[300px] max-w-[400px] pointer-events-auto animate-[slideIn_0.3s_ease-out_forwards] ${typeClasses[type]}`} role="alert">
            <div className={`shrink-0 size-5 ${iconColors[type]}`}>
                {icons[type]}
            </div>
            <div className="flex-1">
                {title && <div className="font-semibold text-sm text-text-1 mb-0.5">{title}</div>}
                <div className="text-sm text-text-2">{message}</div>
            </div>
            <button className="text-text-3 p-1 -m-1 rounded hover:bg-bg-1/50 hover:text-text-1 transition-colors duration-150" onClick={() => onClose(id)} aria-label="Close">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
        </div>
    );
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((type, message, title = '', duration = 5000) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, type, message, title }]);

        if (duration) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const values = {
        success: (message, title) => addToast('success', message, title),
        error: (message, title) => addToast('error', message, title),
        warning: (message, title) => addToast('warning', message, title),
        info: (message, title) => addToast('info', message, title)
    };

    return (
        <ToastContext.Provider value={values}>
            {children}
            <div
                className="fixed bottom-6 right-6 flex flex-col gap-3 z-[200] pointer-events-none"
                role="region"
                aria-label="Notifications"
                aria-live="polite"
            >
                {toasts.map(toast => (
                    <Toast key={toast.id} {...toast} onClose={removeToast} />
                ))}
            </div>
        </ToastContext.Provider>
    );
};
