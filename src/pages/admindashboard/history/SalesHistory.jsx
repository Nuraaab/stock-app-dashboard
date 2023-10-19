import { Alert, Box, IconButton, Modal } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import { useEffect, useState } from "react";
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import LinearProgress from '@mui/material/LinearProgress';
const SalesHistory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [salesHistoryList , setSalesHistory] = useState([]);
  const [openAlert, setOpenAlert] = useState(true);
  const navigate = useNavigate();
//   const handleEdit = (row) => {
//     navigate(`/edit_spacification`, { state: { rowData: row } });
//   };
  
  const handleDelete = (row) => {
    console.log(row);
  };
  useEffect(() => {
    Axios.get('/salleshistory/getall').then((response) => {
        setSalesHistory(response.data);
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
      field: "name",
      headerName: "Item Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
        field: "itemCode",
        headerName: "Item Code",
        flex: 1,
        cellClassName: "name-column--cell",
      },
      {
        field: "specification",
        headerName: "Item Specification",
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
        field: "from",
        headerName: "From",
        flex: 1,
        cellClassName: "name-column--cell",
      },
      {
        field: "to",
        headerName: "To",
        flex: 1,
        cellClassName: "name-column--cell",
      },
      {
        field: "paymentMethod",
        headerName: "Payment Method",
        flex: 1,
        cellClassName: "name-column--cell",
      },
      {
        field: "quantity",
        headerName: "Quantity",
        flex: 1,
        cellClassName: "name-column--cell",
      },
    // {
    //   field: "edit",
    //   headerName: "Edit",
    //   renderCell: ({ row }) => {
    //     return <button onClick={() => handleEdit(row)} className="btn btn-primary mx-1 ">Edit</button>;
    //   },
    // },
    // {
    //   field: "delete",
    //   headerName: "Delete",
    //   renderCell: ({ row }) => {
    //     return <button onClick={() => handleDelete(row)} className="btn btn-danger mx-1 ">Delete</button>;
    //   },
    // },
  ];
  return (
    <Box m="20px">
      <Header
        title="VIEW SALES HISTORY"
      />
        {errorMessage && <Box sx={{ width: '100%' }}>
      <Collapse in={openAlert}>
        <Alert
        severity="error"
          action={
            <IconButton
              aria-label="close"
              color="warning"
              size="small"
              onClick={() => {
                setOpenAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {errorMessage}
        </Alert>
      </Collapse>
    </Box>}
      {message && <Box sx={{ width: '100%' }}>
      <Collapse in={openAlert}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      </Collapse>
    </Box>}
    {loading && <LinearProgress color="secondary" />}
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
            rows={salesHistoryList}
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
              if (params.field === "delete") {
                handleDelete(row);
              }
            }}
          />
      </Box>
    </Box>
  );
};

export default SalesHistory;
