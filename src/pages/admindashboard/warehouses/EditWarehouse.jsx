import { Box, Button, MenuItem, Select, TextField, useTheme } from "@mui/material";
import { Formik, resetForm } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import Axios from 'axios';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const EditWareHouse = () => {
  // const [warehouseList , setwarehouseList] = useState([]);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [message, setMessage] = useState('');
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const  rowData = location.state.rowData;
  const initialValues = {
    type: rowData.type,
    name: rowData.name,
   
  };
  const handleFormSubmit = (values, {resetForm}) => {
   Axios.post(`/warehouse/update/${rowData._id}`, {
    name: values.name,
    type: values.type,
   }).then((response) => {
    console.log(response.data);
    console.log('Updating successfull');
    setMessage('Warehouse Updated Successfully!');
    resetForm();
   }).catch((error) => {
    console.log(error);
    setMessage(error.response.data);
   })
    console.log(values);
  };



  return (
    <Box m="20px">
      <Header title="EDIT WAREHOUSE" subtitle= {message} />

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
                label="Warehouse Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 4" }}
              />
              <Select
               fullWidth
               variant="outlined"
               error={!!touched.type && !!errors.type}
               helperText={touched.type && errors.type}
               sx={{ gridColumn: "span 4" ,color: "white"}}
               value={values.type}
               name="type"
               label="Store Type"
               onBlur={handleBlur}
               onChange={handleChange}
              >
                <MenuItem value=''>Select Warehouse</MenuItem>
                <MenuItem value='Main Store'>Main Store</MenuItem>
                <MenuItem value='Sub Store'>Sub Store</MenuItem>
                <MenuItem value='Shope'>Shope</MenuItem>
              </Select>
    
              
              <Box display="flex" justifyContent="end" mt="10px">
              <Button type="submit" color="secondary" variant="contained">
                EDIT WAREHOUSE
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
  name: yup.string().required("required"),
  type: yup.string().required("required"),
});


export default EditWareHouse;
