import { useEffect, useState } from "react";
import Axios from 'axios';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { Collapse } from "@mui/material";
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
        {/* <Link to={to} /> */}
      </MenuItem>
      {subMenu && (
        <Collapse in={isSubMenuOpen}>
          <div style={{ display: "flex", marginLeft: '20px', backgroundColor: colors.primary[500],justifyContent: 'space-between' }}>{subMenu}</div>
        </Collapse>
      )}
    </>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  useEffect(() => {
    Axios.post('http://94.130.104.15/api/auth/refresh').then((response) => {
        setUserName(response.data.adminName);
        setEmail(response.data.email);
        console.log(username);
        console.log(email);
       }).catch((error) => {
        console.log(error);
       })
}, [])
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
                  Stock Maneger Name
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                Stock Maneger Role
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "0px"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Itemtest
              title="Items"
              to="/dashboard"
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
            />
            <Itemtest
              title="Store Items"
              to="/dashboard"
              icon={<i class="fa fa-store"></i>}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
              subMenu={
                <Menu>
                  <MenuItem
                    active={selected === "Main Store"}
                    icon= {<i class="fas fa-store"></i>}
                    onClick={() => setSelected("Main Store")}
                  >
                    <Typography>Main Store Items</Typography>
                    <Link to="/mainstore" />
                  </MenuItem>
                  <MenuItem
                    active={selected === "Order"}
                    icon= {<i class="fas fa-download"></i>}
                    onClick={() => setSelected("Order")}
                  >
                    <Typography>New Order</Typography>
                    <Link to="/import" />
                  </MenuItem>
                  <MenuItem
                    active={selected === "Sub Store Items"}
                    icon ={<i class="fas fa-building"></i>}
                    onClick={() => setSelected("Sub Store Items")}
                  >
                    <Typography>Sub Store Items</Typography>
                    <Link to="/sub_store_items" />
                  </MenuItem>
                  {/* <MenuItem
                    active={selected === "Add Sub Store Items"}
                    icon ={<i class="fa-solid fa-plus"></i>}
                    onClick={() => setSelected("Add Sub Store Items")}
                  >
                    <Typography>Add Sub Store Items</Typography>
                    <Link to="/add_sub_store_items" />
                  </MenuItem> */}
                  <MenuItem
                    active={selected === "Shop Items"}
                    icon ={<i class="fas fa-shopping-bag"></i>}
                    onClick={() => setSelected("Shop Items")}
                  >
                    <Typography>Shop Items</Typography>
                    <Link to="/shop_items" />
                  </MenuItem>
                  {/* <MenuItem
                    active={selected === "Add Shop Items"}
                    icon ={<i class="fa-solid fa-plus"></i>}
                    onClick={() => setSelected("Add Shop Items")}
                  >
                    <Typography>Add Shop Items</Typography>
                    <Link to="/add_shop_items" />
                  </MenuItem> */}
                </Menu>
              }
            />
             
             <Itemtest
              title="Users"
              to="/dashboard"
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
                    <Link to="/view_users" />
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
            />
             <Itemtest
              title="WareHouses"
              to="/dashboard"
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
            />
            <Itemtest
              title="Item Spacification"
              to="/dashboard"
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
            />
             <Itemtest
              title="Item Type"
              icon={<i class="fa-solid fa-file-contract"></i>}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
              subMenu={
                <Menu>
                  <MenuItem
                    active={selected === "View Item Type"}
                    icon ={<i class="fa-solid fa-eye"></i>}
                    onClick={() => setSelected("View Item Type")}
                  >
                    <Typography>View Item Type</Typography>
                    <Link to="/view_item_type" />
                  </MenuItem>
                  <MenuItem
                    active={selected === "Add Item Type"}
                    icon={<i class="fa-solid fa-plus"></i>}
                    onClick={() => setSelected("Add Item Type")}
                  >
                    <Typography>Add Item Type</Typography>
                    <Link to="/add_item_type" />
                  </MenuItem>
                </Menu>
              }
            />
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
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
