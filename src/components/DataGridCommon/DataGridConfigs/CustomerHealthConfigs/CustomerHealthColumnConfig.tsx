import {
  TextActionColumn,
  IconStatusTrackerColumn,
  StaticTextColumn,
  IconActionColumn,
} from "../../DataGridComponents/DataGridColumns";
import type { GridColDef } from "@mui/x-data-grid";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import type { CustomerHealthRow } from "./types";

interface GetColumnsParams {
  onCustomerClick: (row: CustomerHealthRow) => void;
}

export const getCustomerHealthSummaryColumns = ({
  onCustomerClick,
}: GetColumnsParams): GridColDef<CustomerHealthRow>[] => {
  return [
    StaticTextColumn<CustomerHealthRow>({
      field: "customer",
      headerName: "Customer",
      getValue: (row) => row.customer,
      flex: 1,
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
      flex: 1,
      getValue: (row) =>
        typeof row.unresolvedAlerts === "number"
          ? row.unresolvedAlerts.toLocaleString()
          : row.unresolvedAlerts,
    }),
    IconStatusTrackerColumn({
      field: "directoryMonitor",
      headerName: "Directory Monitor - Statuses",
      flex: 1,
      getStatusDisplay: (value) => {
        switch (value) {
          case "critical":
            return {
              icon: <AccessAlarmIcon sx={{ color: "#D32F2F" }} />,
              text: "Critical",
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
              text: "-",
            };
        }
      },
    }),
    IconStatusTrackerColumn({
      field: "rmqStatistic",
      headerName: "RMQ Statistic - Messages & Date/Time",
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
          case "cell":
            return {
              icon: null,
              text: "-",
            };
        }
      },
    }),
    IconActionColumn<CustomerHealthRow>({
      field: "viewHealthDetails",
      headerName: "Actions",
      getActions: (row) => [
        {
          icon: <InfoOutlineIcon />,
          tooltip: "View Health Details",
          onClick: () => {
            // TODO: Navigate to health details page
            console.log("View Health Details for", row.customer);
          },
        },
      ],
      width: 60,
    }),
  ];
};
