import React from "react";
import DataGridCommon from "./components/DataGridCommon/DataGridCommon";
// import { useDemoData } from "@mui/x-data-grid-generator";
import type { GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "firstName", headerName: "First name", width: 150, editable: true },
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
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const App = () => {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <DataGridCommon rows={rows} columns={columns} />
    </div>
  );
};

export default App;

// import React from "react";
// import DataGridCommon from "./components/DataGridCommon/DataGridCommon";
// import { useDemoData } from "@mui/x-data-grid-generator";
// import Box from "@mui/material/Box";

// const App = () => {
//   const { data, loading } = useDemoData({
//     dataSet: "Commodity",
//     rowLength: 100,
//   });

//   if (loading) {
//     return <div>Loading demo data...</div>;
//   }

//   return (
//     <Box sx={{ height: "100vh" }}>
//       <DataGridCommon rows={data.rows} columns={data.columns} />
//     </Box>
//   );
// };

// export default App;
