import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, MenuItem, Modal, Select, TextField, Typography, useMediaQuery } from "@mui/material";
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
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from "@mui/material/CircularProgress";
const PendingShopItem = () => {
  const [open, setOpen] = useState(false);
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
  const [loading, setLoading] = useState(true);
  const [isCancled, setIsCancled] = useState(false);
  const [openCancle, setOpenCancle] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [warehouseLoading, setWarehouseLoading] = useState(true);
  const [selectedCancleRow, setSelectedCancleRow] = useState(null);
  const [reload, setReload] = useState(false);
//   const handleEdit = (row) => {
//     navigate(`/edit_main_store_items`, { state: { rowData: row } });
//   };
  
  const handleDelete = (row) => {
    setIsCancled(true);
    Axios.delete(`/ToShopPending/undo/${row._id}`).then((response) => {
      setOpenCancle(false);
      console.log(response.data);
      console.log('Adding successfull');
      setIsCancled(false);
      setMessage(`Sale Cancled successfully!!!`);
      setReload(!reload);
     }).catch((error) => {
      setOpenCancle(true);
      console.log(error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage("An error occurred");
      }
      setIsCancled(false);
     })
  };
  const handleCancleClickOpen = (row) => {
    setOpenCancle(true);
    setSelectedCancleRow(row);
};
const handleCancleClose = () => {
  setOpenCancle(false);
  setSelectedCancleRow(null);
};
  const handleApprove = (selectedrow) => {
    setIsApproved(true);
    Axios.post(`/ToShopPending/approve/${selectedrow._id}`, {
        warehouseName: selectedrow.to,
        quantity: selectedrow.quantity,
       }).then((response) => {
        setOpen(false);
        console.log(response.data);
        setIsApproved(false);
        setMessage(`Sales Approved successfully!`);
        setReload(!reload);
       }).catch((error) => {
        setOpen(true);
        console.log(error);
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage("An error occurred");
        }
        setIsApproved(false);
       })
    }
  const handleClickOpen = (row) => {
            setOpen(true);
            setSelectedRow(row);
    Axios.get('/warehouse/getall').then((response) => {
        const filteredWarehouse = response.data.filter((warehouse) => warehouse.type === "Shop");
        setFilteredWarehouseList(filteredWarehouse);
        setWarehouseLoading(false);
        console.log('warehouse');
        console.log(filteredWarehouseList);
    }).catch((error) => {
        console.log(error);
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage("An error occurred");
        }
        setWarehouseLoading(false);
        setSelectedRow(null);
    })
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  useEffect(() => {
    Axios.get('/toshoppending/getall').then((response) => {
        setPendingList(response.data);
        setLoading(false);
       }).catch((error) => {
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage("An error occurred");
        }
        setLoading(false);
       })
}, [reload]);

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
        field: "expireDate",
        headerName: "Expire Date",
        flex: 1,
        cellClassName: "name-column--cell",
      },
      {
        field: "cashierName",
        headerName: "Cashier Name",
        flex: 1,
        cellClassName: "name-column--cell",
      },
      {
        field: "quantity",
        headerName: "Quantity",
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
        return <button onClick={() => handleCancleClickOpen(row)} className="btn btn-danger mx-1 ">Cancle</button>;
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
      Approve Sales
    </DialogTitle>
        <DialogTitle>
        </DialogTitle>
        <DialogContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="body1">
         Do yo want to approve this sale?
         </Typography>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
        <Button variant="outlined" color="inherit" onClick={() => handleClose()} >
            No
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleApprove(selectedRow)}  disabled ={isApproved}>
            {isApproved ? <CircularProgress color="secondary" size={30}/> : 'Yes'}
          </Button>
        </DialogActions>
      </Dialog>
            <Dialog
        fullScreen={fullScreen}
        open={openCancle}
        onClose={handleCancleClose}
        aria-labelledby="responsive-dialog-title"
        fullWidth
        
      >
        <DialogTitle id="responsive-dialog-title" style={{ textAlign: 'center' }}>
          Cancel Sale
        </DialogTitle>
        <DialogContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="body1">
            Are you sure you want to cancel this sale?
          </Typography>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
          <Button variant="outlined" color="inherit" onClick={handleCancleClose}>
            No
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleDelete(selectedCancleRow)}
            disabled={isCancled}
          >
            {isCancled ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              'Yes'
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    <Box m="20px">
      <Header
        title="PENDING SHOP ITEMS" 
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
            rows={pendingList}
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

             if(params.field === "delete") {
              handleCancleClickOpen(row);
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

export default PendingShopItem;
