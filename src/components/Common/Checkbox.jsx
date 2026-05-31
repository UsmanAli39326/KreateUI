import React from "react";

export default function Checkbox({ id, label, checked, onChange, className = "" }) {
    return (
        <div className={`flex items-center ${className}`}>
            <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="h-4 w-4 text-accent-1 bg-surface-2 border-border-1 rounded focus:ring-accent-1 focus:ring-offset-0 cursor-pointer"
            />
            {label && (
                <label htmlFor={id} className="ml-2 block text-sm text-gray-700 dark:text-text-2 cursor-pointer select-none">
                    {label}
                </label>
            )}
        </div>
    );
}
