import { Box, Skeleton } from "@mui/material"
import Drawer from "../components/Drawer"
import Table from '../components/Table'
import { useData } from '../context/DataContext'
import { useSearch } from "../hooks/useSearch"
import { useEffect } from "react"

export const HomePage = () => {

    const { loading, error, tableCodes: getCodes, tableColumns: getColumns, toggleColumnVisibility, setPage, page } = useData()
    const { searchQuery, setSearchQuery, filteredCodes } = useSearch(getCodes, getColumns);


    useEffect(() => {
        setPage(0);
    }, [searchQuery]);

    if (error) return <Box>Error happened</Box>

    return (
        <>
            {loading ?
                <Skeleton variant="rectangular" width={210} height={118} /> :
                <>
                    <Table getColumns={getColumns} getCodes={filteredCodes} toggleColumnVisibility={toggleColumnVisibility} page={page} setPage={setPage} />
                    <Drawer getColumns={getColumns} toggleColumnVisibility={toggleColumnVisibility} setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
                </>
            }
        </>
    )
}