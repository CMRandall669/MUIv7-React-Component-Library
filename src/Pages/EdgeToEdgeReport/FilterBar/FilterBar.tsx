import * as React from "react";
import FilterBar from "../../../components/FilterBarComponents/FilterBar";
import { edgeToEdgeFilterConfig } from "./FilterBarConfig";

const EdgeToEdgeReportFilterBar = () => {
  const handleFilter = (filters: Record<string, string>) => {
    console.log("EdgeToEdgeReport API call with filters:", filters);
    // Plug this into your data-fetching logic (e.g., Zustand, useQuery, etc.)
  };

  return <FilterBar config={edgeToEdgeFilterConfig} onFilter={handleFilter} />;
};

export default EdgeToEdgeReportFilterBar;
