import * as React from "react";
import type { GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export interface IconStatusTrackerOptions<T extends GridValidRowModel> {
  field: string;
  headerName: string;
  getStatusDisplay: (
    value: unknown,
    row: T
  ) => {
    icon?: React.ReactNode;
    text?: string;
  };
}

export function createIconStatusTrackerColumn<T extends GridValidRowModel>({
  field,
  headerName,
  getStatusDisplay,
}: IconStatusTrackerOptions<T>): GridColDef<T> {
  return {
    field,
    headerName,
    renderCell: (params) => {
      const { icon, text } = getStatusDisplay(params.value, params.row);

      return (
        <Box display="flex" width="100%" height="100%">
          <Box display="flex" alignItems="center" gap={1}>
            {icon}
            {text && <Typography variant="body2">{text}</Typography>}
          </Box>
        </Box>
      );
    },
    sortable: false,
  };
}
