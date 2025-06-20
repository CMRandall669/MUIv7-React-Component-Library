import * as React from "react";
import { FormControl, InputLabel, Input, styled } from "@mui/material";

interface StaticSelectorProps {
  label: string;
  value: string;
}

const StyledInput = styled(Input)(({ theme }) => ({
  pointerEvents: "none",
  borderBottom: "1px solid #ccc",
  "&:before": {
    borderBottom: "1px solid #ccc",
  },
  "&:after": {
    borderBottom: "1px solid #ccc",
  },
}));

const StaticSelector = ({ label, value }: StaticSelectorProps) => {
  return (
    <FormControl
      variant="standard"
      size="small"
      sx={{
        minWidth: 180,
        maxWidth: 240,
      }}
    >
      <InputLabel shrink>{label}</InputLabel>
      <StyledInput disableUnderline value={value} readOnly />
    </FormControl>
  );
};

export default StaticSelector;
