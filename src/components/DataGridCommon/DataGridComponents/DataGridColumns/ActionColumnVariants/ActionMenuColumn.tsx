import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import type {
  GridColDef,
  GridRenderCellParams,
  GridValidRowModel,
} from "@mui/x-data-grid";

export interface RowMenuAction<T> {
  label: string;
  icon?: React.ReactElement;
  onClick: (row: T) => void;
  disabled?: boolean;
}

export interface ActionMenuColumnOptions<T extends GridValidRowModel> {
  field: string;
  headerName: string;
  getActions: (row: T) => RowMenuAction<T>[];
  width?: number;
  tooltip?: string;
}

function ActionMenuCell<T extends GridValidRowModel>({
  row,
  getActions,
  tooltip,
}: {
  row: T;
  getActions: (row: T) => RowMenuAction<T>[];
  tooltip?: string;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const actions = getActions(row);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const iconButton = (
    <IconButton size="small" onClick={handleOpen}>
      <MoreVertIcon fontSize="small" />
    </IconButton>
  );

  return (
    <>
      {tooltip ? <Tooltip title={tooltip}>{iconButton}</Tooltip> : iconButton}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        {actions.map((action, idx) => (
          <MenuItem
            key={idx}
            onClick={() => {
              handleClose();
              action.onClick(row);
            }}
            disabled={action.disabled}
          >
            {action.icon && (
              <span style={{ marginRight: 8 }}>{action.icon}</span>
            )}
            {action.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export const createActionMenuColumn = <T extends GridValidRowModel>({
  field,
  headerName,
  getActions,
  width,
  tooltip,
}: ActionMenuColumnOptions<T>): GridColDef<T> => {
  return {
    field,
    headerName,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    width,
    renderCell: (params: GridRenderCellParams<T>) => (
      <ActionMenuCell
        row={params.row}
        getActions={getActions}
        tooltip={tooltip}
      />
    ),
  };
};
