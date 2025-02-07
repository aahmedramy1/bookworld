import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Checkbox,
    Button,
    Paper
} from '@mui/material';

const GenericList = ({ data, columns, onSelectionChange }) => {
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const getRowId = (row, index) => row.id ?? index;

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelectedIds = data.map((row, index) => getRowId(row, index));
            setSelected(newSelectedIds);
            if (onSelectionChange) {
                onSelectionChange(data);
            }
        } else {
            setSelected([]);
            if (onSelectionChange) {
                onSelectionChange([]);
            }
        }
    };

    const handleClick = (event, row, overallIndex) => {
        const id = getRowId(row, overallIndex);
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = [...selected, id];
        } else {
            newSelected = selected.filter(item => item !== id);
        }
        setSelected(newSelected);

        const selectedRows = data.filter((r, i) => newSelected.includes(getRowId(r, i)));
        if (onSelectionChange) {
            onSelectionChange(selectedRows);
        }
    };

    const isSelected = (row, overallIndex) => selected.indexOf(getRowId(row, overallIndex)) !== -1;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Paper>
            <TableContainer component={Paper} sx={{ width: "100%" }}>
                <Table sx={{ width: "100%" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox" sx={{ width: "50px" }}>
                                <Checkbox
                                    indeterminate={selected.length > 0 && selected.length < data.length}
                                    checked={data.length > 0 && selected.length === data.length}
                                    onChange={handleSelectAllClick}
                                />
                            </TableCell>
                            {columns.map((column, colIndex) => (
                                <TableCell key={colIndex} sx={{ width: `${100 / columns.length}%`, minWidth: "150px" }}>
                                    {column.headerName}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map((row, rowIndex) => {
                            const overallIndex = page * rowsPerPage + rowIndex;
                            const isItemSelected = isSelected(row, overallIndex);

                            return (
                                <TableRow
                                    hover
                                    key={getRowId(row, overallIndex)}
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    selected={isItemSelected}
                                >
                                    <TableCell padding="checkbox" sx={{ width: "50px" }}>
                                        <Checkbox
                                            checked={isItemSelected}
                                            onChange={(event) => handleClick(event, row, overallIndex)}
                                        />
                                    </TableCell>
                                    {columns.map((column, colIndex) => (
                                        <TableCell key={colIndex} sx={{ width: `${100 / columns.length}%`, minWidth: "150px" }}>
                                            {column.actions ? (
                                                column.actions.map((action, actionIndex) => (
                                                    <Button
                                                        key={actionIndex}
                                                        onClick={() => action.onClick(row)}
                                                        size="small"
                                                        variant="outlined"
                                                        sx={{ mr: 1 }}
                                                    >
                                                        {action.label}
                                                    </Button>
                                                ))
                                            ) : column.renderCell ? (
                                                column.renderCell(row[column.field], row)
                                            ) : typeof column.field === 'function' ? (
                                                column.field(row)
                                            ) : (
                                                row[column.field]
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={data.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Paper>
    );
};

export default GenericList;