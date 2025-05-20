import * as React from "react";
import { TextField as MuiTextField } from "@mui/material";

interface CustomTextFieldProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
}

const TextField = ({
  label,
  value,
  onChange,
  placeholder,
}: CustomTextFieldProps) => {
  return (
    <MuiTextField
      label={label}
      variant="standard"
      size="small"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
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
    />
  );
};

export default TextField;
