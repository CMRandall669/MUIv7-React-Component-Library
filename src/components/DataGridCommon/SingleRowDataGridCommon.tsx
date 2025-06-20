import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  type DataGridProps,
  type GridColDef,
  type GridRowId,
  type GridValidRowModel,
} from "@mui/x-data-grid";

export interface DataGridCommonProps<R extends GridValidRowModel> {
  rows: R[];
  columns: GridColDef<R>[];
  checkboxSelection?: boolean;
  processRowUpdate?: (newRow: R, oldRow: R) => R;
  experimentalFeatures?: DataGridProps["experimentalFeatures"];
  getRowId?: (row: R) => GridRowId;
  loading?: boolean;
}

const SingleRowDataGridCommon = <R extends GridValidRowModel>({
  rows,
  columns,
  checkboxSelection = false,
  processRowUpdate,
  experimentalFeatures,
  loading,
  getRowId,
}: DataGridCommonProps<R>) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        height: "125px",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        processRowUpdate={processRowUpdate}
        experimentalFeatures={experimentalFeatures}
        loading={loading}
        checkboxSelection={checkboxSelection}
        disableRowSelectionOnClick
        hideFooter
        hideFooterPagination
        getRowId={getRowId}
        sx={{
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
  );
};

export default SingleRowDataGridCommon;
