import React from "react";
import Checkbox from "@mui/material/Checkbox";
import type {
  GridColDef,
  GridRenderCellParams,
  GridValidRowModel,
} from "@mui/x-data-grid";

export interface CheckboxColumnOptions<T extends GridValidRowModel> {
  field: string;
  headerName: string;
  selectedRowIds: (string | number)[];
  onRowSelect: (rowId: string | number, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  getRowId?: (row: T) => string | number;
}

export function createCheckboxColumn<T extends GridValidRowModel>({
  field,
  headerName,
  selectedRowIds,
  onRowSelect,
  onSelectAll,
  getRowId = (row) => row.id,
}: CheckboxColumnOptions<T>): GridColDef<T> {
  return {
    field,
    headerName,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderHeader: () => {
      const allSelected = selectedRowIds.length > 0;
      return (
        <Checkbox
          checked={allSelected}
          indeterminate={selectedRowIds.length > 0 && !allSelected}
          onChange={(e) => onSelectAll(e.target.checked)}
        />
      );
    },
    renderCell: (params: GridRenderCellParams<T>) => {
      const rowId = getRowId(params.row);
      const isChecked = selectedRowIds.includes(rowId);

      return (
        <Checkbox
          checked={isChecked}
          onChange={(e) => onRowSelect(rowId, e.target.checked)}
        />
      );
    },
  };
}
