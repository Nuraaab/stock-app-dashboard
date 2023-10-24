import { Alert, Box, Button, Collapse, FormControl, FormHelperText, IconButton, InputLabel, MenuItem, Select, TextField, useTheme } from "@mui/material";
import { Formik, resetForm } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import Axios from 'axios';
import { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import Message from "../../../components/admincomponents/Message";
const AddSpacifications = () => {
  const [itemType , setItemType] = useState([]);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [openAlert, setOpenAlert] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleFormSubmit = (values, {resetForm}) => {
    setIsAdded(true);
   Axios.post('/specification/add', {
    specification: values.spacification,
    type: values.itemtype,
   }).then((response) => {
    console.log(response.data);
    console.log('Adding successfull');
    setIsAdded(false);
    setMessage('Spacification Added Successfully!');
    resetForm();
    navigate('/view_spacification');
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

  useEffect(() => {
    Axios.get('/type/getall').then((response) => {
        setItemType(response.data);
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
}, []);


  return (
    <Box m="20px">
      <Header title="ADD ITEMS SPECIFICATION" />
      <Message message={message} openAlert={openAlert}  setOpenAlert={setOpenAlert} severity='success'/>
      <Message message={errorMessage} openAlert={openAlert} setOpenAlert={setOpenAlert} severity='error'/>
       {loading && <LinearProgress color="secondary"/>}
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
                label="Spacifications Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.spacification}
                name="spacification"
                error={!!touched.spacification && !!errors.spacification}
                helperText={touched.spacification && errors.spacification}
                sx={{ gridColumn: "span 4" }}
              />
              <FormControl sx={{gridColumn: "span 4" }}
                error={!!touched.itemtype && !!errors.itemtype}>
                <InputLabel id="demo-simple-select-helper-label">Select Item Type</InputLabel>
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
               onChange={handleChange}
              >
                <MenuItem value=''>Select Item Type</MenuItem>
                {
                 itemType.map((item) => (
                    <MenuItem key={item.id} value={item.type}>{item.type}</MenuItem>
                  ))
                }
                
              </Select>
              <FormHelperText>{touched.itemtype && errors.itemtype}</FormHelperText>
              </FormControl>
              
              <Box display="flex" justifyContent="end" mt="10px" >
              <Button type="submit" color="secondary" variant="contained" disabled ={isAdded}>
                {isAdded  ? <CircularProgress  color="secondary" size={30}/>  : 'ADD SPECIFICATION'}
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
  spacification: yup.string().required("Specification required"),
  itemtype: yup.string().required("Item type required"),
});
const initialValues = {
  itemtype: "",
  spacification: "",
};

export default AddSpacifications;
