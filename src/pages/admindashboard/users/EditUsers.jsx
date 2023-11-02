import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Axios from 'axios';
import CircularProgress from "@mui/material/CircularProgress";
import Message from "../../../components/admincomponents/Message";
const EditUsers = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const [isEdited, setIsEdited] = useState(false);
  const [openAlert, setOpenAlert] = useState(true);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const  rowData = location.state.rowData;
  const initialValues = {
    fullname: rowData.adminName,
    email: rowData.email,
    phone: rowData.phone,
    type: rowData.type,
  };
  const handleFormSubmit = (values, {resetForm}) => {
    setIsEdited(true);
   Axios.post(`/auth/update/${rowData._id}`, {
    adminName: values.fullname,
    email: values.email,
    phone: values.phone,
    type:values.type,
   }).then((response) => {
    console.log(response.data);
    console.log('Updating successfull');
    setIsEdited(false);
    setMessage('User Updated Successfully!');
    resetForm();
    navigate('/view_users');
   }).catch((error) => {
    console.log(error);
    if (error.response && error.response.data) {
      setErrorMessage(error.response.data);
    } else {
      setErrorMessage("An error occurred");
    }
    setIsEdited(false);
   })
    console.log(values);
  };
 

  return (
    <Box m="20px">
      <Header title="EDIT USERS" subtitle="" />
      <Message message={message} openAlert={openAlert}  setOpenAlert={setOpenAlert} severity='success'/>
      <Message message={errorMessage} openAlert={openAlert} setOpenAlert={setOpenAlert} severity='error'/>
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
                label="Full Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fullname}
                name="fullname"
                error={!!touched.fullname && !!errors.fullname}
                helperText={touched.fullname && errors.fullname}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="outlined"
                type="email"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />
               <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Phone Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                name="phone"
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{ gridColumn: "span 2" }}
              />
               <FormControl sx={{gridColumn: "span 2" }}
                error={!!touched.type && !!errors.type}>
                <InputLabel id="demo-simple-select-helper-label">Choose User Type</InputLabel>
               <Select
               fullWidth
               variant="outlined"
               error={!!touched.type && !!errors.type}
               helperText={touched.type && errors.type}
               sx={{ gridColumn: "span 2" ,color: "white"}}
               value={values.type}
               name="type"
               label="User Type"
               onBlur={handleBlur}
               onChange={handleChange}
              >
                <MenuItem value='admin'>Admin</MenuItem>
                <MenuItem value='cashier'>Cashier</MenuItem>
              </Select>
              <FormHelperText>{touched.type && errors.type}</FormHelperText>
              </FormControl>
              <Box display="flex" justifyContent="end" mt="10px"  >
              <Button type="submit" color="secondary" variant="contained">
               {isEdited ? <CircularProgress color="secondary" size={25}/> : 'EDIT USER'}
              </Button>
            </Box>
            </Box>
            
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  fullname: yup.string().required("required"),
  type: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
});


export default EditUsers;
