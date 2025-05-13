/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import DataGridCommon from "./components/DataGridCommon/DataGridCommon";
import { createIconStatusTrackerColumn } from "./components/DataGridCommon/DataGridComponents/DataGridColumns/IconStatusTrackerColumn";
import { createCheckboxColumn } from "./components/DataGridCommon/DataGridComponents/DataGridColumns/CheckboxColumn";
import { createActionTextColumn } from "./components/DataGridCommon/DataGridComponents/DataGridColumns/ActionColumnVariants/ActionTextColumn";
import { createActionMenuColumn } from "./components/DataGridCommon/DataGridComponents/DataGridColumns/ActionColumnVariants/ActionMenuColumn";
import { createActionIconColumn } from "./components/DataGridCommon/DataGridComponents/DataGridColumns/ActionColumnVariants/ActionIconColumn";
import type { GridColDef } from "@mui/x-data-grid";

import TaskAltIcon from "@mui/icons-material/TaskAlt";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";

interface RowData {
  id: number;
  firstName: string | null;
  lastName: string;
  age: number | null;
  status: "critical" | "atRisk" | "stable";
}

const rows: RowData[] = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14, status: "critical" },
  {
    id: 2,
    lastName: "Lannister",
    firstName: "Cersei",
    age: 31,
    status: "atRisk",
  },
  {
    id: 3,
    lastName: "Lannister",
    firstName: "Jaime",
    age: 31,
    status: "stable",
  },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11, status: "stable" },
  {
    id: 5,
    lastName: "Targaryen",
    firstName: "Daenerys",
    age: null,
    status: "atRisk",
  },
  {
    id: 6,
    lastName: "Melisandre",
    firstName: null,
    age: 150,
    status: "critical",
  },
  {
    id: 7,
    lastName: "Clifford",
    firstName: "Ferrara",
    age: 44,
    status: "stable",
  },
  {
    id: 8,
    lastName: "Frances",
    firstName: "Rossini",
    age: 36,
    status: "atRisk",
  },
  {
    id: 9,
    lastName: "Roxie",
    firstName: "Harvey",
    age: 65,
    status: "critical",
  },
];

const Page = () => {
  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);

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
    createCheckboxColumn({
      field: "select",
      headerName: "",
      selectedRowIds,
      onRowSelect: handleRowSelect,
      onSelectAll: handleSelectAll,
    }),
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    { field: "lastName", headerName: "Last name", width: 150, editable: true },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (value, row) =>
        `${row.firstName || ""} ${row.lastName || ""}`,
    },
    createActionTextColumn<RowData>({
      field: "action",
      headerName: "Action Text",
      getLabel: (row) => "View",
      onClick: handleActionClick,
    }),
    createActionIconColumn({
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
    createActionMenuColumn({
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
    createIconStatusTrackerColumn({
      field: "status",
      headerName: "Status",
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
  ];

  return (
    <div style={{ height: "100vh", width: "100vw", backgroundColor: "white" }}>
      <DataGridCommon rows={rows} columns={columns} />
    </div>
  );
};

export default Page;

// /* eslint-disable @typescript-eslint/no-unused-vars */
// import React, { useState } from "react";
// import DataGridCommon from "./components/DataGridCommon/DataGridCommon";
// import { createIconStatusTrackerColumn } from "./components/DataGridCommon/DataGridComponents/DataGridColumns/IconStatusTrackerColumn";
// import { createCheckboxColumn } from "./components/DataGridCommon/DataGridComponents/DataGridColumns/CheckboxColumn";
// import { createActionColumn } from "./components/DataGridCommon/DataGridComponents/DataGridColumns/ActionColumnVariants/ActionColumnCombined";
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
//     createCheckboxColumn({
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
//     createActionColumn({
//       field: "view",
//       headerName: "Action Text",
//       variant: "text",
//       getLabel: (row) => "Open",
//       onClick: (row) => console.log("View", row),
//     }),

//     createActionColumn({
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

//     createActionColumn({
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
//     createIconStatusTrackerColumn({
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
