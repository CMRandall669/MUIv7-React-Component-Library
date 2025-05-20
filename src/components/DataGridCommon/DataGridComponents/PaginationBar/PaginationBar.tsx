import * as React from "react";
import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

interface PaginationBarProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
  rowsPerPageOptions?: number[];
}

const PaginationBar = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions,
}: PaginationBarProps) => {
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
    onPageChange(0);
  };

  return (
    <Box sx={{ backgroundColor: "white", width: "100%" }}>
      <TablePagination
        component="div"
        count={count}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions ?? [10, 25, 50, 100]}
        showFirstButton
        showLastButton
        labelRowsPerPage={
          <Typography component="span" fontSize="0.75rem" color="textSecondary">
            Rows per page:
          </Typography>
        }
        sx={{
          ".MuiTablePagination-selectLabel": {
            fontSize: "0.75rem",
            display: "flex",
            alignItems: "center",
          },
          ".MuiTablePagination-select": {
            fontSize: "0.75rem",
            lineHeight: 1.5,
            paddingTop: "2px",
            paddingBottom: "2px",
          },
          ".MuiTablePagination-displayedRows": {
            fontSize: "0.75rem",
          },
          ".MuiTablePagination-actions": {
            fontSize: "0.75rem",
          },
        }}
      />
    </Box>
  );
};

export default PaginationBar;
