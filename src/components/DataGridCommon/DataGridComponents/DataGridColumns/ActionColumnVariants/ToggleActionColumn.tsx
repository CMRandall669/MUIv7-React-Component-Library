import * as React from "react";
import Switch from "@mui/material/Switch";
import type {
  GridColDef,
  GridRenderCellParams,
  GridValidRowModel,
} from "@mui/x-data-grid";

interface ToggleCellProps<T> {
  row: T;
  getValue: (row: T) => boolean;
  onToggle: (row: T, newValue: boolean) => void;
}

function ToggleCell<T extends GridValidRowModel>({
  row,
  getValue,
  onToggle,
}: ToggleCellProps<T>) {
  const [checked, setChecked] = React.useState(() => getValue(row));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    setChecked(newValue);
    onToggle(row, newValue);
  };

  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      color="primary"
      size="small"
    />
  );
}

export interface ToggleActionIconOptions<T extends GridValidRowModel> {
  field: string;
  headerName: string;
  getValue: (row: T) => boolean;
  onToggle: (row: T, newValue: boolean) => void;
  width?: number;
}

export const ToggleActionColumn = <T extends GridValidRowModel>({
  field,
  headerName,
  getValue,
  onToggle,
  width = 100,
}: ToggleActionIconOptions<T>): GridColDef<T> => {
  return {
    field,
    headerName,
    width,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: (params: GridRenderCellParams<T>) => (
      <ToggleCell row={params.row} getValue={getValue} onToggle={onToggle} />
    ),
  };
};
