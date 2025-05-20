import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type {
  GridColDef,
  GridRenderCellParams,
  GridValidRowModel,
} from "@mui/x-data-grid";

export interface EditableTextColumnOptions<T extends GridValidRowModel> {
  field: keyof T & string;
  headerName: string;
  width?: number;
  flex?: number;
}

export const EditableTextColumn = <T extends GridValidRowModel>({
  field,
  headerName,
  width = 150,
  flex,
}: EditableTextColumnOptions<T>): GridColDef<T> => {
  return {
    field,
    headerName,
    width,
    flex,
    editable: true,
    sortable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams<T>) => {
      return (
        <Box display="flex" alignItems="center" height="100%" width="100%">
          <Typography variant="body2">{params.value as string}</Typography>
        </Box>
      );
    },
  };
};
