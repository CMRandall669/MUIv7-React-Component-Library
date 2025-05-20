import * as React from "react";
import Box from "@mui/material/Box";
import DropDownSelector from "./DropDownSelector/DropDownSelector";
import ClearFilterButton from "./FilterButtons/ClearFilterButton";
import FilterButton from "./FilterButtons/FilterButton";
import TextField from "./TextField/TextField";

const mockCustomers = ["Acme Corp", "Globex Inc", "Initech"];
const mockDirections = ["Inbound", "Outbound", "Inbound and Outbound"];
const mockStatuses = ["All Statuses", "Pending", "Complete"];

const defaultFilters = {
  customer: "",
  direction: "",
  status: "",
  site: "",
  docName: "",
};

const FilterBar = () => {
  const [customer, setCustomer] = React.useState("");
  const [direction, setDirection] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [site, setSite] = React.useState("");
  const [docName, setDocName] = React.useState("");

  const filters = { customer, direction, status, site, docName };

  const isDefault = React.useMemo(() => {
    return Object.entries(defaultFilters).every(
      ([key, val]) => filters[key as keyof typeof filters] === val
    );
  }, [filters]);

  const handleClear = () => {
    setCustomer("");
    setDirection("");
    setStatus("");
    setSite("");
    setDocName("");
  };

  const handleFilter = () => {
    console.log("API call with:", filters);
    // Replace with actual API call
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        alignItems: "center",
        backgroundColor: "white",
        px: 2,
        py: 2,
      }}
    >
      <DropDownSelector
        label="Customer"
        options={mockCustomers}
        value={customer}
        onChange={setCustomer}
      />
      <TextField label="Site" value={site} onChange={setSite} />
      <TextField label="Document Name" value={docName} onChange={setDocName} />
      <DropDownSelector
        label="Transaction Type"
        options={mockDirections}
        value={direction}
        onChange={setDirection}
      />
      <DropDownSelector
        label="Status"
        options={mockStatuses}
        value={status}
        onChange={setStatus}
      />
      <ClearFilterButton onClear={handleClear} disabled={isDefault} />
      <FilterButton onFilter={handleFilter} disabled={isDefault} />
    </Box>
  );
};

export default FilterBar;
