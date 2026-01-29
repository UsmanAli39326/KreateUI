import React from 'react';
import Input from './Input';
import Button from './Button';

/**
 * SearchInput Component
 * 
 * @param {Object} props
 * @param {function} props.onClear - Handler for clear button
 * ...Input props
 */
const SearchInput = ({ onClear, ...props }) => {
    return (
        <Input
            type="text"
            iconLeft={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            }
            iconRight={
                props.value && onClear ? (
                    <button
                        type="button"
                        onClick={onClear}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            pointerEvents: 'auto',
                            color: 'var(--text-3)'
                        }}
                        aria-label="Clear search"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                ) : null
            }
            {...props}
        />
    );
};

export default SearchInput;
