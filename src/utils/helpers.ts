import { Code } from "./types"

export const createColumns = (columns: string[]) => {
    return columns.map((el: string, index: number) => ({
        id: crypto.randomUUID(),
        dataField: el as keyof Code,
        hidden: index >= 5 ? true : false
    }))
}

export const createCodes = (codes: Code[]) => {
    return codes.map((el:Code) => el)
}