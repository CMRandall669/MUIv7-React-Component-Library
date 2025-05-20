import * as React from "react";
import Button from "@mui/material/Button";

interface FilterButtonProps {
  onFilter: () => void;
  disabled?: boolean;
}

const FilterButton = ({ onFilter, disabled = false }: FilterButtonProps) => {
  return (
    <Button
      variant="contained"
      onClick={onFilter}
      disabled={disabled}
      sx={{ textTransform: "none" }}
    >
      Filter Table
    </Button>
  );
};

export default FilterButton;
