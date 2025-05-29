import * as React from "react";
import Button from "@mui/material/Button";

interface FilterButtonProps {
  onFilter: () => void;
  disabled?: boolean;
}

const FilterButton = ({ onFilter }: FilterButtonProps) => {
  return (
    <Button
      variant="contained"
      onClick={onFilter}
      sx={{
        textTransform: "none",
        backgroundColor: "#075895 !important",
        "&:hover": {
          backgroundColor: "#064c7a !important",
        },
      }}
    >
      Filter Table
    </Button>
  );
};

export default FilterButton;
