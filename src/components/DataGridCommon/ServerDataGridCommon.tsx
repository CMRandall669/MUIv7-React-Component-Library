import * as React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Grid,
  CircularProgress,
  GlobalStyles,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  type DataGridProps,
  type GridColDef,
  type GridRowId,
  type GridValidRowModel,
} from "@mui/x-data-grid";
import PaginationBar from "./DataGridComponents/PaginationBar/PaginationBar";
import ExportButton from "./DataGridComponents/ExportButton/ExportButton";
import type { ExportColumn } from "./DataGridComponents/ExportButton/exportUtils";
import { calculateGridHeight } from "./utils";

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
  loading?: boolean;
  isFetching?: boolean;
  height?: number;
  sx?: React.ComponentProps<typeof Box>["sx"];
  minVisibleRows?: number;
  rowHeight?: number;
  minHeight?: number;
  maxHeight?: number;
  autoHeight?: boolean;
  getRowHeight?: DataGridProps["getRowHeight"];
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
  loading,
  isFetching,
  height,
  sx,
  minVisibleRows = 6,
  rowHeight = 52,
  minHeight,
  maxHeight,
  autoHeight,
  getRowHeight,
}: DataGridCommonProps<R>) => {
  const [animateRows, setAnimateRows] = useState(false);
  const previousRowSignature = React.useRef<string | null>(null);

  useEffect(() => {
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

  const resolvedHeight =
    height ??
    calculateGridHeight({
      rowCount: Math.max(paginationModel.pageSize, minVisibleRows),
      rowHeight,
    });

  const handlePageChange = (newPage: number) => {
    onPaginationModelChange({
      page: newPage,
      pageSize: paginationModel.pageSize,
    });
  };

  const handleRowsPerPageChange = (newPageSize: number) => {
    onPaginationModelChange({ page: 0, pageSize: newPageSize });
  };

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
        id="Server-DataGrid-Container"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: autoHeight ? "auto" : resolvedHeight,
          minHeight,
          maxHeight,
          ...sx,
        }}
      >
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid display="flex" alignItems="center" gap={2}>
            <PaginationBar
              count={rowCount}
              page={paginationModel.page}
              rowsPerPage={paginationModel.pageSize}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
            {isFetching && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CircularProgress size={20} thickness={5} />
                <Typography sx={{ pl: 1, mt: 0.5 }}>Loading...</Typography>
              </Box>
            )}
          </Grid>
          <Grid sx={{ pr: 2 }}>
            {exportProps && <ExportButton {...exportProps} />}
          </Grid>
        </Grid>

        <Box
          sx={{
            flexGrow: 1,
            minHeight: 0,
            animation: animateRows ? "fadeIn 0.3s ease-in" : undefined,
          }}
        >
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
            loading={loading}
            autoHeight={autoHeight}
            getRowHeight={getRowHeight}
            sx={{
              height: autoHeight ? undefined : "100%",
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
          <Grid container justifyContent="flex-end">
            <Grid>
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
      </Box>
    </>
  );
};

export default DataGridCommon;
