import { Alert, Box, Button,  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormHelperText, IconButton,  InputLabel,  MenuItem, Modal, Select, TextField, Typography, useMediaQuery } from "@mui/material";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
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
import Message from "../../../../components/admincomponents/Message";
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
  const [quantityMove, setQuantityMove] = useState('');
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
  const [openCancle, setOpenCancle] = useState(false);
  const [selectedCancleRow, setSelectedCancleRow] = useState(null);
  const [isCancled, setIsCancled] = useState(false);
  const [reload, setReload] = useState(false);
  const handleMove = (row) => {
    setMoveLoading(true);
    if(storeType === "Main Store"){
       Axios.post(`/mainstore/maintransaction/${row._id}`, {
          quantity: quantityMove,  
          warehouseName: warehouseName,
       }).then((response) => {
        setMessage(`${quantityMove}  ${row.name} moved  successfully  at Main Store to ${warehouseName}`);
        setOpenMove(false);
        setMoveLoading(false);
        setStoreType('');
        setWarehouseName('');
        setQuantityMove('');
        setIsSelected(false);
        setReload(!reload);
       }).catch((error) => {
        setOpenMove(true);
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage("An error occurredf" + error);
        }
        setMoveLoading(false);
       })
    }else if(storeType === "Sub Store"){
        Axios.post(`/mainstore/transaction/${row._id}`, {
          quantity: quantityMove,  
          warehouseName: warehouseName,
        }).then((response) => {
          setMessage(`${quantityMove}  ${row.name} moved  successfully at Main Store to ${warehouseName}` );
          setMoveLoading(false);
          setOpenMove(false);
          setStoreType('');
          setWarehouseName('');
          setQuantityMove('');
          setIsSelected(false);
          setReload(!reload);
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
  const resetForm = () => {
    setStoreType('');
    setWarehouseName('');
    setQuantityMove('');
    setIsSelected(false);
    setErrorMessage('');
  };
  const saleResetForm = () => {
    setCustName('');
    setPrice('');
    setQuantity('');
    setTransactionType('');
    setErrorMessage('');
    setIsSelected(false);
    setTransfer(false);
    setCredit(false);
  };
  const handleDelete = (row) => {
     setIsCancled(true);
      Axios.delete(`/mainstore/delete/${row._id}`).then((response) => {
        setMessage("Sale Deleted successfully!");
        setIsCancled(false);
        setOpenCancle(false);
        setReload(!reload);
     }).catch((error) => {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage("An error occurred");
      }
      setIsCancled(false);
        setOpenCancle(true);
})
  };
  const handleSale = (selectedrow) => {
    setSaleLoading(true);
    if(transactionType ==='credit'){
      Axios.post(`/mainstore/holesall/${selectedrow._id}`, {
        quantity: quantity,
        customerName: custName,
        paymentMethod: transactionType,
      }).then((response) => {
        setReload(!reload);
        Axios.post('/credit/add', {
          amount: price,
          customerName: custName,
          itemCode: selectedrow.itemCode,
          phone: phone,
          warehouseName: selectedrow.warehouseName,
          paymentDate: creditDate
        }).then((response) => {
          setMessage(`${quantity}  ${selectedrow.name} solled with credit successfully!!` );
          setSaleLoading(false);
          setOpen(false);
          setCustName('');
          setPrice('');
          setQuantity('');
          setTransactionType('');
          setErrorMessage('');
          setTransfer(false);
          setCredit(false);
          setReload(!reload);
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
        setOpen(false);
        setMessage(`${quantity}  ${selectedrow.name} solled successfully!!` );
        setSaleLoading(false);
        setCustName('');
        setPrice('');
        setQuantity('');
        setTransactionType('');
        setErrorMessage('');
        setTransfer(false);
        setCredit(false);
        setReload(!reload);
      }).catch((error) => {
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage("An error occurred");
        }
        setSaleLoading(false);
      })
    }else{
      Axios.post(`/mainstore/holesall/${selectedrow._id}`, {
        quantity: quantity,
        customerName: custName,
        paymentMethod: transactionType,
      }).then((response) => {
        setMessage(`${quantity}  ${selectedrow.name} solled successfully!!` );
        setSaleLoading(false);
        setOpen(false);
        setCustName('');
        setPrice('');
        setQuantity('');
        setTransactionType('');
        setErrorMessage('');
        setTransfer(false);
        setCredit(false);
        setReload(!reload);
      }).catch((error) => {
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage("An error occurred");
        }
        setSaleLoading(false);
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
    setReload(!reload);
    setOpenMove(false);
    setSelectedMoveRow(null);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };
  const handleStoreType = (value, row) => {
    setInitialMoveLoading(true);
   setStoreType(value);
   if(value === ''){
   setErrorMessage("The selected store type is invalid!!");
   setIsSelected(false);
   setInitialMoveLoading(false);
  }else{
    Axios.get('/warehouse/getall').then((response) => {
      const filteredWarehouse = response.data.filter((warehouse) => warehouse.type === value && warehouse.name !== row.warehouseName);
  
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
  const handleCancleClose = () => {
    setOpenCancle(false);
    setSelectedCancleRow(null);
  };
  const handleCancleClickOpen = (row) => {
    setOpenCancle(true);
    setSelectedCancleRow(row);
};
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
}, [reload]);
const getRowId = (row) => {
    return row._id;
  };
  const columns = [
 
    {
      field: "name",
      headerName: "Item Name",
      flex: 1,
      width: 160,
    },
    {
        field: "itemCode",
        headerName: "Item Code",
        flex: 1,
      },
      {
        field: "specification",
        headerName: "Item Specification",
        flex: 1,
      },
      {
        field: "type",
        headerName: "Item Type",
        flex: 1,
      },
      {
        field: "expireDate",
        headerName: "Expire Date",
        flex: 1,
      },
      {
        field: "warehouseName",
        headerName: "Warehouse Name",
        flex: 1,
      },
      {
        field: "quantity",
        headerName: "Quantity",
        flex: 1,
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
        return <button onClick={() => handleCancleClickOpen(row)} className="btn btn-danger mx-1 ">Delete</button>;
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
      <Message message={errorMessage} openAlert={openAlert} setOpenAlert={setOpenAlert} severity='error'/>
        {initialMoveLoading && <LinearProgress color="secondary"/>}
     </DialogTitle>
    <DialogContent>
    <FormControl
          fullWidth
          sx={{gridColumn: "span 4" }}>
                <InputLabel id="demo-simple-select-helper-label">Select store you want to move the item</InputLabel>
    <Select
    sx={{
      marginBottom: '5px'
    }} 
            required
            label="Move To Where"
            value={storeType}
            onChange={(e) => handleStoreType(e.target.value, selectedMoveRow)}
            fullWidth
            margin="normal"
          >
            <MenuItem value="Main Store">To Main Store</MenuItem>
            <MenuItem value="Sub Store">To Sub Store</MenuItem>
          </Select>
      </FormControl>
         { isSelected && 
         <FormControl
          fullWidth
          sx={{gridColumn: "span 4" }}>
                <InputLabel id="demo-simple-select-helper-label">Select Warehouse Name</InputLabel>
         <Select
              required
               fullWidth
               variant="outlined"
               sx={{ gridColumn: "span 12" ,color: "white", marginBottom: '5px'}}
               value={warehouseName}
               name="warehouse"
               label="Warehouse Name"
               onChange={(e) => setWarehouseName(e.target.value)}
              >
                {
                 warehouseNameList.map((warehouse) => (
                    <MenuItem key={warehouse.id} value={warehouse.name}>{warehouse.name}</MenuItem>
                  ))
                }
           </Select>
           </FormControl>
           }

           {
            isSelected && <TextField
            sx={{
              marginBottom: '5px'
            }}
            required
            fullWidth
            variant="outlined"
            type="number"
            label="Quantity"
            value={quantityMove}
            name="quantity"
            onChange={(e) => setQuantityMove(e.target.value)}
          />
           }
    </DialogContent>
    <DialogActions>
          <Button style={{ color: 'white' }} onClick={() => { handleMoveClose(); resetForm(); }}>
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
        <Message message={errorMessage} openAlert={openAlert} setOpenAlert={setOpenAlert} severity='error'/>
        </DialogTitle>
        <DialogContent>
          <TextField
            required
            label="Customer Name"
            value={custName}
            onChange={(e) => setCustName(e.target.value)}
            fullWidth
            margin="normal"
          />
       <TextField
            required
            label="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            fullWidth
            type="number"
            margin="normal"
          />
           <TextField
            required
            label="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            margin="normal"
          />
          <FormControl
          fullWidth
          sx={{gridColumn: "span 4" }}>
                <InputLabel id="demo-simple-select-helper-label">Select Transaction Type</InputLabel>
           <Select
            required
            label="Transaction Type"
            value={transactionType}
            onChange={(e) => handleTransactionType(e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value="transfer">Transfer</MenuItem>
            <MenuItem value="cash">Cash</MenuItem>
            <MenuItem value="credit">Credit</MenuItem>
          </Select>
          </FormControl>
          {transfer && 
          <FormControl
          fullWidth
          sx={{gridColumn: "span 4" }}>
                <InputLabel id="demo-simple-select-helper-label">Select Bank Name</InputLabel>
          <Select
            required
            label="Bank Name"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value="cbe">CBE</MenuItem>
            <MenuItem value="awash">Awash</MenuItem>
            <MenuItem value="abay">Abay</MenuItem>
          </Select>
          </FormControl>
          }
          { transfer &&  <TextField
          required
            label="Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            fullWidth
            margin="normal"
          />}
          {credit && <TextField
          required
            label="phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            margin="normal"
          />}
          {
            credit && <TextField
            required
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
          <Button style={{ color: 'white' }} onClick={() => {handleClose(); saleResetForm()}}>
            Cancel
          </Button>
          <Button style={{ color: 'white' }} onClick={() => handleSale(selectedRow)}  disabled ={saleLoading}>
            {saleLoading ? <CircularProgress color="secondary" size={24}/> : 'Sale'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullScreen={fullScreen}
        open={openCancle}
        onClose={handleCancleClose}
        aria-labelledby="responsive-dialog-title"
        // maxWidth="md" // Set the desired width here
        fullWidth
      >
      <DialogTitle id="delete-confirmation-dialog-title" style={{ textAlign: 'center' }}>Confirm Delete</DialogTitle>
        <DialogTitle>
        </DialogTitle>
        <DialogContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="body1">
            Are you sure you want to delete this item?
          </Typography>
        </DialogContent>
        <DialogActions  style={{ justifyContent: 'center' }}>
        <Button variant="outlined" color="inherit" onClick={() => handleCancleClose()} >
            No
          </Button>
          <Button  variant="contained"
            color="primary" onClick={() => handleDelete(selectedCancleRow)}  disabled ={isCancled}>
            {isCancled ? <CircularProgress color="secondary" size={30}/> : 'Yes'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    <Box m="20px">
      <Header
        title="MAIN STORE ITEMS" 
      />
      {loading && <LinearProgress color="secondary" />}
      <Message message={message} openAlert={openAlert}  setOpenAlert={setOpenAlert} severity='success'/>
      <Message message={errorMessage} openAlert={openAlert} setOpenAlert={setOpenAlert} severity='error'/>
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
      {
        <div style={{ height: 400, width: '100%' }}>
        <DataGrid
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
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            onCellClick={(params) => {
              const row = params.row;

              if (params.field === "move") {
                handleMoveClickOpen(row);
              } else if (params.field === "delete") {
                handleCancleClickOpen(row);
              } else if (params.field === "sale") {
                handleClickOpen(row);
              }
            }}
          />
          </div>
          }
      </Box>
    </Box>
    </>
  );
};

export default ViewMainStores;
