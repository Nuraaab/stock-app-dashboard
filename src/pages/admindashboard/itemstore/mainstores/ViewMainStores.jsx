import { Alert, Box, Button,  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton,  MenuItem, Modal, Select, TextField, useMediaQuery } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../../theme";
import Header from "../../../../components/Header";
import { useTheme } from "@mui/material";
import Axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import { faL } from "@fortawesome/free-solid-svg-icons";
const ViewMainStores = () => {
  const [open, setOpen] = React.useState(false);
  const [openMove, setOpenMove] = useState(false);
  const [openAlert, setOpenAlert] = useState(true);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const colors = tokens(theme.palette.mode);
  const [mainStoreItems , setMainStoreItems] = useState([]);
  const navigate = useNavigate();
  const [custName, setCustName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [phone, setPhone] = useState('');
  const [creditDate, setCreditDate] = useState('');
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [selectedMoveRow, setSelectedMoveRow] = useState(null);
  const [warehouseNameList, setwarehouseNameList] = useState([]);
  const [warehouseName, setWarehouseName] = useState('');
  const [storeType, setStoreType] = useState('');
  const [transfer, setTransfer] = useState(false);
  const [credit, setCredit] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSelected, setIsSelected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saleLoading, setSaleLoading] = useState(false);
  const [moveLoading, setMoveLoading] = useState(false)
  const [initialMoveLoading, setInitialMoveLoading] = useState(false);
  const handleMove = (row) => {
    setMoveLoading(true);
    if(storeType === "Main Store"){
       Axios.post(`/mainstore/maintransaction/${row._id}`, {
          quantity: row.quantity,  
          warehouseName: warehouseName,
       }).then((response) => {
        setOpenMove(false);
        setMessage(`Item ${row.name} is succesfully moved to Main Store  ${warehouseName}`);
        setMoveLoading(false);
        window.location.reload();
       }).catch((error) => {
        setOpenMove(true);
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage("An error occurred");
        }
        setMoveLoading(false);
       })
    }else if(storeType === "Sub Store"){
        Axios.post(`/mainstore/transaction/${row._id}`, {
          quantity: row.quantity,  
          warehouseName: warehouseName,
        }).then((response) => {
          setOpenMove(false);
          setMessage(`Item ${row.name} is succesfully moved to Sub Store ${warehouseName}`);
          setMoveLoading(false);
          window.location.reload();
        }).catch((error) => {
          if (error.response && error.response.data) {
            setErrorMessage(error.response.data);
          } else {
            setErrorMessage("An error occurred");
          }
          setMoveLoading(false);
          setOpenMove(true);
        })
    }else{
      setErrorMessage("Error happening!!");
      setMoveLoading(false);
    }
  };
  
  const handleDelete = (row) => {
    if(window.confirm(`Are you sure you want to delete ${row.name}?`)){
      Axios.delete(`/mainstore/delete/${row._id}`).then((response) => {
        setMessage("Sale Deleted successfully!");
        window.location.reload();
     }).catch((error) => {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage("An error occurred");
      }
})
    }
  };
  const handleSale = (selectedrow) => {
    setSaleLoading(true);
    if(transactionType ==='credit'){
      Axios.post(`/mainstore/holesall/${selectedrow._id}`, {
        quantity: quantity,
        customerName: custName,
        paymentMethod: transactionType,
      }).then((response) => {
        setMessage("Sale Adedded successfully!! " + response.data);
        Axios.post('/credit/add', {
          amount: price,
          customerName: custName,
          itemCode: selectedrow.itemCode,
          phone: phone,
          warehouseName: selectedrow.warehouseName,
          paymentDate: creditDate
        }).then((response) => {
          window.location.reload();
          setMessage("Credit Added succesfully!!");
          setSaleLoading(false);
          setOpen(false);
        }).catch((error) => {
          if (error.response && error.response.data) {
            setErrorMessage(error.response.data);
          } else {
            setErrorMessage("An error occurred");
          }
          setSaleLoading(false);
        })
      }).catch((error) => {
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage("An error occurred");
        }
        setSaleLoading(false);
      })
    }else if(transactionType ==='transfer'){
      Axios.post(`/mainstore/holesall/${selectedrow._id}`, {
        quantity: quantity,
        customerName: custName,
        paymentMethod: `${transactionType}(Bank Name: ${bankName}, Account Number: ${accountNumber})`,
      }).then((response) => {
        window.location.reload();
        setOpen(false);
        setMessage("Sale Adedded successfully!! ");
      }).catch((error) => {
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage("An error occurred");
        }
      })
    }else{
      Axios.post(`/mainstore/holesall/${selectedrow._id}`, {
        quantity: quantity,
        customerName: custName,
        paymentMethod: transactionType,
      }).then((response) => {
        window.location.reload();
        setOpen(false);
        setMessage("Sale Adedded successfully!! " + response.data);
      }).catch((error) => {
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage("An error occurred");
        }
      })
    }
    }
  const handleClickOpen = (row) => {
    setOpen(true);
    setSelectedRow(row);
  };
  const handleMoveClickOpen = (row) => {
    setOpenMove(true);
    setSelectedMoveRow(row);
  };
  const handleMoveClose = () => {
    setOpenMove(false);
    setSelectedMoveRow(null);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };
  const handleStoreType = (value) => {
    setInitialMoveLoading(true);
   setStoreType(value);
   if(value === ''){
   setErrorMessage("The selected store type is invalid!!");
   setIsSelected(false);
   setInitialMoveLoading(false);
  }else{
    Axios.get('/warehouse/getall').then((response) => {
      const filteredWarehouse = response.data.filter((warehouse) => warehouse.type === value);
  
  if (filteredWarehouse.length === 0) {
    setErrorMessage("No warehouses found for the selected Store Type!!");
    setIsSelected(false);
    setInitialMoveLoading(false);
  } else {
    setwarehouseNameList(filteredWarehouse);
    setIsSelected(true);
    setInitialMoveLoading(false);
  }
    }).catch((error) => {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage("An error occurred");
      }
      setInitialMoveLoading(false);
      setIsSelected(false);
    })
  }
  }
  const handleTransactionType = (value) => {
    console.log('value'+ value);
        if(value === "transfer"){
          setTransfer(true);
          setCredit(false);
          setTransactionType(value);
          console.log('from transfer');
          console.log(transactionType);
        }else if(value === 'credit'){
          setCredit(true);
          setTransfer(false);
          setTransactionType(value);
          console.log('from credit');
          console.log(transactionType);
        }else{
          setTransactionType(value);
          setTransfer(false);
          setCredit(false);
          console.log('from cash');
          console.log(transactionType);
        }
  }
  useEffect(() => {
    Axios.get('/mainstore/getall').then((response) => {
        setMainStoreItems(response.data);
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
        field: "expireDate",
        headerName: "Expire Date",
        flex: 1,
        cellClassName: "name-column--cell",
      },
      {
        field: "warehouseName",
        headerName: "Warehouse Name",
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
      field: "move",
      headerName: "Move Item",
      renderCell: ({ row }) => {
        // Render the edit button here
        return <button onClick={() => handleMoveClickOpen(row)} className="btn btn-primary mx-1 ">Move</button>;
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
    {
        field: "sale",
        headerName: "Sale",
        renderCell: ({ row }) => {
          // Render the delete button here
          return <button onClick={()=>handleClickOpen(row)} className="btn btn-primary mx-1 ">Sale</button>;
        },
      },
  ];
  return (
    <>
     <div>
    
       <Dialog
        fullScreen={fullScreen}
        open={openMove}
        onClose={handleMoveClose}
        aria-labelledby="responsive-dialog-title"
        fullWidth
      >
       <DialogTitle
      id="responsive-dialog-title"
      style={{ textAlign: 'center' }}
    >
      Fill the information below
    </DialogTitle>
        <DialogTitle>
        {isSelected || errorMessage && <Box sx={{ width: '100%' }}>
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
        {initialMoveLoading && <LinearProgress color="secondary"/>}
     </DialogTitle>
    <DialogContent>
    <Select
            label="Move To Where"
            value={storeType}
            onChange={(e) => handleStoreType(e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value="">Select store you want to move the item </MenuItem>
            <MenuItem value="Main Store">To Main Store</MenuItem>
            <MenuItem value="Sub Store">To Sub Store</MenuItem>
          </Select>

         { isSelected && <Select
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
                 warehouseNameList.map((warehouse) => (
                    <MenuItem key={warehouse.id} value={warehouse.name}>{warehouse.name}</MenuItem>
                  ))
                }
           </Select>}
    </DialogContent>
    <DialogActions>
          <Button style={{ color: 'white' }} onClick={handleMoveClose}>
            Cancel
          </Button>
          <Button style={{ color: 'white' }} onClick={() => handleMove(selectedMoveRow)}  disabled ={moveLoading}>
            {moveLoading ? <CircularProgress color="secondary" size={24}/> :  'Move'}
          </Button>
        </DialogActions>
 </Dialog>


     <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
       <DialogTitle
      id="responsive-dialog-title"
      style={{ textAlign: 'center' }}
    >
      Fill the information below
    </DialogTitle>
        <DialogTitle>
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
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Customer Name"
            value={custName}
            onChange={(e) => setCustName(e.target.value)}
            fullWidth
            margin="normal"
          />
         {!credit && <TextField
            label="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            fullWidth
            margin="normal"
          />}
           <TextField
            label="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            margin="normal"
          />
           <Select
            label="Transaction Type"
            value={transactionType}
            onChange={(e) => handleTransactionType(e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value="">Select Transaction Type</MenuItem>
            <MenuItem value="transfer">Transfer</MenuItem>
            <MenuItem value="cash">Cash</MenuItem>
            <MenuItem value="credit">Credit</MenuItem>
          </Select>
          {transfer &&  <Select
            label="Bank Name"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value="">Select Bank Name</MenuItem>
            <MenuItem value="cbe">CBE</MenuItem>
            <MenuItem value="awash">Awash</MenuItem>
            <MenuItem value="abay">Abay</MenuItem>
          </Select>
          }
          { transfer &&  <TextField
            label="Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            fullWidth
            margin="normal"
          />}
          {credit && <TextField
            label="phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            margin="normal"
          />}
          {
            credit && <TextField
            label="Payment Date"
            type="date"
            value={creditDate}
            onChange={(e) => setCreditDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            InputProps={{ inputProps: { min: "yyyy-mm-dd" } }}
          />
          }
        </DialogContent>
        <DialogActions>
          <Button style={{ color: 'white' }} onClick={handleClose}>
            Cancel
          </Button>
          <Button style={{ color: 'white' }} onClick={() => handleSale(selectedRow)}  disabled ={saleLoading}>
            {saleLoading ? <CircularProgress color="secondary" size={24}/> : 'Sale'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    <Box m="20px">
      <Header
        title="VIEW MAIN STORE ITEMS" 
      />
      {loading && <LinearProgress color="secondary" />}
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
        severity="success"
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
      {<DataGrid
            rows={mainStoreItems}
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

              if (params.field === "move") {
                handleMoveClickOpen(row);
              } else if (params.field === "delete") {
                handleDelete(row);
              } else if (params.field === "sale") {
                handleClickOpen(row);
              }
            }}
          />}
      </Box>
    </Box>
    </>
  );
};

export default ViewMainStores;
