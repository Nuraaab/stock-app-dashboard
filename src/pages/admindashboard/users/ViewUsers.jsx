import { Box, Modal } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { useTheme } from "@mui/material";
import Axios from 'axios';
import { useEffect, useState } from "react";
const ViewUsers = () => {
  const [itemList , setItemList] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [userList , setUserList] = useState([]);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const handleEdit = (row) => {
    // Open a modal dialog with the current row data
    const modal = new Modal(row);
    modal.open();
  };
  
  const handleDelete = (row) => {
    console.log(row);
  };
  useEffect(() => {
    Axios.post('/auth/refresh', {
      withCredentials: true,
    }).then((response) => {
      console.log('hi'+ response.data.adminName);
      setUserList(response.data);
        setLoading(false);
       }).catch((error) => {
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage("An error occurred");
        }
        setLoading(false);
       })
}, []);
const getRowId = (row) => {
    return row._id;
  };
  const columns = [
    {
      field: "adminName",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "profile",
      headerName: "Profile",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "type",
      headerName: "User Type",
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
        title="VIEW USERS"
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
            rows={userList}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            getRowId={getRowId}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                style: { color: "red" },
              },
            }}
            checkboxSelection
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

export default ViewUsers;
