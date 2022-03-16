import React from 'react';
import styles from './MUITable.module.scss';
import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { MUITableRow } from '../../types/MUITableRow';

interface Column {
  id: string;
  label: string;
}

interface MUITableProps {
  columns: Column[];
  rows: MUITableRow[];
  pageSize: number;
}

const MUITable: React.FC<MUITableProps> = ({ columns, rows, pageSize }) => {
  const [page, setPage] = React.useState(1);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  return (
    <div data-testid="MUITable">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="mui table">
          <TableHead>
            <TableRow>
              {columns &&
                columns.map((column) => (
                  <TableCell key={'header-' + column.id}>
                    {column.label}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)
              .map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {columns &&
                    columns.map((column) => (
                      <TableCell key={row.id + '_' + column.id}>
                        {row[column.id]}
                      </TableCell>
                    ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Pagination
          count={Math.ceil(rows.length / pageSize)}
          shape="rounded"
          onChange={handleChangePage}
          className={styles.AlignCenter}
        />
      </TableContainer>
    </div>
  );
};

export default MUITable;
