import React, { createContext, useContext, useEffect, useState } from 'react';
import { Code, TableCol } from '../utils/types';
import { createCodes, createColumns } from '../utils/helpers';

interface DataContextType {
    columns: string[];
    codes: Code[];
    loading: boolean;
    error: string | null;
    tableColumns: TableCol[];
    tableCodes: Code[];
    toggleColumnVisibility: (dataField: string) => void
    page: number,
    setPage: (page: number) => void
}

const DATA_CODES = import.meta.env.VITE_CODES!
const DATA_COLUMNS = import.meta.env.VITE_COLUMNS!

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [columns, setColumns] = useState<string[]>([]);
    const [codes, setCodes] = useState<Code[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const columnsPromise = fetch(`api/${DATA_COLUMNS}`);
                const codesPromise = fetch(`api/${DATA_CODES}`)
                const [col, code] = await Promise.all([columnsPromise, codesPromise])

                if (!col.ok || !code.ok) {
                    throw new Error('Network response was not ok');
                }
                const colResult = await col.json();
                const codeResult = await code.json();

                setColumns(colResult);
                setCodes(codeResult);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    const [tableColumns, setTableColumns] = useState<TableCol[]>([])
    const [tableCodes, setTableCodes] = useState<Code[]>([]);


    useEffect(() => {
        setTableCodes(createCodes(codes));
        setTableColumns(createColumns(columns))
    }, [columns, codes])



    const toggleColumnVisibility = (dataField: string) => {
        setTableColumns((prev) =>
            prev.map(el =>
                el.dataField === dataField ? {
                    ...el,
                    hidden: !el.hidden
                } : el
            )
        );
    };



    return (
        <DataContext.Provider value={{ columns, codes, loading, error, tableColumns, tableCodes, toggleColumnVisibility, page, setPage }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};