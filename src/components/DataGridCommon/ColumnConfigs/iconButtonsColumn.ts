import type { GridColDef } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const createIconButtonsColumn = (
    field: string,
    headerName: string,
    width = 150,
    onEdit?: (row: any) => void,
    onDelete?: (row: any) => void
  ): GridColDef => ({
    field,
    headerName,
    width,
    renderCell: (params) => {
      if (!params.row) return null; // ✅ avoid empty return
  
      return (
        <React.Fragement>
          <IconButton onClick={() => onEdit?.(params.row)}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={() => onDelete?.(params.row)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </React.Fragement>
      );
    },
    sortable: false,
    filterable: false,
  });
  