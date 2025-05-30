import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type {
  GridColDef,
  GridRenderCellParams,
  GridValidRowModel,
} from "@mui/x-data-grid";

export interface StaticStringColumnOptions<T extends GridValidRowModel> {
  field: string;
  headerName: string;
  width?: number;
  getValue: (row: T) => string | number | null;
  flex?: number;
}

export const StaticTextColumn = <T extends GridValidRowModel>({
  field,
  headerName,
  getValue,
  width,
  flex = 1,
}: StaticStringColumnOptions<T>): GridColDef<T> => {
  return {
    field,
    headerName,
    width,
    flex,
    sortable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams<T>) => {
      const value = getValue(params.row);
      return (
        <Box display="flex" alignItems="center" height="100%" width="100%">
          <Typography variant="body2">{value}</Typography>
        </Box>
      );
    },
  };
};
