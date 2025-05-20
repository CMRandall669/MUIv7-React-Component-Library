import * as React from "react";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";

interface DropDownSelectorProps {
  label: string;
  options: string[];
  value: string;
  onChange: (newValue: string) => void;
}

const DropDownSelector = ({
  label,
  options,
  value,
  onChange,
}: DropDownSelectorProps) => {
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
      <Select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((opt) => (
          <MenuItem key={opt} value={opt}>
            {opt}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropDownSelector;
