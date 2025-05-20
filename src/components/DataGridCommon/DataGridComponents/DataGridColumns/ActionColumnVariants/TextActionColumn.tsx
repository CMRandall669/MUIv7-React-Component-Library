import * as React from "react";
import Button from "@mui/material/Button";
import type {
  GridColDef,
  GridRenderCellParams,
  GridValidRowModel,
} from "@mui/x-data-grid";

export interface ActionTextColumnOptions<T extends GridValidRowModel> {
  field: string;
  headerName: string;
  getLabel: (row: T) => string;
  onClick: (row: T) => void;
  width?: number;
  flex?: number;
}

export const TextActionColumn = <T extends GridValidRowModel>({
  field,
  headerName,
  getLabel,
  onClick,
  width,
  flex = 1,
}: ActionTextColumnOptions<T>): GridColDef<T> => {
  return {
    field,
    headerName,
    sortable: false,
    filterable: false,
    width,
    flex,
    renderCell: (params: GridRenderCellParams<T>) => {
      const label = getLabel(params.row);

      return (
        <Button
          variant="text"
          size="small"
          onClick={() => onClick(params.row)}
          sx={{
            textTransform: "none",
            padding: 0,
            minWidth: 0,
            width: "100%",
            justifyContent: "flex-start",
          }}
        >
          {label}
        </Button>
      );
    },
  };
};
