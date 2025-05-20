import React, { useState } from "react";
import { Button, Menu, MenuItem, CircularProgress, Box } from "@mui/material";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import {
  exportToCSV,
  exportToPDF,
  handlePrint,
  type ExportColumn,
} from "./exportUtils";

interface ExportMenuButtonProps<T> {
  variant: "client" | "server";
  rows?: T[];
  getExportData?: () => Promise<T[]>;
  columns: ExportColumn<T>[];
  isExporting: boolean;
  fileName?: string;
  title?: string;
}

const ExportMenuButton = <T,>({
  variant,
  rows,
  getExportData,
  columns,
  isExporting,
  fileName = "export",
  title = "Exported Data",
}: ExportMenuButtonProps<T>) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const resolveData = async (): Promise<T[]> => {
    if (variant === "client") {
      return rows ?? [];
    }
    if (variant === "server" && getExportData) {
      return await getExportData();
    }
    return [];
  };

  return (
    <>
      <Button
        variant="text"
        onClick={handleMenuOpen}
        startIcon={
          isExporting ? (
            <CircularProgress size={16} sx={{ ml: 0.5 }} />
          ) : (
            <SaveAltIcon fontSize="small" />
          )
        }
        size="small"
        sx={{
          border: 0,
          color: "#075895",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          "&:focus": {
            outline: "none",
          },
          "&.Mui-focusVisible": {
            outline: "none",
          },
        }}
        disabled={isExporting}
      >
        <Box sx={{ mt: "2px" }}>{isExporting ? "Exporting..." : "Export"}</Box>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={async () => {
            handleMenuClose();
            await exportToCSV(resolveData, columns, fileName);
          }}
        >
          Export to CSV
        </MenuItem>
        <MenuItem
          onClick={async () => {
            handleMenuClose();
            await exportToPDF(resolveData, columns, fileName, title);
          }}
        >
          Export to PDF
        </MenuItem>
        <MenuItem
          onClick={async () => {
            handleMenuClose();
            await handlePrint(resolveData, columns, title);
          }}
        >
          Print
        </MenuItem>
      </Menu>
    </>
  );
};

export default ExportMenuButton;
