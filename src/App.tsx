import React, { useState } from "react";
// import Page from "./Page";
import CustomerHealthPage from "./Pages/CustomerHealth/CustomerHealth";
import EdgeToEdgeReport from "./Pages/EdgeToEdgeReport/EdgeToEdgeLayout";
import TestDataGridPage from "./Pages/ServerSidePaginatedGridExample";
import GlobalDateRangePicker from "./components/DateTimePicker/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import EdgeToEdgePage from "./Pages/EdgeToEdgeReport/EdgeToEdgePage";

const App = () => {
  const [range, setRange] = useState<[Date, Date]>(() => {
    const now = new Date();
    return [new Date(now.getTime() - 24 * 60 * 60 * 1000), now];
  });

  return (
    <div>
      <EdgeToEdgePage />
    </div>
  );
};

export default App;
