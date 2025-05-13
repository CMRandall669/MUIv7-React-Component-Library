/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { getCustomerHealthSummaryColumns } from "./components/DataGridCommon/DataGridConfigs/CustomerHealthConfigs/CustomerHealthSummaryColumns";
import type { CustomerHealthRow } from "./components/DataGridCommon/DataGridConfigs/CustomerHealthConfigs/CustomerHealthSummaryColumns";
import DataGridCommon from "./components/DataGridCommon/DataGridCommon";

const CustomerHealthPage = () => {
  const [rows, setRows] = useState<CustomerHealthRow[]>([]);

  const handleCustomerClick = (row: CustomerHealthRow) => {
    console.log("Navigate to customer detail for:", row.customer);
  };

  const columns = getCustomerHealthSummaryColumns({
    onCustomerClick: handleCustomerClick,
  });

  return (
    <div
      style={{
        height: "80vh",
        width: "90vw",
        backgroundColor: "white",
      }}
    >
      <DataGridCommon rows={rows} columns={columns} />;
    </div>
  );
};

export default CustomerHealthPage;
