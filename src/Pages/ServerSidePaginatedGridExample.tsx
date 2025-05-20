import * as React from "react";
import { useState } from "react";
import DataGridCommon from "../components/DataGridCommon/ServerDataGridCommon";
import type { GridColDef } from "@mui/x-data-grid";
import { mockFetchRows, mockFetchAllRows } from "../mockApi";
import type { UserRow } from "../mockData";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import type { ExportColumn } from "../components/DataGridCommon/DataGridComponents/ExportButton/exportUtils";

const TestDataGridPage = () => {
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });

  const [rows, setRows] = React.useState<UserRow[]>([]);
  const [rowCount, setRowCount] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [isExporting, setIsExporting] = React.useState(false);

  const fetchData = async () => {
    setLoading(true);
    const { rows, total } = await mockFetchRows(
      paginationModel.page,
      paginationModel.pageSize
    );
    setRows(rows);
    setRowCount(total);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchData();
  }, [paginationModel]);

  const columns: GridColDef<UserRow>[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
  ];

  const exportColumns: ExportColumn<UserRow>[] = [
    { label: "ID", key: "id" },
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
  ];

  const handleExportAll = async () => {
    setIsExporting(true);
    try {
      const fullData = await mockFetchAllRows();
      return fullData;
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div
      style={{
        height: "85vh",
        width: "95vw",
        backgroundColor: "white",
        margin: "0 auto",
      }}
    >
      {loading && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <DataGridCommon<UserRow>
        rows={rows}
        columns={columns}
        rowCount={rowCount}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        exportProps={{
          variant: "server",
          getExportData: handleExportAll,
          columns: exportColumns,
          isExporting: isExporting,
          fileName: "UserExport",
          title: "All Users",
        }}
      />
    </div>
  );
};

export default TestDataGridPage;
