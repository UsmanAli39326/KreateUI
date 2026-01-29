import React, { useState, useMemo, useRef, useCallback } from 'react';
import Button from './Button';

/**
 * DataTable Component
 * 
 * @param {Object} props
 * @param {Array} props.columns - Array of column definitions { key, label, sortable, render }
 * @param {Array} props.data - Array of data objects
 * @param {string} props.keyField - Unique key field name
 * @param {function} [props.onRowClick] - Row click handler
 * @param {boolean} [props.isLoading] - Loading state
 * @param {string} [props.className] - Additional classes
 */
const DataTable = ({
    columns,
    data,
    keyField = 'id',
    onRowClick,
    isLoading,
    className = ''
}) => {
    const [sortConfig, setSortConfig] = useState(null);
    const [focusedRowIndex, setFocusedRowIndex] = useState(-1);
    const tbodyRef = useRef(null);

    const sortedData = useMemo(() => {
        if (!sortConfig) return data;

        return [...data].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    }, [data, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const renderSortIcon = (key) => {
        if (!sortConfig || sortConfig.key !== key) {
            return <span className="inline-block align-middle ml-1 text-text-3" aria-hidden="true">↕</span>;
        }
        return <span className="inline-block align-middle ml-1" aria-hidden="true">{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>;
    };

    // Keyboard navigation handler
    const handleKeyDown = useCallback((event, rowIndex, row) => {
        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                if (rowIndex < sortedData.length - 1) {
                    setFocusedRowIndex(rowIndex + 1);
                    const nextRow = tbodyRef.current?.children[rowIndex + 1];
                    nextRow?.focus();
                }
                break;
            case 'ArrowUp':
                event.preventDefault();
                if (rowIndex > 0) {
                    setFocusedRowIndex(rowIndex - 1);
                    const prevRow = tbodyRef.current?.children[rowIndex - 1];
                    prevRow?.focus();
                }
                break;
            case 'Enter':
            case ' ':
                event.preventDefault();
                if (onRowClick) {
                    onRowClick(row);
                }
                break;
            case 'Home':
                event.preventDefault();
                setFocusedRowIndex(0);
                tbodyRef.current?.children[0]?.focus();
                break;
            case 'End':
                event.preventDefault();
                const lastIndex = sortedData.length - 1;
                setFocusedRowIndex(lastIndex);
                tbodyRef.current?.children[lastIndex]?.focus();
                break;
            default:
                break;
        }
    }, [sortedData.length, onRowClick]);

    if (isLoading) {
        return (
            <div className={`overflow-x-auto border border-border-1 rounded-lg p-4 flex justify-center ${className}`} role="status" aria-busy="true">
                <div className="flex items-center gap-2 text-text-2">
                    <span className="sr-only">Loading</span>
                    Loading data...
                </div>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className={`overflow-x-auto border border-border-1 rounded-lg p-8 flex justify-center text-center ${className}`}>
                <p className="text-text-2">No data available</p>
            </div>
        );
    }

    return (
        <div className={`overflow-x-auto border border-border-1 rounded-lg ${className}`} role="region" aria-label="Data table">
            <table className="w-full border-collapse whitespace-nowrap" role="grid">
                <thead>
                    <tr role="row">
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                role="columnheader"
                                onClick={() => column.sortable && requestSort(column.key)}
                                onKeyDown={(e) => {
                                    if (column.sortable && (e.key === 'Enter' || e.key === ' ')) {
                                        e.preventDefault();
                                        requestSort(column.key);
                                    }
                                }}
                                tabIndex={column.sortable ? 0 : -1}
                                className={`bg-surface-2 text-text-2 font-medium text-sm text-left px-4 py-3 border-b border-border-2 select-none hover:text-text-1 ${column.sortable ? 'cursor-pointer' : 'cursor-default'}`}
                                aria-sort={
                                    sortConfig?.key === column.key
                                        ? sortConfig.direction === 'ascending' ? 'ascending' : 'descending'
                                        : undefined
                                }
                            >
                                {column.label}
                                {column.sortable && renderSortIcon(column.key)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody ref={tbodyRef}>
                    {sortedData.map((row, rowIndex) => (
                        <tr
                            key={row[keyField]}
                            role="row"
                            tabIndex={onRowClick ? 0 : -1}
                            onClick={() => onRowClick && onRowClick(row)}
                            onKeyDown={(e) => handleKeyDown(e, rowIndex, row)}
                            onFocus={() => setFocusedRowIndex(rowIndex)}
                            className={`group border-b border-border-1 last:border-b-0 hover:bg-surface-2 ${onRowClick ? 'cursor-pointer' : ''}`}
                            aria-selected={focusedRowIndex === rowIndex}
                        >
                            {columns.map((column) => (
                                <td key={`${row[keyField]}-${column.key}`} role="gridcell" className="px-4 py-3 text-text-1 text-sm bg-surface-1 group-hover:bg-surface-2">
                                    {column.render ? column.render(row) : row[column.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
