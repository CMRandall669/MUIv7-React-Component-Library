/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import DataGridCommon from "./components/DataGridCommon/DataGridCommon";

import {
  IconStatusTrackerColumn,
  CheckboxColumn,
  TextActionColumn,
  MenuActionColumn,
  IconActionColumn,
  TextAndStatusColumn,
  StaticTextColumn,
  EditableTextColumn,
  ToggleActionColumn,
} from "./components/DataGridCommon/DataGridComponents/DataGridColumns";
import type { GridColDef } from "@mui/x-data-grid";

import TaskAltIcon from "@mui/icons-material/TaskAlt";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import { Button } from "@mui/material";

interface RowData {
  isActive: boolean;
  id: number;
  firstName: string | null;
  lastName: string;
  age: number | null;
  status: "critical" | "atRisk" | "stable";
  messageCount: number;
}

const initialRows: RowData[] = [
  {
    id: 1,
    lastName: "Snow",
    firstName: "Jon",
    age: 14,
    status: "critical",
    messageCount: Math.floor(Math.random() * 591) + 10,
    isActive: true,
  },
  {
    id: 2,
    lastName: "Lannister",
    firstName: "Cersei",
    age: 31,
    status: "atRisk",
    messageCount: Math.floor(Math.random() * 591) + 10,
    isActive: false,
  },
  {
    id: 3,
    lastName: "Lannister",
    firstName: "Jaime",
    age: 31,
    status: "stable",
    messageCount: Math.floor(Math.random() * 591) + 10,
    isActive: false,
  },
  {
    id: 4,
    lastName: "Stark",
    firstName: "Arya",
    age: 11,
    status: "stable",
    messageCount: Math.floor(Math.random() * 591) + 10,
    isActive: true,
  },
  {
    id: 5,
    lastName: "Targaryen",
    firstName: "Daenerys",
    age: null,
    status: "atRisk",
    messageCount: Math.floor(Math.random() * 591) + 10,
    isActive: false,
  },
  {
    id: 6,
    lastName: "Melisandre",
    firstName: null,
    age: 150,
    status: "critical",
    messageCount: Math.floor(Math.random() * 591) + 10,
    isActive: false,
  },
  {
    id: 7,
    lastName: "Clifford",
    firstName: "Ferrara",
    age: 44,
    status: "stable",
    messageCount: Math.floor(Math.random() * 591) + 10,
    isActive: true,
  },
  {
    id: 8,
    lastName: "Frances",
    firstName: "Rossini",
    age: 36,
    status: "atRisk",
    messageCount: Math.floor(Math.random() * 591) + 10,
    isActive: true,
  },
  {
    id: 9,
    lastName: "Roxie",
    firstName: "Harvey",
    age: 65,
    status: "critical",
    messageCount: Math.floor(Math.random() * 591) + 10,
    isActive: false,
  },
];

