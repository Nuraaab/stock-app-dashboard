import { Box, Button, MenuItem, Select, TextField, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../../components/Header";
import Axios from 'axios';
import { useEffect, useState } from "react";
import { tokens } from "../../../../theme";
import { useLocation } from "react-router-dom";
const EditMainStoreItems = () => {
  const [itemType , setItemType] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [filteredItemList, setFilteredItemList] = useState([]);
  const [specification, setSpecification] = useState([]);
  const [itemName, setItemName] = useState([]);
  const [itemCode, setItemCode] = useState([]);
  const [filteredWarehouseList, setFilteredWarehouseList] = useState([]);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [message, setMessage] = useState('');
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const rowData = location.state.rowData;
  const initialValues = {
    itemtype: rowData.type,
    name: rowData.name,
    code: rowData.itemCode,
    specification: rowData.specification,
    company: rowData.company,
    quantity: rowData.quantity,
    warehouseName: rowData.warehouseName,
   
  };
  const handleFormSubmit = (values, { resetForm }) => {
   Axios.post(`/mainstore/update/${rowData._id}`, {
    name: itemName,
    itemCode: itemCode,
    specification: specification,
    type: values.itemtype,
    expireDate: values.expireDate,
    company: values.company,
    warehouseName: values.warehouseName,
    quantity: values.quantity,
   }).then((response) => {
    console.log(response.data);
    console.log('Updating successfull');
    setMessage('Items  Updated to Main Store  Successfully!');
    resetForm();
   }).catch((error) => {
    console.log(error);
    setMessage('Error happens while Updating Items To Main Store!');
   })
    console.log(values);
  };
  const handleItemTypeChange = (event, handleChange) => {
    const selectedItemType = event.target.value;
    const filteredItems = itemList
      .filter((item) => item.type === selectedItemType);
      console.log('hello');
    console.log(filteredItems);
    setFilteredItemList(filteredItems);
    handleChange(event); 
  };
  const handleItemNameChange = (event, handleChange) => {
    const selectedItemCode = event.target.value;
    const filteredItems = filteredItemList.filter((item) => item.itemCode === selectedItemCode);
    if (filteredItems.length > 0) {
      const selectedName = filteredItems[0].name;
      const selectedItemCode = filteredItems[0].itemCode;
      const selectedSpecification = filteredItems[0].specification;
      console.log(selectedName, selectedSpecification);
      setItemName(selectedName);
      setItemCode(selectedItemCode);
      setSpecification(selectedSpecification);
    } else {
      setItemName("");
      setSpecification([]);
    }
    handleChange(event);
  };
  useEffect(() => {
    Axios.get('/type/getall').then((response) => {
        setItemType(response.data);
        console.log(itemType);
        Axios.get('/items/getall').then((response) => {
        setItemList(response.data);
        Axios.get('/warehouse/getall').then((response) => {
            const filteredWarehouse = response.data.filter((warehouse) => warehouse.type === "Main Store");
            setFilteredWarehouseList(filteredWarehouse);
            console.log('warehouse');
            console.log(filteredWarehouseList);
        }).catch((error) => {
            console.log(error);
        })
        }).catch((error) => {
            console.log(error);
        })
       }).catch((error) => {
        console.log(error);
       })
       // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


  return (
    <Box m="20px">
      <Header title="EDIT MAIN STORE ITEMS" subtitle= {message} />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                marginLeft: '20px',
                marginRight: '20px',
                marginBottom:'30px',
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
                borderRadius: '10px',
                backgroundColor: colors.primary[400],
                padding: '30px',
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Company Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.company}
                name="company"
                error={!!touched.company && !!errors.company}
                helperText={touched.company && errors.company}
                sx={{ gridColumn: "span 4" }}
              />

              <Select
               fullWidth
               variant="outlined"
               error={!!touched.itemtype && !!errors.itemtype}
               helperText={touched.itemtype && errors.itemtype}
               sx={{ gridColumn: "span 4" ,color: "white"}}
               value={values.itemtype}
               name="itemtype"
               label="Item Type"
               onBlur={handleBlur}
               onChange={(event) => handleItemTypeChange(event, handleChange)}
              >
                <MenuItem value=''>Select Item Type</MenuItem>
                {
                 itemType.map((item) => (
                    <MenuItem key={item.id} value={item.type}>{item.type}</MenuItem>
                  ))
                }
                
              </Select>
              <Select
               fullWidth
               variant="outlined"
               error={!!touched.name && !!errors.name}
               helperText={touched.name && errors.name}
               sx={{ gridColumn: "span 2" ,color: "white"}}
               value={values.name}
               name="name"
               label="Item Type"
               onBlur={handleBlur}
               onChange={(event) => handleItemNameChange(event, handleChange)}
              >
                <MenuItem value=''>Select Item Name</MenuItem>
                {
                 filteredItemList.map((itemName) => (
                    <MenuItem key={itemName.id} value={itemName.itemCode}>{itemName.name}</MenuItem>
                  ))
                }
                
              </Select>
             
              <Select
               fullWidth
               variant="outlined"
               error={!!touched.warehouseName && !!errors.warehouseName}
               helperText={touched.warehouseName && errors.warehouseName}
               sx={{ gridColumn: "span 2" ,color: "white"}}
               value={values.warehouseName}
               name="warehouseName"
               label="Warehouse Name"
               onBlur={handleBlur}
               onChange={handleChange}
              >
                <MenuItem value=''>Select Warehouse Name</MenuItem>
                {
                 filteredWarehouseList.map((warehouse) => (
                    <MenuItem key={warehouse.id} value={warehouse.name}>{warehouse.name}</MenuItem>
                  ))
                }
                
              </Select>
              <TextField
                fullWidth
                variant="outlined"
                type="date"
                label='Expire Date'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.expireDate}
                name="expireDate"
                error={!!touched.expireDate && !!errors.expireDate}
                helperText={touched.expireDate && errors.expireDate}
                InputLabelProps={{ shrink: true }}
                InputProps={{ inputProps: { min: "yyyy-mm-dd" } }}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="outlined"
                type="number"
                label="Quantity"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.quantity}
                name="quantity"
                error={!!touched.quantity && !!errors.quantity}
                helperText={touched.quantity && errors.quantity}
                sx={{ gridColumn: "span 2" }}
              />
              <Box display="flex" justifyContent="end" mt="10px" >
              <Button type="submit" color="secondary" variant="contained">
                EDIT MAIN STORES
              </Button>
            </Box>
            </Box>
            
          </form>
        )}
      </Formik>
    </Box>
  );
};


const checkoutSchema = yup.object().shape({
  itemtype: yup.string().required("required"),
  name: yup.string().required("required"),
  expireDate: yup.string().required("required"),
//   specification: yup.string().required("required"),
  company: yup.string().required("required"),
  quantity: yup.string().required("required"),
  warehouseName: yup.string().required("required"),
});


export default EditMainStoreItems;