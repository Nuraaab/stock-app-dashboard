import { Box, Button, MenuItem, Select, TextField, useTheme } from "@mui/material";
import { Formik, resetForm } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Axios from 'axios';
import { useState } from "react";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { useLocation } from "react-router-dom";
const EditItemType = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [message, setMessage] = useState('');
  const theme = useTheme();
  const location = useLocation();
  const rowData = location.state.rowData;
  const colors = tokens(theme.palette.mode);
  const initialValues = {
    itemtype: rowData.type,
   
  };
  const handleFormSubmit = (values, {resetForm}) => {
   Axios.post(`/type/update/${rowData._id}`, {
    type: values.itemtype,
   }).then((response) => {
    console.log(response.data);
    console.log('Updating successfull');
    setMessage('Item Type Updated Successfully!');
    resetForm();
   }).catch((error) => {
    console.log(error);
    setMessage(error.response.data);
   })
    console.log(values);
  };

  return (
    <Box m="20px">
      <Header title="EDIT ITEM TYPE" subtitle= {message} />

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
              <Button type="submit" color="secondary" variant="contained">
                EDIT ITEM TYPE
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
