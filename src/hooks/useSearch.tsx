// src/hooks/useSearch.ts
import { useEffect, useState } from 'react';
import { Code, TableCol } from '../utils/types';

export const useSearch = (getCodes: Code[], getColumns: TableCol[], initialQuery: string = '') => {
    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(initialQuery);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchQuery.length < 3) {
                setDebouncedSearchQuery("")
                return;
            }
            setDebouncedSearchQuery(searchQuery);
        }, 1000); // 1 second debounce

        return () => {
            clearTimeout(handler); // Cleanup the timeout on unmount or when searchQuery changes
        };
    }, [searchQuery]);

    const filteredCodes = getCodes.filter(code =>
        getColumns.filter(col => !col.hidden).some(col => {
            const value = code[col.dataField];
            return value && value.toString().toLowerCase().includes(debouncedSearchQuery.toLowerCase());
        })
    );



    return { searchQuery, debouncedSearchQuery, setSearchQuery, filteredCodes };
};