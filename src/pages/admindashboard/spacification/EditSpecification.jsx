import {Box, Button, TextField, useTheme } from "@mui/material";
import { Formik} from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import Axios from 'axios';
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Message from "../../../components/admincomponents/Message";
const EditSpecifications = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [openAlert, setOpenAlert] = useState(true);
  const [isEdited, setIsEdited] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const rowData = location.state.rowData;
  const navigate = useNavigate();
  const initialValues = {
    spacification: rowData.specification,
   
  };
  const handleFormSubmit = (values, {resetForm}) => {
    setIsEdited(true);
   Axios.post(`/specification/update/${rowData._id}`, {
    specification: values.spacification,
   }).then((response) => {
    console.log(response.data);
    console.log('Updating  successfull');
    setIsEdited(false);
    setMessage('Spacification Updated Successfully!');
    resetForm();
    navigate('/view_spacification');
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
      <Header title="EDIT SPECIFICATIONS" />
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
                label="Spacifications Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.spacification}
                name="spacification"
                error={!!touched.spacification && !!errors.spacification}
                helperText={touched.spacification && errors.spacification}
                sx={{ gridColumn: "span 4" }}
              />
              
              <Box display="flex" justifyContent="end" mt="10px" >
              <Button type="submit" color="secondary" variant="contained" disabled ={isEdited}>
                {isEdited ? <CircularProgress color="secondary" size={30}/> : 'EDIT SPECIFICATIONS'}
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
  spacification: yup.string().required("required"),
});

export default EditSpecifications;
