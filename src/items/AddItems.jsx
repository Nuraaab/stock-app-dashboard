import { Box, Button, MenuItem, Select, TextField, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from "../theme";
import Header from "../components/Header";

const AddItems = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="" />

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
                label="Item Code"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.itemcode}
                name="itemcode"
                error={!!touched.itemcode && !!errors.itemcode}
                helperText={touched.itemcode && errors.itemcode}
                sx={{ gridColumn: "span 4" }}
              />
               <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Item Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.itemname}
                name="itemname"
                error={!!touched.itemname && !!errors.itemname}
                helperText={touched.itemname && errors.itemname}
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
               onChange={handleChange}
              >
                <MenuItem value=''>Select Item Type</MenuItem>
                <MenuItem value='item1'>item1</MenuItem>
                <MenuItem value='item2'>item2</MenuItem>
              </Select>
              <div className="form-check form-check-inline">
  <input
    className="form-check-input"
    type="checkbox"
    id="checkbox1"
    value="option1"
  />
  <label className="form-check-label" htmlFor="checkbox1">
    Option 1
  </label>
</div>
<div className="form-check form-check-inline">
  <input
    className="form-check-input"
    type="checkbox"
    id="checkbox2"
    value="option2"
  />
  <label className="form-check-label" htmlFor="checkbox2">
    Option 2
  </label>
</div>
<div className="form-check form-check-inline">
  <input
    className="form-check-input"
    type="checkbox"
    id="checkbox3"
    value="option3"
  />
  <label className="form-check-label" htmlFor="checkbox3">
    Option 3
  </label>
</div>
<div className="form-check form-check-inline">
  <input
    className="form-check-input"
    type="checkbox"
    id="checkbox3"
    value="option3"
  />
  <label className="form-check-label" htmlFor="checkbox3">
    Option 3
  </label>
</div>
<div className="form-check form-check-inline">
  <input
    className="form-check-input"
    type="checkbox"
    id="checkbox3"
    value="option3"
  />
  <label className="form-check-label" htmlFor="checkbox3">
    Option 3
  </label>
</div>
              
              <Box display="flex" justifyContent="end" mt="10px" >
              <Button type="submit" color="secondary" variant="contained">
                Add New Items
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
  itemcode: yup.string().required("required"),
  itemname: yup.string().required("required"),

  itemtype: yup.string().required("required"),
  spacification: yup.string().required("required"),
});
const initialValues = {
  itemcode: "",
  itemname: "",
  itemtype: "",
  spacification: "",
};

export default AddItems;
