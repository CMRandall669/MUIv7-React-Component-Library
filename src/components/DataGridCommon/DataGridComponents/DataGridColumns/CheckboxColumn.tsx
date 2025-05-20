import React from "react";
import Checkbox from "@mui/material/Checkbox";
import type {
  GridColDef,
  GridRenderCellParams,
  GridValidRowModel,
} from "@mui/x-data-grid";
import Box from "@mui/material/Box";

export interface CheckboxColumnOptions<T extends GridValidRowModel> {
  field: string;
  headerName: string;
  selectedRowIds: (string | number)[];
  onRowSelect: (rowId: string | number, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  getRowId?: (row: T) => string | number;
  width?: number;
  flex?: number;
}

export function CheckboxColumn<T extends GridValidRowModel>({
  field,
  headerName,
  selectedRowIds,
  onRowSelect,
  onSelectAll,
  getRowId = (row) => row.id,
  width,
  flex,
}: CheckboxColumnOptions<T>): GridColDef<T> {
  return {
    field,
    headerName,
    width,
    flex,
    minWidth: 60,
    align: "center",
    headerAlign: "center",
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderHeader: () => {
      const allSelected = selectedRowIds.length > 0;

      return (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
          width="100%"
        >
          <Checkbox
            checked={allSelected}
            indeterminate={selectedRowIds.length > 0 && !allSelected}
            onChange={(e) => onSelectAll(e.target.checked)}
            sx={{ p: 0 }}
          />
        </Box>
      );
    },
    renderCell: (params: GridRenderCellParams<T>) => {
      const rowId = getRowId(params.row);
      const isChecked = selectedRowIds.includes(rowId);

      return (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
          width="100%"
        >
          <Checkbox
            checked={isChecked}
            onChange={(e) => onRowSelect(rowId, e.target.checked)}
            sx={{ p: 0 }}
          />
        </Box>
      );
    },
  };
}
