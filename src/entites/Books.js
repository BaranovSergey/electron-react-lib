import {CardActionArea, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Typography from "@mui/material/Typography";
import OutlinedCard from "./Book";
import React from "react";

function Books({data, onRowClick}) {

    const handleOnClick = (row) => {
        if (onRowClick) {
            onRowClick(row);
        }
    };

    return (
        <TableContainer sx={{width: '30%'}} component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Books</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row
                    ) => (
                        <CardActionArea key={row.id} onClick={() => handleOnClick(row)}>
                            <TableRow
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    <Typography variant="h7">Автор: {row.authors}</Typography>
                                    <Typography variant="h6">Название: {row.title}</Typography>
                                </TableCell>
                            </TableRow>
                        </CardActionArea>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Books