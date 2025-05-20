/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { getCustomerHealthSummaryColumns } from "../components/DataGridCommon/DataGridConfigs/CustomerHealthConfigs/CustomerHealthColumnConfig";
import type { CustomerHealthRow } from "../components/DataGridCommon/DataGridConfigs/CustomerHealthConfigs/types";
import DataGridCommon from "../components/DataGridCommon/DataGridCommon";
import { mockCustomerHealthData } from "../components/DataGridCommon/DataGridConfigs/CustomerHealthConfigs/chMockData";

const CustomerHealthPage = () => {
  const [rows, setRows] = useState<CustomerHealthRow[]>(mockCustomerHealthData);

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
      <DataGridCommon<CustomerHealthRow>
        rows={rows}
        columns={columns}
        paginationModel={{
          page: 0,
          pageSize: 10,
        }}
        onPaginationModelChange={() => {
          // Mock pagination handler (can be left empty for testing)
        }}
      />
      ;
    </div>
  );
};

export default CustomerHealthPage;
