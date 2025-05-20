/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import DataGridCommon from "../../components/DataGridCommon/DataGridCommon";
import { getEdgeToEdgeReportColumns } from "./DataGrid/EdgeToEdgeReportColumnConfig";
import type { EdgeToEdgeReportRow } from "./DataGrid/types";
import { Box } from "@mui/material";
import type { ExportColumn } from "../../components/DataGridCommon/DataGridComponents/ExportButton/exportUtils";
import EdgeToEdgeReportFilterBar from "./FilterBar/FilterBar";
import SuppressBar from "../../components/SuppressBar/SuppressBar";
import SuppressModal from "../../components/SuppressModal/SuppressModal";

// Sample mock data (replace with API results)
const mockData: EdgeToEdgeReportRow[] = [
  {
    customer: "Colgate",
    site: "305",
    docName: "226735512",
    transType: "945",
    dateTime: "Dec 15, 2024 15:36:23",
    direction: "Outbound",
    mscIncidentNumber: "207957",
    id: "0",
  },
  {
    customer: "Colgate",
    site: "512",
    docName: "0000067340",
    transType: "945",
    dateTime: "Dec 15, 2024 15:36:23",
    direction: "Inbound",
    mscIncidentNumber: "207957",
    id: "1",
  },
  {
    customer: "Colgate",
    site: "305",
    docName: "226735514",
    transType: "945",
    dateTime: "Dec 15, 2024 15:36:23",
    direction: "Outbound",
    mscIncidentNumber: "207957",
    id: "2",
  },
];

const EdgeToEdgeReport = () => {
  const [rows, setRows] = useState<EdgeToEdgeReportRow[]>(mockData);
  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);
  const [suppressModalOpen, setSuppressModalOpen] = useState(false);

  const selectedRows = rows.filter((row) => selectedRowIds.includes(row.id));
  const inboundCount = rows.filter((row) => row.direction === "Inbound").length;
  const outboundCount = rows.filter(
    (row) => row.direction === "Outbound"
  ).length;

  const columns = getEdgeToEdgeReportColumns({
    selectedRowIds,
    onRowSelect: (id, checked) =>
      setSelectedRowIds((prev) =>
        checked ? [...prev, id] : prev.filter((rowId) => rowId !== id)
      ),
    onSelectAll: (checked) =>
      setSelectedRowIds(checked ? rows.map((row) => row.id) : []),
  });

  const exportColumns: ExportColumn<EdgeToEdgeReportRow>[] = columns
    .filter((col) => !!col.field && col.headerName !== "")
    .map((col) => ({
      key: col.field as keyof EdgeToEdgeReportRow,
      label: col.headerName as string,
    }));

  return (
    <div
      style={{
        height: "85vh",
        width: "95vw",
        backgroundColor: "white",
        margin: "0 auto",
      }}
    >
      <Box sx={{ px: 2, py: 2 }}>
        <EdgeToEdgeReportFilterBar />
      </Box>
      <Box sx={{ py: 2, px: 2 }}>
        <SuppressBar
          selectedCount={selectedRowIds.length}
          inboundCount={inboundCount}
          outboundCount={outboundCount}
          onSuppressClick={() => setSuppressModalOpen(true)}
        />
      </Box>

      <DataGridCommon<EdgeToEdgeReportRow>
        rows={rows}
        columns={columns}
        checkboxSelection={false}
        getRowId={(row: { id: any }) => row.id}
        paginationModel={{
          page: 0,
          pageSize: 0,
        }}
        onPaginationModelChange={function (model: {
          page: number;
          pageSize: number;
        }): void {
          throw new Error("Function not implemented.");
        }}
        exportProps={{
          variant: "client",
          rows,
          columns: exportColumns,
          fileName: "EdgeToEdgeReport",
          title: "Edge to Edge Report",
          isExporting: false,
        }}
      />

      <SuppressModal
        open={suppressModalOpen}
        onClose={() => setSuppressModalOpen(false)}
        onConfirm={(reason) => {
          console.log("Suppression reason:", reason);
          console.log("Suppressed rows:", selectedRows);
          // TODO: trigger API call or row updates here
          setSuppressModalOpen(false);
        }}
        rows={selectedRows}
        columns={columns}
      />
    </div>
  );
};

export default EdgeToEdgeReport;
