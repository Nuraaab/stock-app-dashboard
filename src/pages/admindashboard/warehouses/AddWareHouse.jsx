import { Alert, Box, Button, Collapse, IconButton, MenuItem, Select, TextField, useTheme } from "@mui/material";
import { Formik, resetForm } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import Axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from "@mui/material/CircularProgress";
const AddWareHouse = () => {
  // const [warehouseList , setwarehouseList] = useState([]);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isAdded, setIsAdded] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [openAlert, setOpenAlert] = useState(true);
  const navigate = useNavigate();
  const handleFormSubmit = (values, {resetForm}) => {
    setIsAdded(true);
   Axios.post('/warehouse/add', {
    name: values.name,
    type: values.type,
   }).then((response) => {
    console.log(response.data);
    console.log('Adding successfull');
    setIsAdded(false);
    setMessage('Warehouse Added Successfully!');
    resetForm();
    navigate('/view_ware_house');
   }).catch((error) => {
    console.log(error);
    if (error.response && error.response.data) {
      setErrorMessage(error.response.data);
    } else {
      setErrorMessage("An error occurred");
    }
    setIsAdded(false);
   })
    console.log(values);
  };



  return (
    <Box m="20px">
      <Header title="ADD WAREHOUSE" />
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
                <MenuItem value='Shop'>Shop</MenuItem>
              </Select>
    
              
              <Box display="flex" justifyContent="end" mt="10px" width= '800px'>
              <Button type="submit" color="secondary" variant="contained" disabled ={isAdded}>
                {isAdded ? <CircularProgress color="secondary" size={30}/> : 'ADD WAREHOUSE'}
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
const initialValues = {
  type: "",
 
};

export default AddWareHouse;
