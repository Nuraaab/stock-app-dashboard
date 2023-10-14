import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, MenuItem, Modal, Select, TextField, useMediaQuery } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { useTheme } from "@mui/material";
import Axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
const Pending = () => {
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = useState(true);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const colors = tokens(theme.palette.mode);
  const [pendingList , setPendingList] = useState([]);
  const [warehouseList, setWarehouseList] = useState([]);
  const [warehouseName, setWarehouseName] = useState('');
  const [filteredWarehouseList, setFilteredWarehouseList] = useState([]);
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
//   const handleEdit = (row) => {
//     navigate(`/edit_main_store_items`, { state: { rowData: row } });
//   };
  
  const handleDelete = (row) => {
    if(window.confirm('Are you sure you want to delete this sale?')){
      Axios.delete(`/pending/delete/${row._id}`).then((response) => {
        setMessage("Sale Deleted successfully!");
        window.location.reload();
     }).catch((error) => {
   setErrorMessage(error.response.data);
})
    }
  };
  const handleApprove = (selectedrow) => {
    Axios.post(`/pending/approve/${selectedrow._id}`, {
        warehouseName: warehouseName,
       }).then((response) => {
        setOpen(false);
        console.log(response.data);
        console.log('Adding successfull');
        setMessage(`Adding ${response.data.name} is successfull!`);
        navigate('/view_main_store_items');
       }).catch((error) => {
        setOpen(true);
        console.log(error);
        setErrorMessage(error.response.data);
       })
    }
  const handleClickOpen = (row) => {
    Axios.get('/warehouse/getall').then((response) => {
        const filteredWarehouse = response.data.filter((warehouse) => warehouse.type === "Main Store");
        setFilteredWarehouseList(filteredWarehouse);
        console.log('warehouse');
        console.log(filteredWarehouseList);
            setOpen(true);
            setSelectedRow(row);
    }).catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data);
        setSelectedRow(null);
    })
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  useEffect(() => {
    Axios.get('/pending/getall').then((response) => {
        setPendingList(response.data);
       }).catch((error) => {
        console.log(error);
       })
}, []);
const getRowId = (row) => {
    return row._id;
  };
  const columns = [
    {
        field: "company",
        headerName: "Company Name",
        flex: 1,
        cellClassName: "name-column--cell",
      },
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
        field: "expireDate",
        headerName: "Expire Date",
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
    //     // Render the edit button here
    //     return <button onClick={() => handleEdit(row)} className="btn btn-primary mx-1 ">Edit</button>;
    //   },
    // },
    {
      field: "delete",
      headerName: "Delete",
      renderCell: ({ row }) => {
        // Render the delete button here
        return <button onClick={() => handleDelete(row)} className="btn btn-danger mx-1 ">Delete</button>;
      },
    },
    {
        field: "approve",
        headerName: "Approve",
        renderCell: ({ row }) => {
          // Render the delete button here
          return <button onClick={()=>handleClickOpen(row)} className="btn btn-success mx-1">Approve</button>;
        },
      },
  ];
  return (
    <>
     <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open responsive dialog
      </Button> */}
     <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        // maxWidth="md" // Set the desired width here
        fullWidth
      >
       <DialogTitle
      id="responsive-dialog-title"
      style={{ textAlign: 'center' }}
    >
      Fill the information below
    </DialogTitle>
        <DialogTitle>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </DialogTitle>
        <DialogContent>
        <Select
               fullWidth
               variant="outlined"
               sx={{ gridColumn: "span 4" ,color: "white"}}
               value={warehouseName}
               name="warehouse"
               label="Warehouse Name"
               onChange={(e) => setWarehouseName(e.target.value)}
              >
                <MenuItem value=''>Select Warehouse Name</MenuItem>
                {
                 filteredWarehouseList.map((warehouse) => (
                    <MenuItem key={warehouse.id} value={warehouse.name}>{warehouse.name}</MenuItem>
                  ))
                }
                
              </Select>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: 'white' }} onClick={handleClose}>
            Cancel
          </Button>
          <Button style={{ color: 'white' }} onClick={() => handleApprove(selectedRow)} >
            Sale
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    <Box m="20px">
      <Header
        title="VIEW MAIN STORE ITEMS" 
      />
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
            rows={pendingList}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            getRowId={getRowId}
            onCellClick={(params) => {
              const row = params.row;

             if(params.field === "delete") {
                handleDelete(row);
              } else if (params.field === "approve") {
                handleClickOpen(row);
              }
            }}
          />
      </Box>
    </Box>
    </>
  );
};

export default Pending;
