export interface Code {
    id: string;
    klasifikacija: string;
    naziv: string;
    karakteristikaA: string;
    karakteristikaB: string;
    karakteristikaC: string;
    karakteristikaD: string;
    karakteristikaE: string;
}

export interface TableCol {
    id: string,
    dataField: keyof Code,
    hidden: boolean
}

export interface TableProps {
    getColumns: TableCol[],
    getCodes: Code[],
    page: number,
    setPage: (page: number) => void;
    toggleColumnVisibility: (dataField: string) => void
}