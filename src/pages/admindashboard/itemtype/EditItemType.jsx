import { Alert, Box, Button, Collapse, IconButton, MenuItem, Select, TextField, useTheme } from "@mui/material";
import { Formik, resetForm } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Axios from 'axios';
import { useState } from "react";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from "@mui/material/CircularProgress";
const EditItemType = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [openAlert, setOpenAlert] = useState(true);
  const theme = useTheme();
  const location = useLocation();
  const rowData = location.state.rowData;
  const colors = tokens(theme.palette.mode);
  const [isEdited, setisEdited] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    itemtype: rowData.type,
   
  };
  const handleFormSubmit = (values, {resetForm}) => {
    setisEdited(true);
   Axios.post(`/type/update/${rowData._id}`, {
    type: values.itemtype,
   }).then((response) => {
    console.log(response.data);
    console.log('Updating successfull');
    setisEdited(false);
    setMessage('Item Type Updated Successfully!');
    resetForm();
    navigate('/view_item_type');
   }).catch((error) => {
    console.log(error);
    if (error.response && error.response.data) {
      setErrorMessage(error.response.data);
    } else {
      setErrorMessage("An error occurred");
    }
    setisEdited(false);
   })
    console.log(values);
  };

  return (
    <Box m="20px">
      <Header title="EDIT ITEM TYPE" subtitle= {message} />
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
                label="Add Item Type"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.itemtype}
                name="itemtype"
                error={!!touched.itemtype && !!errors.itemtype}
                helperText={touched.itemtype && errors.itemtype}
                sx={{ gridColumn: "span 4" }}
              />
              
    
              
              <Box display="flex" justifyContent="end" mt="10px" >
              <Button type="submit" color="secondary" variant="contained" disabled = {isEdited}>
                {isEdited ? <CircularProgress color="secondary" size={30}/> : 'EDIT ITEM TYPE'}
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
});


export default EditItemType;
