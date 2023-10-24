import { Alert, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Modal, Typography, useMediaQuery } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { useTheme } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { useEffect, useState } from "react";
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import LinearProgress from '@mui/material/LinearProgress';
import Message from "../../../components/admincomponents/Message";
const ViewItems = () => {
  const [itemList , setItemList] = useState([]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const colors = tokens(theme.palette.mode);
  const [itemType , setItemType] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [openAlert, setOpenAlert] = useState(true);
  const [openCancle, setOpenCancle] = useState(false);
  const [selectedCancleRow, setSelectedCancleRow] = useState(null);
  const [isCancled, setIsCancled] = useState(false);
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();
  const handleEdit = (row) => {
    navigate(`/edit_items`, { state: { rowData: row } });
  };
  
  const handleDelete = (row) => {
    setIsCancled(true);
      Axios.delete(`/items/delete/${row._id}`).then((response) => {
        setMessage(`${row.name} deleted successfully!`);
        setReload(!reload);
        setIsCancled(false);
        setOpenCancle(false);
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
  const handleCancleClose = () => {
    setOpenCancle(false);
    setSelectedCancleRow(null);
  };
  const handleCancleClickOpen = (row) => {
    setOpenCancle(true);
    setSelectedCancleRow(row);
};
  useEffect(() => {
    Axios.get('/items/getall').then((response) => {
      setItemList(response.data);
      setLoading(false);
        console.log(itemType);
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
      field: "type",
      headerName: "Item Type",
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
        return <button onClick={() => handleCancleClickOpen(row)} className="btn btn-danger mx-1 " >Delete</button>;
      },
    },
  ];
  return (
    <Box m="20px">
      <Header
        title="ITEM TYPE"
      />
      <Message message={message} openAlert={openAlert}  setOpenAlert={setOpenAlert} severity='success'/>
      <Message message={errorMessage} openAlert={openAlert} setOpenAlert={setOpenAlert} severity='error'/>
    {loading && <LinearProgress color="secondary"/>}
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
    <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            marginBottom: "20px",
            overflowX: "auto",
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
          width: "100%",
          overflow: "hidden",
        }}
      >
        <DataGrid
            rows={itemList}
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
                handleCancleClickOpen(row);
              }
            }}
          />
      </Box>
    </Box>
  );
};

export default ViewItems;
