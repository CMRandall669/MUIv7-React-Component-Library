import {
  TextActionColumn,
  IconStatusTrackerColumn,
  StaticTextColumn,
} from "../../DataGridComponents/DataGridColumns";
import type { GridColDef } from "@mui/x-data-grid";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";

export interface CustomerHealthRow {
  customer: string;
  overallHealth: "critical" | "atRisk" | "stable";
  unresolvedAlerts: number | string;
  directoryMonitor: "critical" | "atRisk" | "stable" | "cell";
}

interface GetColumnsParams {
  onCustomerClick: (row: CustomerHealthRow) => void;
}

export const getCustomerHealthSummaryColumns = ({
  onCustomerClick,
}: GetColumnsParams): GridColDef<CustomerHealthRow>[] => {
  return [
    TextActionColumn<CustomerHealthRow>({
      field: "customer",
      headerName: "Customer",
      getLabel: (row) => row.customer,
      onClick: onCustomerClick,
      width: 200,
    }),
    IconStatusTrackerColumn({
      field: "overallHealth",
      headerName: "Overall Customer Health",
      getStatusDisplay: (value) => {
        switch (value) {
          case "critical":
            return {
              icon: <AccessAlarmIcon sx={{ color: "#D32F2F" }} />,
              text: "Critical",
            };
          case "atRisk":
            return {
              icon: <WarningAmberIcon sx={{ color: "#FF9800" }} />,
              text: "At Risk",
            };
          case "stable":
          default:
            return {
              icon: <TaskAltIcon sx={{ color: "#2E7D32" }} />,
              text: "Stable",
            };
        }
      },
    }),
    StaticTextColumn({
      field: "unresolvedAlerts",
      headerName: "Edge To Edge Alerts - Unresolved",
      width: 200,
      getValue: (row) =>
        typeof row.unresolvedAlerts === "number"
          ? row.unresolvedAlerts.toLocaleString()
          : row.unresolvedAlerts,
    }),
    IconStatusTrackerColumn({
      field: "directoryMonitor",
      headerName: "Directory Monitor - Statuses",
      getStatusDisplay: (value) => {
        switch (value) {
          case "critical":
            return {
              icon: <AccessAlarmIcon sx={{ color: "#D32F2F" }} />,
              text: "Critical",
            };
          case "atRisk":
            return {
              icon: <WarningAmberIcon sx={{ color: "#FF9800" }} />,
              text: "At Risk",
            };
          case "stable":
            return {
              icon: <TaskAltIcon sx={{ color: "#2E7D32" }} />,
              text: "Stable",
            };
          case "cell":
          default:
            return {
              icon: null,
              text: "Cell",
            };
        }
      },
    }),
  ];
};
