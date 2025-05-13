import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import type {
  GridColDef,
  GridRenderCellParams,
  GridValidRowModel,
} from "@mui/x-data-grid";

export interface RowAction<T> {
  icon: React.ReactElement;
  onClick: (row: T) => void;
  tooltip?: string;
  disabled?: boolean;
}

export interface IconColumnOptions<T extends GridValidRowModel> {
  field: string;
  headerName: string;
  getActions: (row: T) => RowAction<T>[];
  width?: number;
}

export const IconActionColumn = <T extends GridValidRowModel>({
  field,
  headerName,
  getActions,
  width,
}: IconColumnOptions<T>): GridColDef<T> => {
  return {
    field,
    headerName,
    sortable: false,
    filterable: false,
    width,
    disableColumnMenu: true,
    renderCell: (params: GridRenderCellParams<T>) => {
      const actions = getActions(params.row);

      return (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          height="100%"
          width="100%"
          gap={1}
        >
          {actions.slice(0, 5).map((action, idx) => {
            const button = (
              <IconButton
                key={idx}
                size="small"
                onClick={() => action.onClick(params.row)}
                disabled={action.disabled}
              >
                {action.icon}
              </IconButton>
            );

            return action.tooltip ? (
              <Tooltip title={action.tooltip} key={idx}>
                {button}
              </Tooltip>
            ) : (
              button
            );
          })}
        </Box>
      );
    },
  };
};
