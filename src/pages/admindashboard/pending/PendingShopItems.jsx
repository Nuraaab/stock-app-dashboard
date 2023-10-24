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
import Message from "../../../components/admincomponents/Message";
import { styled } from '@mui/material/styles';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiDialog-paper': {
    width: '100%', // Adjust the width as needed
  },
}));
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
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [reload, setReload] = useState(false);
//   const handleEdit = (row) => {
//     navigate(`/edit_main_store_items`, { state: { rowData: row } });
//   };
  
  const handleDelete = (row) => {
    setIsCancled(true);
    Axios.delete(`/ToShopPending/undo/${row._id}`).then((response) => {
      setOpenCancle(false);
      console.log(response.data);
      setIsCancled(false);
      setMessage(`Item Movement  Cancled successfully!!!`);
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
      field: "itemCode",
      headerName: "Item Code",
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
     <BootstrapDialog
        open={open}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        // maxWidth="md" // Set the desired width here
        fullWidth
      >
       <DialogTitle
      id="customized-dialog-title"
    >
      Approve Moved Items
    </DialogTitle>
    <IconButton
        aria-label="close"
        onClick={() => handleClose()}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
        <DialogContent dividers style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="body1">
         Do yo want to approve this movement?
         </Typography>
        </DialogContent>
        <DialogActions dividers style={{ justifyContent: 'center' }}>
        <Button variant="outlined" color="inherit" onClick={() => handleClose()} >
            No
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleApprove(selectedRow)}  disabled ={isApproved}>
            {isApproved ? <CircularProgress color="secondary" size={30}/> : 'Yes'}
          </Button>
        </DialogActions>
      </BootstrapDialog>
            <BootstrapDialog
        open={openCancle}
        onClose={handleCancleClose}
        aria-labelledby="customized-dialog-title"
        fullWidth
        
      >
        <DialogTitle id="customized-dialog-title" >
          Cancel Item Movement
        </DialogTitle>
        <IconButton
        aria-label="close"
        onClick={handleCancleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
        <DialogContent dividers style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="body1">
            Are you sure you want to cancel this movement?
          </Typography>
        </DialogContent>
        <DialogActions dividers style={{ justifyContent: 'center' }}>
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
      </BootstrapDialog>
    </div>
    <Box padding={0}
    margin={0}>
      <Header
        title="PENDING SHOP ITEMS" 
      />
      <Message message={message} openAlert={openAlert}  setOpenAlert={setOpenAlert} severity='success'/>
      <Message message={errorMessage} openAlert={openAlert} setOpenAlert={setOpenAlert} severity='error'/>
    {loading && <LinearProgress color="secondary" />}
      <Box
        margin={0}
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
            disableColumnFilter = {isMobile}
          />
      </Box>
    </Box>
    </>
  );
};

export default PendingShopItem;
