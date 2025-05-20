import React, { useState } from "react";
// import Page from "./Page";
import EdgeToEdgeReport from "./EdgeToEdgeLayout";
import GlobalDateRangePicker from "../../components/DateTimePicker/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const EdgeToEdgePage = () => {
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
        <EdgeToEdgeReport />
      </LocalizationProvider>
    </div>
  );
};

export default EdgeToEdgePage;