const Page = () => {
  const [rows, setRows] = useState<RowData[]>(initialRows);
  const [modifiedRows, setModifiedRows] = useState<Set<number>>(new Set());
  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);

  const handleRowUpdate = (updatedRow: RowData, oldRow: RowData) => {
    if (updatedRow !== oldRow) {
      setModifiedRows((prev) => new Set(prev).add(updatedRow.id));
    }

    setRows((prev) =>
      prev.map((row) => (row.id === updatedRow.id ? updatedRow : row))
    );

    return updatedRow;
  };

  const handleRowSelect = (id: string | number, checked: boolean) => {
    setSelectedRowIds((prev) =>
      checked ? [...prev, id] : prev.filter((rowId) => rowId !== id)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedRowIds(checked ? rows.map((row) => row.id) : []);
  };

  const handleActionClick = (row: RowData) => {
    alert(`Clicked: ${row.firstName} ${row.lastName}`);
  };

  const columns: GridColDef<RowData>[] = [
    CheckboxColumn({
      field: "select",
      headerName: "",
      selectedRowIds,
      onRowSelect: handleRowSelect,
      onSelectAll: handleSelectAll,
      width: 80,
    }),
    StaticTextColumn({
      field: "firstName",
      headerName: "Static Text",
      getValue: (row) => row.firstName,
    }),
    EditableTextColumn({
      field: "age",
      headerName: "Editable Text",
    }),
    TextActionColumn<RowData>({
      field: "action",
      headerName: "Action Text",
      getLabel: () => "View",
      onClick: handleActionClick,
    }),
    IconActionColumn({
      field: "actions",
      headerName: "Action Icon",
      getActions: (row) => [
        {
          icon: <EditIcon />,
          onClick: () => console.log("Edit", row),
          tooltip: "Edit",
        },
        {
          icon: <DeleteIcon />,
          onClick: () => console.log("Delete", row),
          tooltip: "Delete",
        },
        {
          icon: <InfoIcon />,
          onClick: () => console.log("Details", row),
          tooltip: "Info",
        },
      ],
    }),
    MenuActionColumn({
      field: "menu",
      headerName: "Action Menu",
      tooltip: "Open menu",
      getActions: (row) => [
        {
          label: "Edit",
          icon: <EditIcon fontSize="small" />,
          onClick: () => console.log("Edit", row),
        },
        {
          label: "Delete",
          icon: <DeleteIcon fontSize="small" />,
          onClick: () => console.log("Delete", row),
          disabled: row.age == null,
        },
      ],
    }),
    ToggleActionColumn<RowData>({
      field: "isActive",
      headerName: "Active",
      getValue: (row) => row.isActive ?? true,
      onToggle: (row, newValue) => {
        setModifiedRows((prev) => new Set(prev).add(row.id));
        setRows((prev) =>
          prev.map((r) => (r.id === row.id ? { ...r, isActive: newValue } : r))
        );
      },
    }),
    IconStatusTrackerColumn({
      field: "status",
      headerName: "Health",
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
    TextAndStatusColumn({
      field: "messageCount",
      headerName: "String + Status",
      getString: (row) => row.messageCount,
      getStatusDisplay: (row) => {
        if (row.messageCount > 500) {
          return {
            icon: <AccessAlarmIcon sx={{ color: "#D32F2F" }} />,
            text: "Critical",
          };
        } else if (row.messageCount > 300) {
          return {
            icon: <WarningAmberIcon sx={{ color: "#FF9800" }} />,
            text: "At Risk",
          };
        } else {
          return {
            icon: <TaskAltIcon sx={{ color: "#2E7D32" }} />,
            text: "Stable",
          };
        }
      },
    }),
  ];

  return (
    <div
      style={{
        height: "80vh",
        width: "90vw",
        backgroundColor: "white",
      }}
    >
      <Button
        variant="contained"
        disabled={modifiedRows.size === 0}
        onClick={() => {
          const updated = rows.filter((row) => modifiedRows.has(row.id));
          console.log("Send these to API:", updated);
        }}
        sx={{ mb: 1 }}
      >
        Save Changes
      </Button>

      <DataGridCommon
        rows={rows}
        columns={columns}
        processRowUpdate={handleRowUpdate}
      />
    </div>
  );
};

export default Page;

// /* eslint-disable @typescript-eslint/no-unused-vars */
// import React, { useState } from "react";
// import DataGridCommon from "./components/DataGridCommon/DataGridCommon";
// import { IconStatusTrackerColumn } from "./components/DataGridCommon/DataGridComponents/DataGridColumns/IconStatusTrackerColumn";
// import { CheckboxColumn } from "./components/DataGridCommon/DataGridComponents/DataGridColumns/CheckboxColumn";
// import { ActionColumn } from "./components/DataGridCommon/DataGridComponents/DataGridColumns/ActionColumnVariants/ActionColumnCombined";
// import type { GridColDef } from "@mui/x-data-grid";

// import TaskAltIcon from "@mui/icons-material/TaskAlt";
// import WarningAmberIcon from "@mui/icons-material/WarningAmber";
// import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import InfoIcon from "@mui/icons-material/Info";

// interface RowData {
//   id: number;
//   firstName: string | null;
//   lastName: string;
//   age: number | null;
//   status: "critical" | "atRisk" | "stable";
// }

// const rows: RowData[] = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 14, status: "critical" },
//   {
//     id: 2,
//     lastName: "Lannister",
//     firstName: "Cersei",
//     age: 31,
//     status: "atRisk",
//   },
//   {
//     id: 3,
//     lastName: "Lannister",
//     firstName: "Jaime",
//     age: 31,
//     status: "stable",
//   },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 11, status: "stable" },
//   {
//     id: 5,
//     lastName: "Targaryen",
//     firstName: "Daenerys",
//     age: null,
//     status: "atRisk",
//   },
//   {
//     id: 6,
//     lastName: "Melisandre",
//     firstName: null,
//     age: 150,
//     status: "critical",
//   },
//   {
//     id: 7,
//     lastName: "Clifford",
//     firstName: "Ferrara",
//     age: 44,
//     status: "stable",
//   },
//   {
//     id: 8,
//     lastName: "Frances",
//     firstName: "Rossini",
//     age: 36,
//     status: "atRisk",
//   },
//   {
//     id: 9,
//     lastName: "Roxie",
//     firstName: "Harvey",
//     age: 65,
//     status: "critical",
//   },
// ];

// const Page = () => {
//   const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);

//   const handleRowSelect = (id: string | number, checked: boolean) => {
//     setSelectedRowIds((prev) =>
//       checked ? [...prev, id] : prev.filter((rowId) => rowId !== id)
//     );
//   };

//   const handleSelectAll = (checked: boolean) => {
//     setSelectedRowIds(checked ? rows.map((row) => row.id) : []);
//   };

//   const handleActionClick = (row: RowData) => {
//     alert(`Clicked: ${row.firstName} ${row.lastName}`);
//   };

//   const columns: GridColDef<RowData>[] = [
//     CheckboxColumn({
//       field: "select",
//       headerName: "",
//       selectedRowIds,
//       onRowSelect: handleRowSelect,
//       onSelectAll: handleSelectAll,
//     }),
//     { field: "id", headerName: "ID", width: 90 },
//     {
//       field: "firstName",
//       headerName: "First name",
//       width: 150,
//       editable: true,
//     },
//     { field: "lastName", headerName: "Last name", width: 150, editable: true },
//     {
//       field: "age",
//       headerName: "Age",
//       type: "number",
//       width: 110,
//       editable: true,
//     },
//     {
//       field: "fullName",
//       headerName: "Full name",
//       description: "This column has a value getter and is not sortable.",
//       sortable: false,
//       width: 160,
//       valueGetter: (value, row) =>
//         `${row.firstName || ""} ${row.lastName || ""}`,
//     },
//     ActionColumn({
//       field: "view",
//       headerName: "Action Text",
//       variant: "text",
//       getLabel: (row) => "Open",
//       onClick: (row) => console.log("View", row),
//     }),

//     ActionColumn({
//       field: "actions",
//       headerName: "Action Icon",
//       variant: "icon",
//       getActions: (row) => [
//         {
//           icon: <EditIcon />,
//           onClick: () => console.log("Edit", row),
//           tooltip: "Edit",
//         },
//         {
//           icon: <DeleteIcon />,
//           onClick: () => console.log("Delete", row),
//           tooltip: "Delete",
//         },
//       ],
//     }),

//     ActionColumn({
//       field: "menu",
//       headerName: "Action Menu",
//       variant: "menu",
//       getActions: (row) => [
//         {
//           label: "Edit",
//           icon: <EditIcon />,
//           onClick: () => console.log("Edit", row),
//         },
//         {
//           label: "Delete",
//           icon: <DeleteIcon />,
//           onClick: () => console.log("Delete", row),
//         },
//       ],
//     }),
//     IconStatusTrackerColumn({
//       field: "status",
//       headerName: "Status",
//       getStatusDisplay: (value) => {
//         switch (value) {
//           case "critical":
//             return {
//               icon: <AccessAlarmIcon sx={{ color: "#D32F2F" }} />,
//               text: "Critical",
//             };
//           case "atRisk":
//             return {
//               icon: <WarningAmberIcon sx={{ color: "#FF9800" }} />,
//               text: "At Risk",
//             };
//           case "stable":
//           default:
//             return {
//               icon: <TaskAltIcon sx={{ color: "#2E7D32" }} />,
//               text: "Stable",
//             };
//         }
//       },
//     }),
//   ];

//   return (
//     <div style={{ height: "100vh", width: "100vw", backgroundColor: "white" }}>
//       <DataGridCommon rows={rows} columns={columns} />
//     </div>
//   );
// };

// export default Page;
