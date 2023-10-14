import { Box, Modal } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../../theme";
import Header from "../../../../components/Header";
import { useTheme } from "@mui/material";
import Axios from 'axios';
import { useEffect, useState } from "react";
const ViewSubStoreItems = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [subStoreItems , setSubStoreItems] = useState([]);

  const handleEdit = (row) => {
    const modal = new Modal(row);
    modal.open();
  };
  
  const handleDelete = (row) => {
    console.log(row);
  };
  const handleSale = (row) => {
    console.log(row);
  };
  useEffect(() => {
    Axios.get('/mainstore/getall').then((response) => {
        setSubStoreItems(response.data);
       }).catch((error) => {
        console.log(error);
       })
}, []);
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
        return <button onClick={() => handleDelete(row)} className="btn btn-danger mx-1 ">Delete</button>;
      },
    },
    {
        field: "sale",
        headerName: "Sale",
        renderCell: ({ row }) => {
          // Render the delete button here
          return <button onClick={() => handleSale(row)} className="btn btn-primary mx-1 ">Sale</button>;
        },
      },
  ];
  return (
    <Box m="20px">
      <Header
        title="VIEW SUB STORE ITEMS"
      />
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
            onCellClick={(params) => {
              const row = params.row;

              if (params.field === "edit") {
                handleEdit(row);
              } else if (params.field === "delete") {
                handleDelete(row);
              } else if (params.field === "sale") {
                handleSale(row);
              }
            }}
          />
      </Box>
    </Box>
  );
};

export default ViewSubStoreItems;
