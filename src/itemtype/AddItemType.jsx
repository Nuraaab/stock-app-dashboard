import { Box, Button, MenuItem, Select, TextField, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from "../theme";
import Header from "../components/Header";
import Axios from 'axios';
import { useState } from "react";
const AddItemType = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [message, setMessage] = useState('');
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleFormSubmit = (values) => {
   Axios.post('http://localhost:8000/api/type/add', {
    type: values.itemtype,
   }).then((response) => {
    console.log(response.data);
    console.log('Adding successfull');
    setMessage('Item Type Added Successfully!');
   }).catch((error) => {
    console.log(error);
    setMessage('Error happens while adding item type!');
   })
    console.log(values);
  };

  return (
    <Box m="20px">
      <Header title="ADD ITEM TYPE" subtitle= {message} />

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
              
    
              
              <Box display="flex" justifyContent="end" mt="10px" width= '800px'>
              <Button type="submit" color="secondary" variant="contained">
                Add Item Type
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
const initialValues = {
  itemtype: "",
 
};

export default AddItemType;
