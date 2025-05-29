import * as React from "react";
import Button from "@mui/material/Button";

interface ClearFilterButtonProps {
  onClear: () => void;
  disabled?: boolean;
}

const ClearFilterButton = ({ onClear }: ClearFilterButtonProps) => {
  return (
    <Button variant="outlined" onClick={onClear} sx={{ textTransform: "none" }}>
      Clear Filters
    </Button>
  );
};

export default ClearFilterButton;
