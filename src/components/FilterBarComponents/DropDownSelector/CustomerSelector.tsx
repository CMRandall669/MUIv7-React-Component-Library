import * as React from "react";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import type { DropdownOption } from "../types";

interface OptionObject {
  label: string;
  value: string;
}

interface CustomerSelectorProps {
  label: string;
  options: DropdownOption[];
  value: string;
  onChange: (newValue: string) => void;
}
const CustomerSelector = ({
  label,
  options,
  value,
  onChange,
}: CustomerSelectorProps) => {
  const isObjectOptions = typeof options[0] === "object";

  return (
    <FormControl
      variant="standard"
      size="small"
      sx={{
        minWidth: 180,
        maxWidth: 240,
        "& .MuiInput-underline:before": {
          borderBottomColor: "#ccc",
        },
        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
          borderBottomColor: "#000",
        },
      }}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        displayEmpty
        renderValue={(selected) => {
          const opt = (options as DropdownOption[]).find((o) =>
            typeof o === "string" ? o === selected : o.value === selected
          );
          return typeof opt === "string" ? opt : opt?.label ?? "";
        }}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 250,
              marginTop: 4,
            },
          },
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left",
          },
        }}
      >
        {(options as DropdownOption[]).map((opt) => {
          if (typeof opt === "string") {
            return (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            );
          }

          return (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default CustomerSelector;
