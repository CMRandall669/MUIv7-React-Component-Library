import type { GridColDef } from '@mui/x-data-grid';

export const createEditableTextColumn = (field: string, headerName: string, width = 150): GridColDef => ({
  field,
  headerName,
  width,
  editable: true,
});