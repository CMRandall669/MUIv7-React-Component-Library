import {
  CheckboxColumn,
  StaticTextColumn,
} from "../../../components/DataGridCommon/DataGridComponents/DataGridColumns";
import type { GridColDef } from "@mui/x-data-grid";
import type { EdgeToEdgeReportRow } from "./types";

interface GetColumnsParams {
  selectedRowIds: (string | number)[];
  onRowSelect: (id: string | number, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
}

export const getEdgeToEdgeReportColumns = ({
  selectedRowIds,
  onRowSelect,
  onSelectAll,
}: GetColumnsParams): GridColDef<EdgeToEdgeReportRow>[] => {
  return [
    CheckboxColumn({
      field: "select",
      headerName: "",
      selectedRowIds,
      onRowSelect,
      onSelectAll,
      width: 50,
    }),
    StaticTextColumn({
      field: "customer",
      headerName: "Customer",
      getValue: (row) => row.customer,
      flex: 1,
    }),
    StaticTextColumn({
      field: "site",
      headerName: "Site",
      getValue: (row) => row.site,
      flex: 1,
    }),
    StaticTextColumn({
      field: "docName",
      headerName: "Document Name",
      getValue: (row) => row.docName,
      flex: 1.2,
    }),
    StaticTextColumn({
      field: "transType",
      headerName: "Transaction Type",
      getValue: (row) => row.transType,
      flex: 1,
    }),
    StaticTextColumn({
      field: "dateTime",
      headerName: "Date/Time",
      getValue: (row) => row.dateTime,
      flex: 1.2,
    }),
    StaticTextColumn({
      field: "direction",
      headerName: "Direction",
      getValue: (row) => row.direction,
      flex: 1,
    }),
    StaticTextColumn({
      field: "mscIncidentNumber",
      headerName: "MSC Incident Number",
      getValue: (row) => row.mscIncidentNumber,
      flex: 1.2,
    }),
  ];
};
