/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Box from "@mui/material/Box";
import DropDownSelector from "./DropDownSelector/DropDownSelector";
import CustomerSelector from "./DropDownSelector/CustomerSelector";
import StaticSelector from "./DropDownSelector/StaticSelector";
import TextField from "./TextField/TextField";
import ClearFilterButton from "./FilterButtons/ClearFilterButton";
import FilterButton from "./FilterButtons/FilterButton";
import type { FilterConfigItem } from "./types";
import Typography from "@mui/material/Typography";

interface FilterBarProps {
  config: FilterConfigItem[];
  onFilter?: (filters: Record<string, string>) => void;
  defaultValues?: Record<string, string | undefined>;
}

const FilterBar = ({ config, onFilter, defaultValues }: FilterBarProps) => {
  const mergedDefaults = React.useMemo(() => {
    const fromConfig = config.reduce((acc, item) => {
      if (item.type !== "static") {
        acc[item.key] = item.defaultValue ?? "";
      }
      return acc;
    }, {} as Record<string, string>);

    const normalizedDefaults = Object.entries(defaultValues ?? {}).reduce(
      (acc, [key, value]) => {
        acc[key] = value ?? "";
        return acc;
      },
      {} as Record<string, string>
    );

    return {
      ...fromConfig,
      ...normalizedDefaults,
    };
  }, [config, defaultValues]);

  const [filters, setFilters] =
    React.useState<Record<string, string>>(mergedDefaults);
  React.useEffect(() => {
    setFilters(mergedDefaults);
  }, [mergedDefaults]);

  const isDefault = React.useMemo(() => {
    return config.every((item) => {
      if (item.type === "static") return true;
      return filters[item.key] === item.defaultValue;
    });
  }, [filters, config]);

  const handleClear = () => {
    const cleared: Record<string, string> = {};

    config.forEach((item) => {
      if (item.type !== "static") {
        cleared[item.key] = item.defaultValue ?? "";
      }
    });

    setFilters(cleared);
    if (onFilter) onFilter(cleared);
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
        if (item.type === "static") {
          return (
            <StaticSelector
              key={item.key}
              label={item.label}
              value={(item as any).value}
            />
          );
        }

        if (item.type === "dropdown") {
          if (item.key === "customer") {
            return (
              <CustomerSelector
                key={item.key}
                label={item.label}
                options={item.options || []}
                value={filters[item.key] ?? ""}
                onChange={(val) => handleChange(item.key, val)}
              />
            );
          }

          return (
            <DropDownSelector
              key={item.key}
              label={item.label}
              options={item.options || []}
              value={filters[item.key] ?? ""}
              onChange={(val) => handleChange(item.key, val)}
              shrinkLabel
            />
          );
        }

        return (
          <TextField
            key={item.key}
            label={item.label}
            value={filters[item.key] ?? ""}
            onChange={(val) => handleChange(item.key, val)}
          />
        );
      })}

      <ClearFilterButton onClear={handleClear} />
      <FilterButton onFilter={handleFilter} />
    </Box>
  );
};

export default FilterBar;
