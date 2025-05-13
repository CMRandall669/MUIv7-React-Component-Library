import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  type DataGridProps,
  type GridColDef,
  type GridValidRowModel,
} from "@mui/x-data-grid";
import PaginationBar from "./DataGridComponents/PaginationBar/PaginationBar";
import Grid from "@mui/material/Grid";

export interface DataGridCommonProps<R extends GridValidRowModel> {
  rows: R[];
  columns: GridColDef<R>[];
  checkboxSelection?: boolean;
  processRowUpdate?: (newRow: R, oldRow: R) => R;
  experimentalFeatures?: DataGridProps["experimentalFeatures"];
}

const DataGridCommon = <R extends GridValidRowModel>({
  rows,
  columns,
  checkboxSelection = false,
  processRowUpdate,
  experimentalFeatures,
}: DataGridCommonProps<R>) => {
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Grid container>
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
        sx={{ height: "calc(100% - 64px)", borderRadius: 0 }}
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
