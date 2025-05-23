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
import ExportButton from "./DataGridComponents/ExportButton/ExportButton";
import type { ExportColumn } from "./DataGridComponents/ExportButton/exportUtils";

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
  onPaginationModelChange: (model: { page: number; pageSize: number }) => void;
  getRowId?: (row: R) => GridRowId;
  exportProps?: DataGridCommonExportProps<R>;
}

const DataGridCommon = <R extends GridValidRowModel>({
  rows,
  columns,
  checkboxSelection = false,
  processRowUpdate,
  experimentalFeatures,
  exportProps,
}: DataGridCommonProps<R>) => {
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
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

      <DataGrid
        rows={rows}
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
        checkboxSelection={checkboxSelection}
        disableRowSelectionOnClick
        sx={{
          height: "calc(100% - 64px)",
          borderRadius: 0,
          "& .MuiDataGrid-columnHeaderTitle": {
            fontSize: "0.875rem",
            fontWeight: 600,
            lineHeight: "24px",
            letterSpacing: "0.17px",
          },
        }}
      />

      <Grid container>
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
  );
};

export default DataGridCommon;
