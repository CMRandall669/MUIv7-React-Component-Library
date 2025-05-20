/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import type {
  GridColDef,
  GridRenderCellParams,
  GridValidRowModel,
} from "@mui/x-data-grid";

type Variant = "text" | "icon" | "menu";

interface BaseProps<T extends GridValidRowModel> {
  field: string;
  headerName: string;
  variant: Variant;
  width?: number;
  tooltip?: string;
}

interface TextVariant<T> {
  getLabel: (row: T) => string;
  onClick: (row: T) => void;
}

interface IconAction<T> {
  icon: React.ReactElement;
  onClick: (row: T) => void;
  tooltip?: string;
  disabled?: boolean;
}

interface IconVariant<T> {
  getActions: (row: T) => IconAction<T>[];
}

interface MenuAction<T> {
  label: string;
  icon?: React.ReactElement;
  onClick: (row: T) => void;
  disabled?: boolean;
}

interface MenuVariant<T> {
  getActions: (row: T) => MenuAction<T>[];
}

type ActionColumnProps<T extends GridValidRowModel> = BaseProps<T> &
  (
    | ({ variant: "text" } & TextVariant<T>)
    | ({ variant: "icon" } & IconVariant<T>)
    | ({ variant: "menu" } & MenuVariant<T>)
  );

// Subcomponent for menu variant
function ActionMenuCell<T extends GridValidRowModel>({
  row,
  getActions,
  tooltip,
}: {
  row: T;
  getActions: (row: T) => MenuAction<T>[];
  tooltip?: string;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const actions = getActions(row);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const trigger = (
    <IconButton size="small" onClick={handleOpen}>
      <MoreVertIcon fontSize="small" />
    </IconButton>
  );

  return (
    <>
      {tooltip ? <Tooltip title={tooltip}>{trigger}</Tooltip> : trigger}
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

// Main column generator
export const ActionColumn = <T extends GridValidRowModel>(
  props: ActionColumnProps<T>
): GridColDef<T> => {
  const { field, headerName, width, variant, tooltip } = props;

  return {
    field,
    headerName,
    width,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: (params: GridRenderCellParams<T>) => {
      const row = params.row;

      if (variant === "text") {
        return (
          <Button
            variant="text"
            size="small"
            onClick={() => props.onClick(row)}
            sx={{ textTransform: "none", padding: 0, minWidth: 0 }}
          >
            {props.getLabel(row)}
          </Button>
        );
      }

      if (variant === "icon") {
        const actions = props.getActions(row);
        return (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            width="100%"
            height="100%"
            gap={1}
          >
            {actions.slice(0, 5).map((action, idx) => {
              const iconBtn = (
                <IconButton
                  key={idx}
                  size="small"
                  onClick={() => action.onClick(row)}
                  disabled={action.disabled}
                >
                  {action.icon}
                </IconButton>
              );
              return action.tooltip ? (
                <Tooltip key={idx} title={action.tooltip}>
                  {iconBtn}
                </Tooltip>
              ) : (
                iconBtn
              );
            })}
          </Box>
        );
      }

      if (variant === "menu") {
        return (
          <ActionMenuCell
            row={row}
            getActions={props.getActions}
            tooltip={tooltip}
          />
        );
      }

      return null;
    },
  };
};
