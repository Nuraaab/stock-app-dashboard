import { Box, Button, IconButton,  Typography, useTheme } from "@mui/material";
import { mockDataTeam, mockTransactions, warehouses } from "../../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../../components/Header";
import LineChart from "../../../components/LineChart";
import GeographyChart from "../../../components/GeographyChart";
import BarChart from "../../../components/BarChart";
import StatBox from "../../../components/StatBox";
import ProgressCircle from "../../../components/ProgressCircle";
import  List from "@mui/icons-material/List";
import Store from "@mui/icons-material/Store";
import  LockClockOutlined  from "@mui/icons-material/LockClockOutlined";
import Shop2Outlined from "@mui/icons-material/Shop2Outlined";
import HistoryOutlined from "@mui/icons-material/HistoryOutlined";
import ContactPage from "@mui/icons-material/ContactPage";
import { tokens } from "../../../theme";
import { useEffect, useState } from "react";
import Axios from 'axios';
import { Link } from "react-router-dom";
import PieChart from "../../../components/PieChart";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import RecentSales from "../../../components/admincomponents/RecentSales";
import LinearProgress from "@mui/material/LinearProgress";
import Formatting from "../../../components/admincomponents/PiChart";
import MyResponsivePie from "../../../components/admincomponents/PiChart";
import TestLine from "../../../components/admincomponents/TestLine";
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [totalItem, setTotalItem] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPending, setTotalPending] = useState(0);
  const [totalWarehouse, setTotalWarehouse] = useState(0);
  const [totalSale, setTotalSale] = useState(0);
  const [totalMainStoreItems, setTotalMainStoreItems] = useState(0);
  const [totalSubStoreItems, setTotalSubStoreItems] = useState(0);
  const [totalShopItems, setTotalShopItems] = useState(0);
  const [warehouseList, setWarehouseList] =useState([]);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [lineData, setLineData] = useState([]);
  const [mainstoreData, setMainstoreData] = useState([]);
  const [subStoreData, setSubstoreData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const amountResponse = await Axios.get("http://localhost:8000/api/salleshistory/lineamount");
        const quantityResponse = await Axios.get("http://localhost:8000/api/salleshistory/linequantity");
        // const shopResponse = await Axios.get("/shop/line");
  
        const AmountData = {
          id: "Amount Salled",
          color: tokens("dark").greenAccent[500],
          data: amountResponse.data,
        };
  
        const QuantityData = {
          id: "Total Item",
          color: tokens("dark").blueAccent[300],
          data: quantityResponse.data,
        };
        console.log('quantiy:', QuantityData);
        console.log('ammount:', AmountData);
  
        console.log('Before setLineData:', lineData);
        setLineData([AmountData, QuantityData]);
        console.log('After setLineData:', lineData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  
  useEffect(() => {
    console.log('lineData ddddddddddd:', lineData);
  }, [lineData]);
    const [piData, setPiData] = useState('');
    useEffect(() => {
      Axios.get('http://localhost:8000/api/mainstore/pie').then((response) => {
          setPiData(response.data);
          console.log('lineData:', lineData);
         }).catch((error) => {
          console.log(error);
         })
  }, []);
  useEffect(() => {
    setLoading(true);
   Axios.get('/items/getall').then((response) => {
     setTotalItem(response.data.length);
     setLoading(false);
   }).catch((error) => {
    if (error.response && error.response.data) {
      setErrorMessage(error.response.data);
    } else {
      setErrorMessage("An error occurred");
    }
    setLoading(false);
   })
  }, []);
  useEffect(() => {
    setLoading(true);
    Axios.get('/auth/getall').then((response) => {
      setTotalUsers(response.data.length);
    }).catch((error) => {
     if (error.response && error.response.data) {
       setErrorMessage(error.response.data);
     } else {
       setErrorMessage("An error occurred");
     }
     setLoading(false);
    })
   }, []);
   useEffect(() => {
    setLoading(true);
    Axios.get('/pending/getall').then((response) => {
      setTotalPending(response.data.length);
    }).catch((error) => {
     if (error.response && error.response.data) {
       setErrorMessage(error.response.data);
     } else {
       setErrorMessage("An error occurred");
     }
     setLoading(false);
    })
   }, []);
   useEffect(() => {
    setLoading(true);
    Axios.get('/warehouse/getall').then((response) => {
      setTotalWarehouse(response.data.length);
      setWarehouseList(response.data);
      console.log('name' + response.data._id)
    }).catch((error) => {
     if (error.response && error.response.data) {
       setErrorMessage(error.response.data);
     } else {
       setErrorMessage("An error occurred");
     }
     setLoading(false);
    })
   }, []);
   useEffect(() => {
    setLoading(true);
    Axios.get('/salleshistory/getall').then((response) => {
      setTotalSale(response.data.length);
    }).catch((error) => {
     if (error.response && error.response.data) {
       setErrorMessage(error.response.data);
     } else {
       setErrorMessage("An error occurred");
     }
     setLoading(false);
    })
   }, []);
   useEffect(() => {
    setLoading(true);
    Axios.get('/mainstore/getall').then((response) => {
      setTotalMainStoreItems(response.data.length);
    }).catch((error) => {
     if (error.response && error.response.data) {
       setErrorMessage(error.response.data);
     } else {
       setErrorMessage("An error occurred");
     }
     setLoading(false);
    })
   }, []);
   useEffect(() => {
    setLoading(true);
    Axios.get('/Substore/getall').then((response) => {
      setTotalSubStoreItems(response.data.length);
    }).catch((error) => {
     if (error.response && error.response.data) {
       setErrorMessage(error.response.data);
     } else {
       setErrorMessage("An error occurred");
     }
     setLoading(false);
    })
   }, []);
   useEffect(() => {
    setLoading(true);
    Axios.get('/Shop/getall').then((response) => {
      setTotalShopItems(response.data.length);
    }).catch((error) => {
     if (error.response && error.response.data) {
       setErrorMessage(error.response.data);
     } else {
       setErrorMessage("An error occurred");
     }
     setLoading(false);
    })
   }, []);
   const getRowId = (row) => {
    return row._id;
  };
  const columns = [
    {
      field: "id",
      headerName: "Id",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
        field: "name",
        headerName: "Name",
        flex: 1,
        cellClassName: "name-column--cell",
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1,
        cellClassName: "name-column--cell",
      },
      {
        field: "age",
        headerName: "Age",
        flex: 1,
        cellClassName: "name-column--cell",
      },
      {
        field: "phone",
        headerName: "Phone",
        flex: 1,
        cellClassName: "name-column--cell",
      },
      {
        field: "access",
        headerName: "Access",
        flex: 1,
        cellClassName: "name-column--cell",
      },
     
    ];
  return (
    <Box m="0px"
    // sx={{
    //   height: '100vh',
    //   flexGrow: '1',
    //   overflowY: 'auto',
    //   scrollbarWidth: 'none', // Hide scrollbar for Firefox
    //   msOverflowStyle: 'none', // Hide scrollbar for IE and Edge
    //   '&::-webkit-scrollbar': {
    //     width: '0.4em', // Customize scrollbar width
    //   },
    //   '&::-webkit-scrollbar-thumb': {
    //     backgroundColor: 'transparent', // Customize scrollbar color
    //   },
    // }}
    padding={0}
    >
      {loading && <LinearProgress  color="secondary"/>}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn={{ xs: "span 12", sm: "span 3", }} 
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          
        >
          <Link  to='/view_items' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <StatBox
            title={totalItem}
            subtitle="Items"
            progress="0.75"
            increase="+14%"
            icon={
              <List 
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
          </Link>
        </Box>
        <Box
          gridColumn={{ xs: "span 12", sm: "span 3" }} 
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
           <Link  to='/view_users' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <StatBox
            title={totalUsers}
            subtitle="Users"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
              
            }
          />
          </Link>
        </Box>
        <Box
          gridColumn={{ xs: "span 12", sm: "span 3" }} 
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Link  to='/pending' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <StatBox
            title={totalPending}
            subtitle="Pendings"
            progress="0.80"
            increase="+43%"
            icon={
              <LockClockOutlined
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
          </Link>
        </Box>


        <Box
          gridColumn={{ xs: "span 12", sm: "span 3" }} 
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Link  to='/view_ware_house' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <StatBox
            title={totalWarehouse}
            subtitle="WareHouses"
            progress="0.80"
            increase="+43%"
            icon={
              <Shop2Outlined
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
          </Link>
        </Box>

        <Box
          gridColumn={{ xs: "span 12", sm: "span 3" }} 
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Link  to='/saleshistory' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <StatBox
            title={totalSale}
            subtitle="Sales"
            progress="0.80"
            increase="+43%"
            icon={
              <HistoryOutlined
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
          </Link>
        </Box>
        <Box
          gridColumn={{ xs: "span 12", sm: "span 3" }} 
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Link  to='/mainstore' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <StatBox
            title={totalMainStoreItems}
            subtitle="Main Store Items"
            progress="0.50"
            increase="+21%"
            icon={
              <Store
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
          </Link>
        </Box>
        <Box
          gridColumn={{ xs: "span 12", sm: "span 3" }} 
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
           <Link  to='/sub_store_items' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <StatBox
            title={totalSubStoreItems}
            subtitle="Sub Store Items"
            progress="0.50"
            increase="+21%"
            icon={
              <Store
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
          </Link>
        </Box>
        <Box
          gridColumn={{ xs: "span 12", sm: "span 3" }} 
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
           <Link  to='/shop_items' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <StatBox
            title={totalShopItems}
            subtitle="Shop Items"
            progress="0.50"
            increase="+21%"
            icon={
              <Store
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
          </Link>
        </Box>
        {/* ROW 2 */}
        <Box
          gridColumn={{ xs: "span 12", sm: "span 12" }} 
          gridRow={{xs:'span 2', sm: 'span 3'}}
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Sales Report
              </Typography>
             
            </Box>
          </Box>
          <Box height={{xs:'250px', sm:'400px'}} m="-20px 0 0 0">
           {lineData && <LineChart isDashboard={true}  lineData={lineData}/>}
            {/* <TestLine /> */}
          
          </Box>
        </Box>
        <Box
          gridColumn={{ xs: "span 12", sm: "span 12" }}
          gridRow={{xs: 'span 2', sm: 'span 3'}}
          backgroundColor={colors.primary[400]}
         p={2}
        >
          {/* <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="10px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Report
            </Typography>
           
          </Box> */}
          <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
             Items Report
            </Typography>
          {/* <PieChart size = '80' /> */}
         {piData && <MyResponsivePie data={piData} />}
         
        </Box>
        
      
       {
        warehouseList.map((warehouse) => (
          <RecentSales name={warehouse.name}/>
        ))
       }



        {/* ROW 3 */}
        {/* <Box
          gridColumn={{ xs: "span 12", sm: "span 4" }}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box> */}
        {/* <Box
          gridColumn={{ xs: "span 12", sm: "span 4" }}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box> */}
        {/* <Box
          gridColumn={{ xs: "span 12", sm: "span 4" }}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box> */}
      </Box>
    </Box>
  );
};

export default Dashboard;
