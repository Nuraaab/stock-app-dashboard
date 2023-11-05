import { Box,Typography, useMediaQuery, useTheme } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LineChart from "../../../components/LineChart";
import StatBox from "../../../components/StatBox";
import  List from "@mui/icons-material/List";
import Store from "@mui/icons-material/Store";
import  LockClockOutlined  from "@mui/icons-material/LockClockOutlined";
import Shop2Outlined from "@mui/icons-material/Shop2Outlined";
import HistoryOutlined from "@mui/icons-material/HistoryOutlined";
import { tokens } from "../../../theme";
import { useEffect, useState } from "react";
import Axios from 'axios';
import { Link } from "react-router-dom";
import RecentSales from "../../../components/admincomponents/RecentSales";
import LinearProgress from "@mui/material/LinearProgress";
import MyResponsivePie from "../../../components/admincomponents/PiChart";
import Message from "../../../components/admincomponents/Message";
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
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [lineData, setLineData] = useState([]);
  const [openAlert, setOpenAlert] = useState(true);
  const isMobile = useMediaQuery('(max-width: 768px)');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const amountResponse = await Axios.get("/salleshistory/lineamount");
        const quantityResponse = await Axios.get("/salleshistory/linequantity");
  
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
        setLineData([AmountData, QuantityData]);
      } catch (error) {
      }
    };
  
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
  }, [lineData]);
    const [piData, setPiData] = useState('');
    useEffect(() => {
      Axios.get('/mainstore/pie').then((response) => {
          setPiData(response.data);
         }).catch((error) => {
         })
         // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setLoading(true);
   Axios.get('/items/getall').then((response) => {
     setTotalItem(response.data.length);
     setLoading(false);
   }).catch((error) => {
    if (error.response && error.response.data) {
      setOpenAlert(true);
      setErrorMessage(error.response.data);
    } else {
      setOpenAlert(true);
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
      setOpenAlert(true);
       setErrorMessage(error.response.data);
     } else {
      setOpenAlert(true);
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
      setOpenAlert(true);
       setErrorMessage(error.response.data);
     } else {
      setOpenAlert(true);
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
    }).catch((error) => {
     if (error.response && error.response.data) {
      setOpenAlert(true);
       setErrorMessage(error.response.data);
     } else {
      setOpenAlert(true);
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
      setOpenAlert(true);
       setErrorMessage(error.response.data);
     } else {
      setOpenAlert(true);
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
      setOpenAlert(true);
       setErrorMessage(error.response.data);
     } else {
      setOpenAlert(true);
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
      setOpenAlert(true);
       setErrorMessage(error.response.data);
     } else {
      setOpenAlert(true);
       setErrorMessage("An error occurred");
     }
     setLoading(false);
    })
   }, []);
  return (
    <Box m="0px"
    mb={isMobile ? 10 : undefined}
    >
    <Message message={errorMessage} openAlert={openAlert} setOpenAlert={setOpenAlert} severity='error'/>
      {loading && <LinearProgress  color="secondary"/>}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
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
            icon={
              <Store
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
          </Link>
        </Box>
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
          </Box>
        </Box>
        <Box
          gridColumn={{ xs: "span 12", sm: "span 12" }}
          gridRow={{xs: 'span 2', sm: 'span 3'}}
          backgroundColor={colors.primary[400]}
         p={2}
        >
          <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
             Items Report
            </Typography>
         {piData && <MyResponsivePie data={piData} />}
         
        </Box>
       {
        warehouseList.map((warehouse) => (
          <RecentSales name={warehouse.name}/>
        ))
       }
      </Box>
    </Box>
  );
};

export default Dashboard;
