import { useEffect, useState } from "react";
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
// import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
// import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
// import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
// import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
// import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
// import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
// import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { Collapse } from "@mui/material";
import { tokens } from "../theme";
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Itemtest = ({ title, to, icon, selected, setSelected, subMenu , isCollapsed}) => {
   const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const handleSubMenuToggle = () => {
    setSelected(title);
    setIsSubMenuOpen(!isSubMenuOpen);
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[100],
          flexDirection: "row",
          alignItems: "center",
         
        }}
        onClick={() => handleSubMenuToggle()}
        icon={icon}
        suffix={!isCollapsed && (isSubMenuOpen ? <i className="fa fa-sort-up"></i> : <i className="fa fa-sort-down"></i>)}
      >
        <Typography>{title}</Typography>
        <Link to={to} />
      </MenuItem>
      {subMenu && (
        <Collapse in={isSubMenuOpen}>
          <div style={{ display: "flex", marginLeft: '20px', backgroundColor: colors.primary[500],justifyContent: 'space-between' }}>{subMenu}</div>
        </Collapse>
      )}
    </>
  );
};

const Sidebar = ({username, email}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
 console.log(username);
 console.log(email);
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                 SMS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 10px 10px" }}
                >
                  Stock Casher Name
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                Stock Casher Role
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "0px"}>
            <Item
              title="Dashboard"
              to="/casher"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography> */}
           
           
            {/* <Itemtest
              title="Items"
              to="/item"
              icon={<i class="fa fa-list"></i>}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
              subMenu={
                <Menu>
                  <MenuItem
                    active={selected === "View Items"}
                    icon ={<i class="fa-solid fa-eye"></i>}
                    onClick={() => setSelected("View Items")}
                  >
                    <Typography>View Items</Typography>
                    <Link to="/view_items" />
                  </MenuItem>
                  <MenuItem
                    active={selected === "Add Items"}
                    icon ={<i class="fa-solid fa-plus"></i>}
                    onClick={() => setSelected("Add Items")}
                  >
                    <Typography>Add Items</Typography>
                    <Link to="/add_items" />
                  </MenuItem>
                </Menu>
              }
            /> */}


            <Itemtest
              title="Store Items"
              to=""
              icon={<i class="fa fa-store"></i>}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
              subMenu={
                <Menu>
                  <MenuItem
                    active={selected === "View Main Store Items"}
                    icon= {<i class="fa-solid fa-eye"></i>}
                    onClick={() => setSelected("View Main Store Itemss")}
                  >
                    <Typography>View Main Store Items</Typography>
                    <Link to="/casher_view_main_store_items" />
                  </MenuItem>
                  <MenuItem
                    active={selected === "Add Main Store Items"}
                    icon= {<i class="fa-solid fa-plus"></i>}
                    onClick={() => setSelected("Add Main Store Itemss")}
                  >
                    <Typography>Add Main Store Items</Typography>
                    <Link to="/casher_add_main_store_items" />
                  </MenuItem>
                  <MenuItem
                    active={selected === "View Sub Store Items"}
                    icon ={<i class="fa-solid fa-eye"></i>}
                    onClick={() => setSelected("View Sub Store Items")}
                  >
                    <Typography>View Sub Store Items</Typography>
                    <Link to="/casher_view_sub_store_items" />
                  </MenuItem>
                  <MenuItem
                    active={selected === "Add Sub Store Items"}
                    icon ={<i class="fa-solid fa-plus"></i>}
                    onClick={() => setSelected("Add Sub Store Items")}
                  >
                    <Typography>Add Sub Store Items</Typography>
                    <Link to="/casher_add_sub_store_items" />
                  </MenuItem>
                  <MenuItem
                    active={selected === "View Shope Items"}
                    icon ={<i class="fa-solid fa-eye"></i>}
                    onClick={() => setSelected("View Shope Items")}
                  >
                    <Typography>Add Shope Items</Typography>
                    <Link to="/casher_add_shope_items" />
                  </MenuItem>
                  <MenuItem
                    active={selected === "Add Shope Items"}
                    icon ={<i class="fa-solid fa-plus"></i>}
                    onClick={() => setSelected("Add Shope Items")}
                  >
                    <Typography>Add Shope Items</Typography>
                    <Link to="/casher_add_shope_items" />
                  </MenuItem>
                </Menu>
              }
            />
             
             {/* <Itemtest
              title="Users"
              to="/users"
              icon={<i class="fa fa-user"></i>}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
              subMenu={
                <Menu>
                  <MenuItem
                    active={selected === "View Users"}
                    icon ={<i class="fa-solid fa-eye"></i>}
                    onClick={() => setSelected("View Users")}
                  >
                    <Typography>View Users</Typography>
                    <Link to="/view_user" />
                  </MenuItem>
                  <MenuItem
                    active={selected === "Add Users"}
                    icon ={<i class="fa-solid fa-plus"></i>}
                    onClick={() => setSelected("Add Users")}
                  >
                    <Typography>Add Users</Typography>
                    <Link to="/add_users" />
                  </MenuItem>
                </Menu>
              }
            /> */}

            
             {/* <Itemtest
              title="WareHouses"
              to="/warehouse"
              icon={<i class="fa fa-store"></i>}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
              subMenu={
                <Menu>
                  <MenuItem
                    active={selected === "View WareHouses"}
                    icon ={<i class="fa-solid fa-eye"></i>}
                    onClick={() => setSelected("View WareHouses")}
                    sx={{ m: "15px 0 5px 20px" }}
                  >
                    <Typography>View WareHouses</Typography>
                    <Link to="/view_ware_house" />
                  </MenuItem>
                  <MenuItem
                    active={selected === "Add WareHouses"}
                    icon ={<i class="fa-solid fa-plus"></i>}
                    onClick={() => setSelected("Add WareHouses")}
                  >
                    <Typography>Add WareHouses</Typography>
                    <Link to="/add_ware_house" />
                  </MenuItem>
                </Menu>
              }
            /> */}

            {/* <Itemtest
              title="Item Spacification"
              to="/spacification"
              icon={<i class="fa-solid fa-file-contract"></i>}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
              subMenu={
                <Menu>
                  <MenuItem
                    active={selected === "View Spacification"}
                    icon ={<i class="fa-solid fa-eye"></i>}
                    onClick={() => setSelected("View Spacification")}
                  >
                    <Typography>View Spacification</Typography>
                    <Link to="/view_spacification" />
                  </MenuItem>
                  <MenuItem
                    active={selected === "Add Spacification"}
                    icon={<i class="fa-solid fa-plus"></i>}
                    onClick={() => setSelected("Add Spacification")}
                  >
                    <Typography>Add Spacification</Typography>
                    <Link to="/add_spacification" />
                  </MenuItem>
                </Menu>
              }
            /> */}

             <Item
              title="Pending"
              to="/pending"
              icon={<i class="fa fa-clock"></i>}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="History"
              to="/history"
              icon={<i class="fa fa-history"></i>}
              selected={selected}
              setSelected={setSelected}
            />

            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            > */}
              {/* Pages
            </Typography>
            <Item
              title="Profile Form"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}


            {/* <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
{/* 
<Itemtest
  title=" Chart"
  to="/geography"
  icon={<MapOutlinedIcon />}
  selected={selected}
  setSelected={setSelected}
  isCollapsed={isCollapsed}
  subMenu={
    <Menu>
      <MenuItem
        active={selected === "Sub Item 1"}
        onClick={() => setSelected("Sub Item 1")}
      >
        <Typography>Sub Item 1</Typography>
        <Link to="/sub-item-1" />
      </MenuItem>
      <MenuItem
        active={selected === "Sub Item 2"}
        onClick={() => setSelected("Sub Item 2")}
      >
        <Typography>Sub Item 2</Typography>
        <Link to="/sub-item-2" />
      </MenuItem>
    </Menu>
  }
/> */}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
