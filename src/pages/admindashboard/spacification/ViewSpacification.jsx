import { Box, Modal } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockDataContacts } from "../data/mockData";
import Header from "../components/Header";
import { useTheme } from "@mui/material";
import Axios from 'axios';
import { useEffect, useState } from "react";
const ViewSpacifications = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [specification , setSpacification] = useState([]);

  const handleEdit = (row) => {
    // Open a modal dialog with the current row data
    const modal = new Modal(row);
    modal.open();
  };
  
  const handleDelete = (row) => {
    console.log(row);
    // Delete the current row from the table and the backend database
    // For example, you could use the following code:
  
    // axios.delete(`/api/contacts/${row.id}`).then(() => {
    //   // Update the table data
    //   const updatedTableRows = mockDataContacts.filter(contact => contact.id !== row.id);
    //   setMockDataContacts(updatedTableRows);
    // });
  };
  useEffect(() => {
    Axios.get('http://localhost:8000/api/specification/getall').then((response) => {
        setSpacification(response.data);
        console.log(specification);
       }).catch((error) => {
        console.log(error);
       })
}, []);
const getRowId = (row) => {
    return row._id;
  };
  const columns = [
    {
      field: "specification",
      headerName: "Specification",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
        field: "type",
        headerName: "Item Type",
        flex: 1,
        cellClassName: "name-column--cell",
      },
    {
      field: "edit",
      headerName: "Edit",
      renderCell: ({ row }) => {
        // Render the edit button here
        return <button onClick={() => handleEdit(row)} className="btn btn-primary mx-1 ">Edit</button>;
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      renderCell: ({ row }) => {
        // Render the delete button here
        return <button onClick={() => handleDelete(row)} className="btn btn-danger mx-1 ">Delete</button>;
      },
    },
  ];
  return (
    <Box m="20px">
      <Header
        title="VIEW SPECIFICATIONS"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
            rows={specification}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            getRowId={getRowId}
            onCellClick={(params) => {
              const row = params.row;

              if (params.field === "edit") {
                handleEdit(row);
              } else if (params.field === "delete") {
                handleDelete(row);
              }
            }}
          />
      </Box>
    </Box>
  );
};

export default ViewSpacifications;
