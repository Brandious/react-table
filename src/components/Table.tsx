import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Code, TableCol, TableProps } from '../utils/types';
import TablePagination from '@mui/material/TablePagination';
import { useState } from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // Add hover effect
  '&:hover': {
    backgroundColor: theme.palette.action.selected, // Change this to your desired hover color
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



export default function CustomizedTables({ getColumns, getCodes, page, setPage }: TableProps) {

  const [rowsPerPage, setRowsPerPage] = useState(25);


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const currentRows = getCodes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


  return (

    <TableContainer component={Paper} sx={{ width: '80vw', margin: '2rem' }}>
      <Table aria-label="customized table" sx={{
        padding: '2rem'
      }}>
        <TableHead>
          <TableRow>
            {getColumns.filter(el => !el.hidden).map(el => <StyledTableCell
              key={el.id}>{el.dataField}</StyledTableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {currentRows.map((row: Code) => (
            <StyledTableRow key={row.id}>
              {getColumns.filter(el => !el.hidden).map((el: TableCol) => (
                <StyledTableCell key={el.id} component="th" scope="row">
                  {row[`${el.dataField}`]}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={getCodes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}

      />
    </TableContainer >


  );
}