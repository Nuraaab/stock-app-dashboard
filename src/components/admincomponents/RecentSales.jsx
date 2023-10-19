import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React from 'react'
import { tokens } from '../../theme';
import { useState } from 'react';
import { useEffect } from 'react';
import Axios from 'axios';
const RecentSales = ({ name}) => {
    const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const [todaySales, setTodaySales] = useState('');
   const [errorMessage, setErrorMessage] = useState('');
   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get("/salleshistory/getall");
        const filteredSales = response.data.filter(
          (sale) =>
            sale.from === name &&
            new Date(sale.createdAt).toLocaleDateString() ===
              new Date().toLocaleDateString()
        );
        setTodaySales(filteredSales);
      } catch (error) {
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage("An error occurred");
        }
      }
    };

    fetchData();
  }, []);
  const handleClickOpen = (row) => {
  }
  const getRowId = (row) => {
    return row._id;
  };
    const columns = [
        {
          field: "name",
          headerName: "Name",
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
          {
            field: "paymentMethod",
            headerName: "Payment Method",
            flex: 1,
            cellClassName: "name-column--cell",
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
   { todaySales ? <Box
           gridColumn={{ xs: "span 12", sm: "span 12" }}
           gridRow={{ xs: 'span 3', sm: 'span 2'}}
           backgroundColor={colors.primary[400]}
           p={2}
           pb={4}
           
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
        <Typography variant="h5" fontWeight="600">
            Recent Sales From {name}
          </Typography>
        <DataGrid
            rows={todaySales}
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
                // handleDelete(row);
              } else if (params.field === "approve") {
                handleClickOpen(row);
              }
            }}
          />
      </Box> : <Box
      gridColumn={{ xs: "span 12", sm: "span 12" }}
      >
        <Typography variant="h5" fontWeight="600">
            There is no sales in {name} for now!!
          </Typography>
        </Box>}
      </>
  )
}

export default RecentSales