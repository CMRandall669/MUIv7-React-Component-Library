import * as React from "react";
import type { GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export interface TextAndIconDisplay {
  icon?: React.ReactNode;
  textBefore?: string | number;
  textAfter?: string;
}

export interface TextAndIconColumnOptions<T extends GridValidRowModel> {
  field: string;
  headerName: string;
  flex?: number;
  minWidth?: number;
  getStatusDisplay: (value: unknown, row: T) => TextAndIconDisplay;
}

export function TextAndIconColumn<T extends GridValidRowModel>({
  field,
  headerName,
  getStatusDisplay,
  flex = 1,
  minWidth = 160,
}: TextAndIconColumnOptions<T>): GridColDef<T> {
  return {
    field,
    headerName,
    flex,
    minWidth,
    sortable: false,
    filterable: false,
    renderCell: (params) => {
      const { icon, textBefore, textAfter } = getStatusDisplay(
        params.value,
        params.row
      );

      // Format textBefore with commas if it's a number and has more than 4 digits
      const formattedTextBefore =
        typeof textBefore === "number" && textBefore >= 1000
          ? textBefore.toLocaleString()
          : textBefore;

      return (
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          width="100%"
          overflow="hidden"
        >
          {/* Text before icon (fixed width for up to 6 characters) */}
          <Box sx={{ width: "6ch", flexShrink: 0 }}>
            <Typography variant="body2">{formattedTextBefore}</Typography>
          </Box>

          {/* Icon + text after */}
          <Box
            display="flex"
            alignItems="center"
            gap={0.5}
            sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
          >
            {icon}
            {textAfter && (
              <Typography variant="body2" noWrap sx={{ maxWidth: "100%" }}>
                {textAfter}
              </Typography>
            )}
          </Box>
        </Box>
      );
    },
  };
}
