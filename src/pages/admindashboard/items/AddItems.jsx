import { Box, Button, MenuItem, Select, TextField, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import Axios from 'axios';
import { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
const AddItems = () => {
  const [itemType, setItemType] = useState([]);
  const [specification, setSpecification] = useState([]);
  const [selectedSpecifications, setSelectedSpecifications] = useState([]);
  const [filteredSpecifications, setFilteredSpecifications] = useState([]);
  const [message, setMessage] = useState('');
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleFormSubmit = (values) => {
    Axios.post('http://localhost:8000/api/items/add', {
      name: values.itemname,
      type: values.itemtype,
      itemCode: values.itemcode,
      specification: selectedSpecifications.join("/"),
    }).then((response) => {
      console.log(response.data);
      console.log('Adding successful');
      setMessage('Item Added Successfully!');
    }).catch((error) => {
      console.log(error);
      setMessage('Error occurred while adding Item!');
    });
    console.log(values);
  };
  const handleItemTypeChange = (event, handleChange) => {
    const selectedItemType = event.target.value;
    const filteredSpecs = specification
      .filter((spec) => spec.type === selectedItemType)
      .map((spec) => spec.specification);
      console.log('hello');
    console.log(filteredSpecs);
    console.log(specification);
    setFilteredSpecifications(filteredSpecs);
    handleChange(event); 
  };
  const handleSpecificationChange = (event, handleChange) => {
    const selectedSpec = event.target.value;
    const updatedSpecs = filteredSpecifications.filter(
      (spec) => spec !== selectedSpec
    );
    setSelectedSpecifications([...selectedSpecifications, selectedSpec]);
    setFilteredSpecifications(updatedSpecs);
    handleChange(event); 
  };
  const handleRemoveSpecification = (specification) => {
    const updatedSpecifications = selectedSpecifications.filter(
      (spec) => spec !== specification
    );
    setSelectedSpecifications(updatedSpecifications);
    setFilteredSpecifications([...filteredSpecifications, specification]);
    console.log(filteredSpecifications);
    console.log(filteredSpecifications);
  };
  useEffect(() => {
    Axios.get('http://localhost:8000/api/type/getall').then((response) => {
      setItemType(response.data);
      Axios.get('http://localhost:8000/api/specification/getall').then((response) => {
        setSpecification(response.data);
        console.log('hi');
        console.log(specification);
      }).catch((error) => {
        console.log(error);
      });
    }).catch((error) => {
      console.log(error);
    });
  }, []);
  
  return (
    <Box m="20px">
      <Header title="ADD ITEM TYPE" subtitle={message} />
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
          <form onSubmit={handleSubmit} action="" method="post">
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                marginLeft: '20px',
                marginRight: '20px',
                marginBottom: '30px',
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
                sx={{ gridColumn: "span 4", color: "white" }}
                value={values.itemtype}
                name="itemtype"
                label="Item Type"
                onBlur={handleBlur}
                onChange={(event) => handleItemTypeChange(event, handleChange)}
              >
                <MenuItem value=''>Select Item Type</MenuItem>
                {itemType.map((item) => (
                  <MenuItem key={item.id} value={item.type}>{item.type}</MenuItem>
                ))}
              </Select>
              
          
                          <Select
                fullWidth
                variant="outlined"
                error={!!touched.specification && !!errors.specification}
                helperText={touched.specification && errors.specification}
                sx={{ gridColumn: "span 4", color: "white" }}
                value={values.specification}
                name="specification"
                label="Item Type"
                onBlur={handleBlur}
                onChange={(event) => handleSpecificationChange(event, handleChange)}
              >
                <MenuItem value=''>Select Specification</MenuItem>
                {filteredSpecifications.map((spec) => (
                  <MenuItem key={spec} value={spec}>{spec}</MenuItem>
                ))}
              </Select>

              <div>
                {selectedSpecifications.map((specification) => (
                  <div key={specification} className="d-flex align-items-center">
                    <Button variant="primary" className="me-2">
                      {specification}
                    </Button>
                    <FontAwesomeIcon onClick={() => handleRemoveSpecification(specification)} icon={faTimes} />
                  </div>
                ))}
              </div>
              <Box display="flex" justifyContent="end" mt="10px">
                <Button type="submit" color="secondary" variant="contained">
                  ADD NEW ITEMS
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
  specification: yup.string().required("required"),
});

const initialValues = {
  itemtype: "",
};

export default AddItems;


