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
  variant: "client" | "server";
  rows?: T[];
  getExportData?: () => Promise<T[]>;
  isExporting: boolean;
  columns: ExportColumn<T>[];
  fileName?: string;
  title?: string;
}

export interface DataGridCommonProps<R extends GridValidRowModel> {
  rows: R[];
  columns: GridColDef<R>[];
  rowCount: number;
  checkboxSelection?: boolean;
  processRowUpdate?: (newRow: R, oldRow: R) => R;
  experimentalFeatures?: DataGridProps["experimentalFeatures"];
  getRowId?: (row: R) => GridRowId;
  paginationModel: {
    page: number;
    pageSize: number;
  };
  onPaginationModelChange: (model: { page: number; pageSize: number }) => void;
  exportProps?: DataGridCommonExportProps<R>;
}

const DataGridCommon = <R extends GridValidRowModel>({
  rows,
  columns,
  rowCount,
  checkboxSelection = false,
  processRowUpdate,
  experimentalFeatures,
  getRowId,
  paginationModel,
  onPaginationModelChange,
  exportProps,
}: DataGridCommonProps<R>) => {
  const handlePageChange = (newPage: number) => {
    onPaginationModelChange({
      page: newPage,
      pageSize: paginationModel.pageSize,
    });
  };

  const handleRowsPerPageChange = (newPageSize: number) => {
    onPaginationModelChange({
      page: 0,
      pageSize: newPageSize,
    });
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid>
          <PaginationBar
            count={rowCount}
            page={paginationModel.page}
            rowsPerPage={paginationModel.pageSize}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </Grid>
        <Grid sx={{ pr: 2 }}>
          {exportProps && <ExportButton {...exportProps} />}
        </Grid>
      </Grid>

      <DataGrid
        rows={rows}
        columns={columns}
        rowCount={rowCount}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        processRowUpdate={processRowUpdate}
        experimentalFeatures={experimentalFeatures}
        getRowId={getRowId}
        checkboxSelection={checkboxSelection}
        disableRowSelectionOnClick
        hideFooterPagination
        hideFooter
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
            count={rowCount}
            page={paginationModel.page}
            rowsPerPage={paginationModel.pageSize}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DataGridCommon;
