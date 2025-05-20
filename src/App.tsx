import React, { useState } from "react";
// import Page from "./Page";
import CustomerHealthPage from "./Pages/CustomerHealth";
import EdgeToEdgeReport from "./Pages/EdgeToEdgeReport";
import TestDataGridPage from "./Pages/ServerSidePaginatedGridExample";
import GlobalDateRangePicker from "./components/DateTimePicker/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import FilterBar from "./components/FilterBarComponents/FilterBar";

const App = () => {
  const [range, setRange] = useState<[Date, Date]>(() => {
    const now = new Date();
    return [new Date(now.getTime() - 24 * 60 * 60 * 1000), now];
  });

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <GlobalDateRangePicker
          startDate={range[0]}
          endDate={range[1]}
          setDateRange={(start, end) => setRange([start, end])}
        />
        <FilterBar />
        <CustomerHealthPage />
      </LocalizationProvider>
    </div>
  );
};

export default App;
