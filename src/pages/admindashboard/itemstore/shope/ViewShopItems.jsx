import { Alert, Box, Button,  Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Modal, Select, TextField, Typography, useMediaQuery } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../../theme";
import Header from "../../../../components/Header";
import { useTheme } from "@mui/material";
import Axios from 'axios';
import { useEffect, useState } from "react";
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import Message from "../../../../components/admincomponents/Message";
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
const ViewShopItems = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const colors = tokens(theme.palette.mode);
  // dialog
  const [open, setOpen] = useState(false);
  const [ openMove,  setOpenMove] = useState(false);
  const [openAlert, setOpenAlert] = useState(true);
  const [loading, setLoading]  = useState(true);
  //dialog

  //input data
  const [custName, setCustName] = useState('');
  const [quantity, setQuantity] = useState('');
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
  //input data

  //warehouse and shope
  const [warehouseNameList, setwarehouseNameList] = useState([]);
  const [warehouseName, setWarehouseName] = useState('');
  const [storeType, setStoreType] = useState('');
  const [isSelected, setIsSelected] = useState(false);
  //warehouse  and shope
  const [shopeItems , setShopItems] = useState([]);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaled, setIsSaled] = useState(false);
  const [openCancle, setOpenCancle] = useState(false);
  const [selectedCancleRow, setSelectedCancleRow] = useState(null);
  const [isCancled, setIsCancled] = useState(false);
  const [reload, setReload] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const navigate = useNavigate();
//transaction type
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
// popup related
const handleClickOpen = (row) => {
  setSelectedRow(row);
  setOpen(true);
};
    const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
    };

//popup related


  
  const handleDelete = (row) => {
    setIsCancled(true);
      Axios.delete(`/Shop/delete/${row._id}`).then((response) => {
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
  const handleSale = (selectedrow) => {
    setIsSaled(true);
    if(transactionType ==='credit'){
      Axios.post(`/Shop/transaction/${selectedrow._id}`, {
        quantity: quantity,
        customerName: custName,
        paymentMethod: transactionType,
      }).then((response) => {
        setMessage(`${quantity}  ${selectedrow.name} solled successfully!!` );
        setReload(!reload);
        Axios.post('/credit/add', {
          amount: price,
          customerName: custName,
          itemCode: selectedrow.itemCode,
          phone: phone,
          warehouseName: selectedrow.warehouseName,
          paymentDate: creditDate
        }).then((response) => {
          setIsSaled(false);
          setMessage(`${quantity}  ${selectedrow.name} solled with credit successfully!!` );
          setOpen(false);
          setCustName('');
          setPrice('');
          setQuantity('');
          setTransfer(false);
          setCredit(false);
          setTransactionType('');
          setErrorMessage('');
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
      Axios.post(`/Shop/transaction/${selectedrow._id}`, {
        quantity: quantity,
        customerName: custName,
        paymentMethod: `${transactionType}(Bank Name: ${bankName}, Account Number: ${accountNumber})`,
      }).then((response) => {
        setOpen(false);
        setIsSaled(false);
        setMessage("Sale Adedded successfully!! ");
        setCustName('');
        setPrice('');
        setQuantity('');
        setTransfer(false);
        setCredit(false);
        setTransactionType('');
        setErrorMessage('');
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
      Axios.post(`/Shop/transaction/${selectedrow._id}`, {
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
        setTransfer(false);
        setCredit(false);
        setTransactionType('');
        setErrorMessage('');
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
    const handleCancleClose = () => {
      setOpenCancle(false);
      setSelectedCancleRow(null);
    };
    const handleCancleClickOpen = (row) => {
      setOpenCancle(true);
      setSelectedCancleRow(row);
  };
  useEffect(() => {
    Axios.get('/Shop/getall').then((response) => {
      setShopItems(response.data);
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
      <BootstrapDialog
        open={open}
        onClose={handleClose}
        aria-labelledby="costomized-dialog-title"
      >
       <DialogTitle
      id="costomized-dialog-title"
    >
      Sale Shop Items
    </DialogTitle>
    <IconButton
        aria-label="close"
        onClick={() => {handleClose(); saleResetForm()}}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
        {errorMessage && <DialogTitle>
        <Message message={errorMessage} openAlert={openAlert} setOpenAlert={setOpenAlert} severity='error'/>
        </DialogTitle>}
        <DialogContent dividers>
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
            type="number"
            label="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            fullWidth
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
          <Button style={{ color: 'white' }} onClick={() => handleSale(selectedRow)} disabled ={isSaled}>
            {isSaled ? <CircularProgress color="secondary" size={30} /> : 'Sale'}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    <Box 
    margin={0}
    padding={0}
    >
      <Header
        title="SHOP ITEMS"
      />
      <Message message={message} openAlert={openAlert}  setOpenAlert={setOpenAlert} severity='success'/>
      <Message message={errorMessage} openAlert={openAlert} setOpenAlert={setOpenAlert} severity='error'/>
    <BootstrapDialog
        open={openCancle}
        onClose={handleCancleClose}
        aria-labelledby="Costomized-dialog-title"
        // maxWidth="md" // Set the desired width here
        fullWidth
      >
      <DialogTitle id="delete-confirmation-dialog-title" >Confirm Delete</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => handleCancleClose()}
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
            Are you sure you want to delete this item?
          </Typography>
        </DialogContent>
        <DialogActions dividers style={{ justifyContent: 'center' }}>
        <Button variant="outlined" color="inherit" onClick={() => handleCancleClose()} >
            No
          </Button>
          <Button  variant="contained"
            color="primary" onClick={() => handleDelete(selectedCancleRow)}  disabled ={isCancled}>
            {isCancled ? <CircularProgress color="secondary" size={30}/> : 'Yes'}
          </Button>
        </DialogActions>
      </BootstrapDialog>

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
            rows={shopeItems}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            getRowId={getRowId}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                style: { color: "red" },
              },
            }}
            disableColumnFilter ={isMobile}
          />
      </Box>
    </Box>
    </>
  );
};

export default ViewShopItems;
