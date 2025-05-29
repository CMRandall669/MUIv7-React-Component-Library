import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  type DataGridProps,
  type GridColDef,
  type GridRowId,
  type GridValidRowModel,
} from "@mui/x-data-grid";
import PaginationBar from "./DataGridComponents/PaginationBar/PaginationBar";
import Grid from "@mui/material/Grid";
import type { ExportColumn } from "./DataGridComponents/ExportButton/exportUtils";
import ExportButton from "./DataGridComponents/ExportButton/ExportButton";
import { GlobalStyles } from "@mui/material";

export interface DataGridCommonExportProps<T> {
  variant: "client";
  rows: T[];
  columns: ExportColumn<T>[];
  isExporting: boolean;
  fileName?: string;
  title?: string;
}

export interface DataGridCommonProps<R extends GridValidRowModel> {
  rows: R[];
  columns: GridColDef<R>[];
  rowCount?: number;
  checkboxSelection?: boolean;
  processRowUpdate?: (newRow: R, oldRow: R) => R;
  experimentalFeatures?: DataGridProps["experimentalFeatures"];
  paginationModel: { page: number; pageSize: number };
  onPaginationModelChange?: (model: { page: number; pageSize: number }) => void;
  getRowId?: (row: R) => GridRowId;
  exportProps?: DataGridCommonExportProps<R>;
  loading?: boolean;
}

const DataGridCommon = <R extends GridValidRowModel>({
  rows,
  columns,
  checkboxSelection = false,
  processRowUpdate,
  experimentalFeatures,
  exportProps,
  loading,
  getRowId,
}: DataGridCommonProps<R>) => {
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const [animateRows, setAnimateRows] = React.useState(false);
  const previousRowSignature = React.useRef<string | null>(null);

  React.useEffect(() => {
    const currentRowIds = rows.map((row) =>
      typeof getRowId === "function" ? getRowId(row) : row.id
    );
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
  }, [rows, getRowId]);

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
      <Box sx={{ width: "100%", height: "500px", pb: 3 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid>
            <PaginationBar
              count={rows.length}
              page={page}
              rowsPerPage={pageSize}
              onPageChange={setPage}
              onRowsPerPageChange={(newPageSize) => {
                setPageSize(newPageSize);
                setPage(0);
              }}
            />
          </Grid>
          <Grid sx={{ pr: 2 }}>
            {exportProps && <ExportButton {...exportProps} />}
          </Grid>
        </Grid>

        <Box
          sx={{
            animation: animateRows ? "fadeIn 0.3s ease-in" : undefined,
            height: "calc(100% - 64px)",
          }}
        >
          <DataGrid
            rows={rows.slice(page * pageSize, (page + 1) * pageSize)}
            columns={columns}
            paginationMode="client"
            paginationModel={{ page, pageSize }}
            onPaginationModelChange={({ page, pageSize }) => {
              setPage(page);
              setPageSize(pageSize);
            }}
            processRowUpdate={processRowUpdate}
            experimentalFeatures={experimentalFeatures}
            hideFooterPagination
            hideFooter
            loading={loading}
            checkboxSelection={checkboxSelection}
            disableRowSelectionOnClick
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

        <Grid container justifyContent="flex-end">
          <Grid size={4} sx={{ backgroundColor: "white" }} />
          <Grid size={8}>
            <PaginationBar
              count={rows.length}
              page={page}
              rowsPerPage={pageSize}
              onPageChange={setPage}
              onRowsPerPageChange={(newPageSize) => {
                setPageSize(newPageSize);
                setPage(0);
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default DataGridCommon;
