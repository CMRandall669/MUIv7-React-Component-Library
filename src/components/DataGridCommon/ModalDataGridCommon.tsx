import * as React from "react";
import { useState, useEffect, useMemo, useRef } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  DataGrid,
  type GridColDef,
  type GridValidRowModel,
} from "@mui/x-data-grid";
import PaginationBar from "./DataGridComponents/PaginationBar/PaginationBar";
import { GlobalStyles } from "@mui/material";

export interface ModalDataGridCommonProps<R extends GridValidRowModel> {
  rows: R[];
  columns: GridColDef<R>[];
  checkboxSelection?: boolean;
  loading?: boolean;
}

const ModalDataGridCommon = <R extends GridValidRowModel>({
  rows,
  columns,
  checkboxSelection = false,
  loading,
}: ModalDataGridCommonProps<R>) => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [animateRows, setAnimateRows] = useState(false);

  const previousRowSignature = useRef<string | null>(null);

  useEffect(() => {
    const currentRowIds = rows.map((row) => row.id);
    const currentSignature = JSON.stringify(currentRowIds);

    const shouldAnimate =
      previousRowSignature.current !== null &&
      previousRowSignature.current !== currentSignature;

    if (shouldAnimate) {
      setAnimateRows(true);
      const timeout = setTimeout(() => setAnimateRows(false), 300);
      previousRowSignature.current = currentSignature;
      return () => clearTimeout(timeout);
    }

    previousRowSignature.current = currentSignature;
  }, [rows]);

  const paginatedRows = useMemo(() => {
    const start = page * pageSize;
    const end = start + pageSize;
    return rows.slice(start, end);
  }, [rows, page, pageSize]);

  const estimatedRowHeight = 100;
  const headerHeight = 56;
  const paginationBarHeight = 64;

  const totalRowHeight = rows.length * estimatedRowHeight + headerHeight;
  const containerHeight = Math.min(totalRowHeight + paginationBarHeight, 450);

  return (
    <>
      <GlobalStyles
        styles={{
          "@keyframes fadeIn": {
            from: { opacity: 0, transform: "translateY(6px)" },
            to: { opacity: 1, transform: "translateY(0)" },
          },
        }}
      />
      <Box
        sx={{
          width: "100%",
          height: `${containerHeight}px`,
          pb: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            animation: animateRows ? "fadeIn 0.3s ease-in" : undefined,
            height: "calc(100% - 64px)",
          }}
        >
          <DataGrid
            rows={paginatedRows}
            columns={columns}
            rowCount={rows.length}
            paginationMode="client"
            paginationModel={{ page, pageSize }}
            onPaginationModelChange={({ page, pageSize }) => {
              setPage(page);
              setPageSize(pageSize);
            }}
            checkboxSelection={checkboxSelection}
            disableRowSelectionOnClick
            hideFooterPagination
            hideFooter
            loading={loading}
            sx={{
              height: "100%",
              borderRadius: 0,
              border: 0,
              "& .MuiDataGrid-columnHeaderTitle": {
                fontSize: "0.875rem",
                fontWeight: 600,
                lineHeight: "24px",
                letterSpacing: "0.17px",
              },
            }}
          />
        </Box>

        <Box sx={{ width: "100%", backgroundColor: "white" }}>
          <PaginationBar
            count={rows.length}
            page={page}
            rowsPerPage={pageSize}
            onPageChange={setPage}
            onRowsPerPageChange={(newPageSize) => {
              setPageSize(newPageSize);
              setPage(0);
            }}
            rowsPerPageOptions={[5, 10, 15]}
          />
        </Box>
      </Box>
    </>
  );
};

export default ModalDataGridCommon;
