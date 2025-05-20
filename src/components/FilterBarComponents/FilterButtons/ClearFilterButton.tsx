import * as React from "react";
import Button from "@mui/material/Button";

interface ClearFilterButtonProps {
  onClear: () => void;
  disabled?: boolean;
}

const ClearFilterButton = ({
  onClear,
  disabled = false,
}: ClearFilterButtonProps) => {
  return (
    <Button
      variant="outlined"
      onClick={onClear}
      disabled={disabled}
      sx={{ textTransform: "none" }}
    >
      Clear Filters
    </Button>
  );
};

export default ClearFilterButton;
