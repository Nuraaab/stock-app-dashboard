import { Alert, Box, Button, Collapse, IconButton, MenuItem, Select, TextField, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import Axios from 'axios';
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import CloseIcon from '@mui/icons-material/Close';
const AddUsers = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const [isAdded, setIsAdded] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMessage,  setErrorMessage] = useState('');
  const [openAlert, setOpenAlert] = useState(true);
  const colors = tokens(theme.palette.mode);
  const handleFormSubmit = (values) => {
    setIsAdded(true);
    Axios.post('/auth/add', {
      adminName:values.fullname,
      email: values.email,
      phone: values.phone,
      type: values.type,
      password: values.password,
    }).then((response) => {
        setMessage(`User added successfully!`);
        setIsAdded(false);
    }).catch((error) => {
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
      <Header title="CREATE USER" subtitle="" />
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
                <MenuItem value=''>Select User Type</MenuItem>
                <MenuItem value='admin'>Admin</MenuItem>
                <MenuItem value='casher'>Casher</MenuItem>
              </Select>
              
              <TextField
                fullWidth
                variant="outlined"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                
                variant="outlined"
                type="password"
                label="Confirm Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.rpassword}
                name="rpassword"
                error={!!touched.rpassword && !!errors.rpassword}
                helperText={touched.rpassword && errors.rpassword}
                sx={{ gridColumn: "span 4" }}
              />
              
               {/* <label htmlFor="btn-upload">
                <input
                  id="btn-upload"
                  name="upload"
                  style={{ display: 'none'}}
                  type="file"
                  onChange={values.upload} />
                <Button
                style={{backgroundColor: colors.grey[200]}}
                  className="btn-choose"
                  variant="outlined"
                  component="span" >
                  Choose Files
                </Button>
              </label> */}
              <Box display="flex" justifyContent="end" mt="10px"  >
              <Button type="submit" color="secondary" variant="contained" disabled ={isAdded}>
                {isAdded ? <CircularProgress color="secondary" size={30}/> : 'ADD NEW USERS'}
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
    .matches(phoneRegExp, "Phone number is not valid"),
  password: yup.string().required("required"),
  rpassword: yup.string().required("required"),
});
const initialValues = {
  fullname: "",
  email: "",
  phone: "",
  password: "",
  rpassword: "",
  type: "",
};

export default AddUsers;
