import { Box, Button,  Checkbox,  Dialog, DialogActions, DialogContent, DialogTitle, FormControl,  FormControlLabel,  IconButton,  InputLabel,  MenuItem,  Select, TextField, Typography, useMediaQuery } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../../theme";
import Header from "../../../../components/Header";
import { useTheme } from "@mui/material";
import { styled } from '@mui/material/styles';
import Axios from 'axios';
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Message from "../../../../components/admincomponents/Message";
import PropTypes from 'prop-types';
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
function CustomTabPanel(props) {
  const { children, value, index, mainstoreitems, setReload, reload, ...other } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = React.useState(false);
  const [openMove, setOpenMove] = useState(false);
  const [openAlert, setOpenAlert] = useState(true);
  const [custName, setCustName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [phone, setPhone] = useState('');
  const [chequeNumber, setChequeNumber] = useState('');
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
  const [saleLoading, setSaleLoading] = useState(false);
  const [moveLoading, setMoveLoading] = useState(false)
  const [initialMoveLoading, setInitialMoveLoading] = useState(false);
  const [openCancle, setOpenCancle] = useState(false);
  const [selectedCancleRow, setSelectedCancleRow] = useState(null);
  const [isCancled, setIsCancled] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const getRowId = (row) => {
    return row._id;
  };
  console.log('mainstore Items' + mainstoreitems);
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
        amount: price,
        phone: phone,
        paymentDate: creditDate,
        cheque: '',
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
    }else if(transactionType ==='transfer'){
      Axios.post(`/mainstore/holesall/${selectedrow._id}`, {
        quantity: quantity,
        customerName: custName,
        amount: price,
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
        amount: price,
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
const columns = [

  {
    field: "name",
    headerName: "Item Name",
    width:isMobile&& 120,
    flex:!isMobile&&1,
  },
  {
      field: "itemCode",
      headerName: "Item Code",
      width:isMobile&& 120,
      flex:!isMobile&&1,
    },
    {
      field: "specification",
      headerName: "Item Specification",
      width:isMobile&& 120,
      flex:!isMobile&&1,
    },
    {
      field: "type",
      headerName: "Item Type",
      width:isMobile&& 120,
      flex:!isMobile&&1,
    },
    {
      field: "expireDate",
      headerName: "Expire Date",
      width:isMobile&& 120,
      flex:!isMobile&&1,
    },
    {
      field: "warehouseName",
      headerName: "Warehouse Name",
      width:isMobile&& 120,
      flex:!isMobile&&1,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width:isMobile&& 120,
      flex:!isMobile&&1,
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
    <Message message={message} openAlert={openAlert}  setOpenAlert={setOpenAlert} severity='success'/>
    <Message message={errorMessage} openAlert={openAlert} setOpenAlert={setOpenAlert} severity='error'/>
     <div>
    
    <BootstrapDialog
     open={openMove}
     onClose={handleMoveClose}
     aria-labelledby="customized-dialog-title"
   >
    <DialogTitle
   id="customized-dialog-title"
 >
   Moveing {selectedMoveRow && selectedMoveRow.name}
 </DialogTitle>
 <IconButton
     aria-label="close"
     onClick={() => {handleMoveClose(); resetForm()}}
     sx={{
       position: 'absolute',
       right: 8,
       top: 8,
       color: (theme) => theme.palette.grey[500],
     }}
   >
     <CloseIcon />
   </IconButton>
   {(errorMessage || initialMoveLoading) &&
    <DialogTitle>
   <Message message={errorMessage} openAlert={openAlert} setOpenAlert={setOpenAlert} severity='error'/>
     {initialMoveLoading && <LinearProgress color="secondary"/>}
  </DialogTitle>}
 <DialogContent dividers>
 <FormControl
       fullWidth
       sx={{gridColumn: "span 4" }}>
             <InputLabel id="demo-simple-select-helper-label">Choose the destination store for the {selectedMoveRow && selectedMoveRow.name}</InputLabel>
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
             <InputLabel id="demo-simple-select-helper-label">Choose a Warehouse Name</InputLabel>
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
         label={`How Many ${selectedMoveRow && selectedMoveRow.name} ?`}
         value={quantityMove}
         name="quantity"
         onChange={(e) => setQuantityMove(e.target.value)}
       />
        }
 </DialogContent>
 <DialogActions dividers>
       <Button style={{ color: 'white' }} onClick={() => handleMove(selectedMoveRow)}  disabled ={moveLoading}>
         {moveLoading ? <CircularProgress color="secondary" size={24}/> :  'Move'}
       </Button>
     </DialogActions>
</BootstrapDialog>


  <BootstrapDialog
     open={open}
     onClose={handleClose}
     aria-labelledby="customized-dialog-title"
   >
    <DialogTitle
   id="customized-dialog-title"
 >
   Sale of {selectedRow && selectedRow.name} from  Main Store 
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
         label={`How Many ${selectedRow && selectedRow.name} ?`}
         value={quantity}
         onChange={(e) => setQuantity(e.target.value)}
         fullWidth
         type="number"
         margin="normal"
       />
        <TextField
         required
         label= {`Unit Price for 1 ${selectedRow && selectedRow.name}`}
         value={price}
         onChange={(e) => setPrice(e.target.value)}
         fullWidth
         margin="normal"
       />
       <FormControl
       fullWidth
       sx={{gridColumn: "span 4" }}>
             <InputLabel id="demo-simple-select-helper-label">Choose Transaction Type</InputLabel>
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
             <InputLabel id="demo-simple-select-helper-label">Pick Bank Name</InputLabel>
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
       {credit && <FormControlLabel required control={<Checkbox onChange={handleChange} />} label="Have Cheque book?"  />}
       {credit && checked && <TextField
         required
         label="Enter Cheque Number?"
         value={chequeNumber}
         onChange={(e) => setChequeNumber(e.target.value)}
         fullWidth
         margin="normal"
         type="number"
       />}
       {credit && <TextField
       required
         label="phone Number"
         value={phone}
         onChange={(e) => setPhone(e.target.value)}
         fullWidth
         margin="normal"
         type="number"
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
     <DialogActions dividers>
       <Button style={{ color: 'white' }} onClick={() => handleSale(selectedRow)}  disabled ={saleLoading}>
         {saleLoading ? <CircularProgress color="secondary" size={24}/> : 'Sale'}
       </Button>
     </DialogActions>
   </BootstrapDialog>

   <BootstrapDialog
     open={openCancle}
     onClose={handleCancleClose}
     aria-labelledby="customized-dialog-title"
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
 </div>
    
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        // <Box sx={{ p: 3 }}>
        //   <Typography>{children}</Typography>
        // </Box>

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
           flexGrow: '1',
           overflowX: 'auto',
           scrollbarWidth: 'none',
           msOverflowStyle: 'none',
           '&::-webkit-scrollbar': {
             width: '0.4em', 
           },
           '&::-webkit-scrollbar-thumb': {
             backgroundColor: 'transparent', 
           },
          padding:'0px'
         }}
       
       >
       {
         <div style={{ height: 400, width: '100%' }}>
         <DataGrid
             rows={mainstoreitems}
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
             disableColumnFilter={isMobile}
             disableDensitySelector ={isMobile}
             disableColumnSelector ={isMobile}
           />
           </div>
           }
       </Box>
      )}
    </div>
    </>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const ViewMainStores = () => {
  const [mainStoreItems , setMainStoreItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [warehouse, setWarehouse] = useState([]);
  const [value, setValue] = React.useState(0);
  const [tabName, setTabName] = useState('');
  const [intialWarehouse, setInitialWarehouse] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [openAlert, setOpenAlert] = useState(true);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setTabName(warehouse[newValue].name);
    console.log('tab data ' + warehouse[newValue].name);
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
useEffect(() => {
  Axios.get('/warehouse/getall')
    .then((response) => {
      const filteredData = response.data.filter((data) => data.type === "Main Store");
      setInitialWarehouse(filteredData[0].name);
      setWarehouse(filteredData);
      setLoading(false);
      setValue(0); // Set the initial selected tab to the first tab
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage("An error occurred");
        console.log('error' +error);
      }
      setLoading(false);
    });
}, []);
  return (
    <>
    
    <Box margin={0}
    >
      <Header
        title="MAIN STORE ITEMS" 
      />
      
    {errorMessage && <Message message={errorMessage} openAlert={openAlert} setOpenAlert={setOpenAlert} severity='error'/>}
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            href="/import"
            startIcon={<AddIcon />}
            sx={{ marginLeft: 'auto' }}
          >
            New Order
          </Button>
        </Box>
      {loading && <LinearProgress color="secondary" />}
      <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        {warehouse.map((item, index) => (
          <Tab label={item.name} key={index} sx={{
            '&.Mui-selected': {
              color: 'red', // Set your desired active color
            },
          }} {...a11yProps(index)} />
        ))}
      </Tabs>
      </Box>
      <CustomTabPanel value={value} index={value}  mainstoreitems ={value === 0 ? mainStoreItems.filter((item) => item.warehouseName === intialWarehouse) : mainStoreItems.filter((item) => item.warehouseName === tabName)} setReload ={setReload} reload = {reload}>
          
      </CustomTabPanel>
    </Box>
    </Box>
    </>
  );
};

export default ViewMainStores;
