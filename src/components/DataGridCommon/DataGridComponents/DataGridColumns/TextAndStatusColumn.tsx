import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type {
  GridColDef,
  GridRenderCellParams,
  GridValidRowModel,
} from "@mui/x-data-grid";
import type { SvgIconProps } from "@mui/material/SvgIcon";

export interface StatusDisplay {
  icon?: React.ReactElement<SvgIconProps>;
  text?: string;
}

export interface StringAndStatusColumnOptions<T extends GridValidRowModel> {
  field: string;
  headerName: string;
  getString: (row: T) => string | number;
  getStatusDisplay: (row: T) => StatusDisplay;
  width?: number;
  flex?: number;
}

export const TextAndStatusColumn = <T extends GridValidRowModel>({
  field,
  headerName,
  getString,
  getStatusDisplay,
  width,
}: StringAndStatusColumnOptions<T>): GridColDef<T> => {
  return {
    field,
    headerName,
    sortable: false,
    filterable: false,
    width,
    minWidth: 160,
    renderCell: (params: GridRenderCellParams<T>) => {
      const row = params.row;
      const stringValue = getString(row);
      const { icon, text } = getStatusDisplay(row);

      return (
        <Box
          display="flex"
          alignItems="center"
          width="100%"
          height="100%"
          gap={2}
        >
          <Box minWidth="3ch">
            <Typography variant="body2">{stringValue}</Typography>
          </Box>

          {/* Status block */}
          <Box display="flex" alignItems="center" gap={0.5}>
            {icon}
            {text && (
              <Typography variant="body2" color="text.secondary">
                {text}
              </Typography>
            )}
          </Box>
        </Box>
      );
    },
  };
};
