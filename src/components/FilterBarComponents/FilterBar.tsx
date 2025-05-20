import * as React from "react";
import Box from "@mui/material/Box";
import DropDownSelector from "./DropDownSelector/DropDownSelector";
import TextField from "./TextField/TextField";
import ClearFilterButton from "./FilterButtons/ClearFilterButton";
import FilterButton from "./FilterButtons/FilterButton";
import type { FilterConfigItem } from "./types";

interface FilterBarProps {
  config: FilterConfigItem[];
  onFilter?: (filters: Record<string, string>) => void;
}

const FilterBar = ({ config, onFilter }: FilterBarProps) => {
  // Initialize filter state from config defaults
  const defaultValues = React.useMemo(() => {
    return config.reduce((acc, item) => {
      acc[item.key] = item.defaultValue;
      return acc;
    }, {} as Record<string, string>);
  }, [config]);

  const [filters, setFilters] =
    React.useState<Record<string, string>>(defaultValues);

  const isDefault = React.useMemo(() => {
    return config.every((item) => filters[item.key] === item.defaultValue);
  }, [filters, config]);

  const handleClear = () => {
    setFilters(defaultValues);
  };

  const handleFilter = () => {
    if (onFilter) onFilter(filters);
    else console.log("API call with:", filters);
  };

  const handleChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      {config.map((item) => {
        if (item.type === "dropdown") {
          return (
            <DropDownSelector
              key={item.key}
              label={item.label}
              options={item.options || []}
              value={filters[item.key]}
              onChange={(val) => handleChange(item.key, val)}
            />
          );
        }

        return (
          <TextField
            key={item.key}
            label={item.label}
            value={filters[item.key]}
            onChange={(val) => handleChange(item.key, val)}
          />
        );
      })}

      <ClearFilterButton onClear={handleClear} disabled={isDefault} />
      <FilterButton onFilter={handleFilter} disabled={isDefault} />
    </Box>
  );
};

export default FilterBar;
