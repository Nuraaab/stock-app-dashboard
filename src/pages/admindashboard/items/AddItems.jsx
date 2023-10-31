import { Alert, Box, Button, Collapse, FormControl, FormHelperText, IconButton, InputLabel, MenuItem, Select, TextField, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import Axios from 'axios';
import {useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import CloseIcon from '@mui/icons-material/Close';
const AddItems = () => {
  const [itemType, setItemType] = useState([]);
  const [specification, setSpecification] = useState([]);
  const [selectedSpecifications, setSelectedSpecifications] = useState([]);
  const [filteredSpecifications, setFilteredSpecifications] = useState([]);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isAdded, setIsAdded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openAlert, setOpenAlert] = useState(true);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleFormSubmit = (values, {resetForm}) => {
    setIsAdded(true);
    if(values.itemcode === ""){
      setErrorMessage('Item Code can not be empty!');
      setIsAdded(false);
    }else if(values.itemname === ""){
      setErrorMessage('Item Code can not be empty!');
      setIsAdded(false);
    }else{
      Axios.post('/items/add', {
        name: values.itemname,
        type: values.itemtype,
        itemCode: values.itemcode,
        specification: selectedSpecifications.join("/"),
      }).then((response) => {
        console.log(response.data);
        console.log('Adding successful');
        setMessage('Item Added Successfully!');
        setIsAdded(false);
        resetForm();
        navigate('/view_items');
      }).catch((error) => {
        console.log(error);
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage("An error occurred");
        }
        setIsAdded(false);
      });
    }
   
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
    Axios.get('/type/getall').then((response) => {
      setItemType(response.data);
      Axios.get('/specification/getall').then((response) => {
        setSpecification(response.data);
        console.log('hi');
        console.log(specification);
        setLoading(false);
      }).catch((error) => {
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage("An error occurred");
        }
        setLoading(false);
      });
    }).catch((error) => {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage("An error occurred");
      }
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <Box m="20px">
      <Header title="ADD ITEM " />
     
      {errorMessage && <Box sx={{ width: '100%' }}>
      <Collapse in={openAlert}>
        <Alert
        severity="error"
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
          <form onSubmit={handleSubmit} action="" method="post">
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
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
              
                <FormControl sx={{gridColumn: "span 4" }}
                error={!!touched.itemtype && !!errors.itemtype}>
                <InputLabel id="demo-simple-select-helper-label">Choose Item Type</InputLabel>
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
                {itemType.map((item) => (
                  <MenuItem key={item.id} value={item.type}>{item.type}</MenuItem>
                ))}
              </Select>
              <FormHelperText>{touched.specification && errors.specification}</FormHelperText>
              </FormControl>
              <FormControl sx={{gridColumn: "span 4" }}
                error={!!touched.specification && !!errors.specification}>
                <InputLabel id="demo-simple-select-helper-label">Choose Item Specification</InputLabel>
                 <Select
                fullWidth
                variant="outlined"
                error={!!touched.specification && !!errors.specification}
                helperText={touched.specification && errors.specification}
                sx={{ gridColumn: "span 4", color: "white" }}
                value={values.specification}
                name="specification"
                label="Item Specification(more than one can be selected) "
                onBlur={handleBlur}
                onChange={(event) => handleSpecificationChange(event, handleChange)}
              >
                {filteredSpecifications.map((spec) => (
                  <MenuItem key={spec} value={spec}>{spec}</MenuItem>
                ))}
              </Select>
              <FormHelperText>{touched.specification && errors.specification}</FormHelperText>
              </FormControl>
              <div className="row">
                {selectedSpecifications.map((specification) => (
                  <div key={specification} className="col-auto d-flex align-items-center">
                    <Button variant="primary" className="me-2">
                      {specification}
                    </Button>
                    <FontAwesomeIcon onClick={() => handleRemoveSpecification(specification)} icon={faTimes} />
                  </div>
                ))}
              </div>
              <Box display="flex" justifyContent="end" mt="10px">
                <Button type="submit" color="secondary" variant="contained" disabled ={isAdded}>
                 {isAdded ? <CircularProgress color="secondary" size={30}/> : 'ADD NEW ITEMS'}
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
  itemcode: yup.string().required("Item Code Required"),
  itemname: yup.string().required("Item Name Required"),
  itemtype: yup.string().required("required"),
  specification: yup.string().required("required"),
});

const initialValues = {
  itemcode: "",
  itemname: "",
  itemtype: "",
  specification: ""
};

export default AddItems;


