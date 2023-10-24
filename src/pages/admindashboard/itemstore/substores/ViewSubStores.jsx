import { Alert, Box, Button,  Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Modal, Select, TextField, Typography, useMediaQuery } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../../theme";
import Header from "../../../../components/Header";
import { useTheme } from "@mui/material";
import Axios from 'axios';
import { useEffect, useState } from "react";
import * as React from 'react';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from "@mui/material/CircularProgress";
import Message from "../../../../components/admincomponents/Message";
const ViewSubStoreItems = () => {
  const [open, setOpen] = React.useState(false);
  const [openMove, setOpenMove] = useState(false);
  const [openAlert, setOpenAlert] = useState(true);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const colors = tokens(theme.palette.mode);
  const [subStoreItems , setSubStoreItems] = useState([]);
  const [custName, setCustName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [quantityMove, setQuantityMove] = useState('');
  const [price, setPrice] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [phone, setPhone] = useState('');
  const [creditDate, setCreditDate] = useState('');
  const [credit, setCredit] = useState(false);
  const [transfer, setTransfer] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedMoveRow, setSelectedMoveRow] = useState(null);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [warehouseNameList, setwarehouseNameList] = useState([]);
  const [warehouseName, setWarehouseName] = useState('');
  const [storeType, setStoreType] = useState('');
  const [isSelected, setIsSelected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSaled, setIsSaled] = useState(false);
  const [isMoved, setIsMoved] = useState(false);
  const [isMoveLoad, setIsMoveLoad] = useState(false);
  const [openCancle, setOpenCancle] = useState(false);
  const [selectedCancleRow, setSelectedCancleRow] = useState(null);
  const [isCancled, setIsCancled] = useState(false);
  const [reload, setReload] = useState(false);
  const handleDelete = (row) => {
       setIsCancled(true);
      Axios.delete(`/Substore/delete/${row._id}`).then((response) => {
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
    setIsSaled(true);
    if(transactionType ==='credit'){
      Axios.post(`/Substore/holesall/${selectedrow._id}`, {
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
          setIsSaled(false);
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
          setIsSaled(false);
        })
      }).catch((error) => {
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage("An error occurred");
        }
        setIsSaled(false);
      })
    }else if(transactionType ==='transfer'){
      Axios.post(`/Substore/holesall/${selectedrow._id}`, {
        quantity: quantity,
        customerName: custName,
        paymentMethod: `${transactionType}(Bank Name: ${bankName}, Account Number: ${accountNumber})`,
      }).then((response) => {
        setOpen(false);
        setIsSaled(false);
        setMessage(`${quantity}  ${selectedrow.name} solled successfully!!` );
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
        setIsSaled(false);
      })
    }else{
      Axios.post(`/Substore/holesall/${selectedrow._id}`, {
        quantity: quantity,
        customerName: custName,
        paymentMethod: transactionType,
      }).then((response) => {
        setOpen(false);
        setIsSaled(false);
        setMessage(`${quantity}  ${selectedrow.name} solled successfully!!` );
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
        setIsSaled(false);
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
    setIsSelected(false);
    setErrorMessage('');
    setTransfer(false);
    setCredit(false);
  };
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
  const handleMove = (row) => {
    setIsMoved(true);
    if(storeType === "Sub Store"){
       Axios.post(`/Substore/subtransaction/${row._id}`, {
          quantity: quantityMove,  
          warehouseName: warehouseName,
       }).then((response) => {
        setOpenMove(false);
        setMessage(`${quantityMove} ${row.name} is succesfully moved at Sub Store to  ${warehouseName}`);
        setIsMoved(false);
        setReload(!reload);
       }).catch((error) => {
        setOpenMove(true);
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage("An error occurred");
        }
        setIsMoved(false);
       })
    }else if(storeType === "Shop"){
        Axios.post(`/Substore/transaction/${row._id}`, {
          quantity: quantityMove,  
          warehouseName: warehouseName,
        }).then((response) => {
          setOpenMove(false);
          setMessage(`${quantityMove} ${row.name} is succesfully moved at Shop to ${warehouseName}`);
          setIsMoved(false);
          setReload(!reload);
        }).catch((error) => {
          if (error.response && error.response.data) {
            setErrorMessage(error.response.data);
          } else {
            setErrorMessage("An error occurred");
          }
          setIsMoved(false);
          setOpenMove(true);
        })
    }else{
      setErrorMessage("Error happening!!");
      setIsMoved(false);
    }
  };
  const handleStoreType = (value, row) => {
    setIsMoveLoad(true);
    setStoreType(value);
    if(value === ''){
    setErrorMessage("The selected store type is invalid!!");
    setIsSelected(false);
    setIsMoveLoad(false);
   }else{
     Axios.get('/warehouse/getall').then((response) => {
       const filteredWarehouse = response.data.filter((warehouse) => warehouse.type === value && warehouse.name !== row.warehouseName);
       console.log(filteredWarehouse.length);
   if (filteredWarehouse.length === 0) {
     setErrorMessage("No warehouses found for the selected Store Type!!");
     setIsSelected(false);
     setIsMoveLoad(false);
   } else {
     setwarehouseNameList(filteredWarehouse);
     setIsSelected(true);
     setIsMoveLoad(false);
   }
     }).catch((error) => {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage("An error occurredf" + error);
      }
      setIsMoveLoad(false);
      setIsSelected(false);
     })
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
    Axios.get('/Substore/getall').then((response) => {
        setSubStoreItems(response.data);
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
        field: "warehouseName",
        headerName: "Warehouse Name",
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
  
    {
      field: "delete",
      headerName: "Delete",
      renderCell: ({ row }) => {
        // Render the delete button here
        return <button onClick={() => handleCancleClickOpen(row)} className="btn btn-danger mx-1 ">Delete</button>;
      },
    },
    {
      field: "move",
      headerName: "Move",
      renderCell: ({ row }) => {
        // Render the delete button here
        return <button onClick={() => handleMoveClickOpen(row)} className="btn btn-primary mx-1 ">Move</button>;
      },
    },
    {
        field: "sale",
        headerName: "Sale",
        renderCell: ({ row }) => {
          // Render the delete button here
          return <button onClick={() => handleClickOpen(row)} className="btn btn-primary mx-1 ">Sale</button>;
        },
      },
  ];
  return (
    <>
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
       {isMoveLoad && <LinearProgress color="secondary"/>}
        </DialogTitle>
        <DialogContent>
        <FormControl
          fullWidth
          sx={{gridColumn: "span 4" }}>
                <InputLabel id="demo-simple-select-helper-label">Select store you want to move the item</InputLabel>
        <Select
            required
            label="Move To Where"
            value={storeType}
            onChange={(e) => handleStoreType(e.target.value, selectedMoveRow)}
            fullWidth
            margin="normal"
            sx={{
              marginBottom: '5px'
            }}
          >
            <MenuItem value="Sub Store">To Sub Store</MenuItem>
            <MenuItem value="Shop">To Shop</MenuItem>
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
               sx={{ gridColumn: "span 4" ,color: "white", marginBottom: '5px'}}
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
          <Button style={{ color: 'white' }} onClick={() => handleMove(selectedMoveRow)} disabled ={isMoved} >
            {isMoved ? <CircularProgress color="secondary" size={30} /> : 'Move'}
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
          <Button style={{ color: 'white' }} onClick={() => handleSale(selectedRow)}  disabled ={isSaled}>
            {isSaled ? <CircularProgress color="secondary" size={30} /> : 'Sale'}
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
    <Box m="20px">
      <Header
        title="SUB STORE ITEMS"
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
        <DataGrid
            rows={subStoreItems}
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
                handleCancleClickOpen(row);
              }else if (params.field === "move"){
                handleMoveClickOpen(row);
              }else if (params.field === "sale") {
                handleClickOpen(row);
              }
            }}
          />
      </Box>
    </Box>
    </>
  );
};

export default ViewSubStoreItems;
