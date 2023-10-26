import * as React from 'react';
import { Avatar, Box, Divider, IconButton, ListItemIcon, Menu, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import Badge from '@mui/material/Badge';
import SearchIcon from "@mui/icons-material/Search";
import { MenuItem } from 'react-pro-sidebar';
import { Logout, Person, PersonAdd, Settings } from '@mui/icons-material';
import axios from 'axios';
import Axios from 'axios';
import { useEffect, useState } from "react";
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/Context';
import { formatDistanceToNow } from 'date-fns';
import Account from './Account';
const styles = {
  notification: {
    padding: '10px',
    borderRadius: '5px',
    cursor:'pointer'
  },
  notificationInfo: {
    fontSize: '14px',
    color: '#fff',
    margin: '0',
  },
  cashier: {
    fontWeight: 'bold',
  },
  quantity: {
    fontStyle: 'italic',
  },
};
const Topbar = () => {
 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openAccount, setOpenAccount] = React.useState(false);

  const [anchorE2, setAnchorE2] = React.useState(null);
  const openNot = Boolean(anchorE2);
  const [openAccountNot, setOpenAccountNot] = React.useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickNot = (event) => {
    setAnchorE2(event.currentTarget);
  };
  const handleClickOpen = () => {
    setOpenAccount(true);
};

    const handleCloseAccount = () => {
      setOpenAccount(false);
    };
   
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseNot = () => {
    setAnchorE2(null);
  };
  const { refreshUser } = useContext(AuthContext)


  const logout = async (e) => {

    try {
      await axios.post('/auth/logout').then((response) => {
        refreshUser(null)
        localStorage.setItem("user", JSON.stringify(null))
        Navigate("/")
      }).catch((error) => {
        console.log(error);
      })
    } catch (err) {
      console.log(err)
    }
  }
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const colorMode = useContext(ColorModeContext);
  const [notifications, setNotifiCations] = useState([]);
  const [errorMessage, setErrorMessage] =useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    Axios.get('/toshoppending/getall').then((response) => {
    setNotifiCations(response.data);
    setCount(response.data.length);
    console.log('count' + count);
     }).catch((error) => {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage("An error occurred");
      }
     })
  }, []);
  return (
    <Box display="flex" justifyContent="end" p={2}>
    
  <Account  fullScreen ={fullScreen} open= {openAccount}  handleClose = {handleCloseAccount}/>
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          <Tooltip title={theme.palette.mode === "dark" ? "Light mode" : "Dark mode"}>
            {theme.palette.mode === "dark" ? (
              <LightModeOutlinedIcon />
            ) : (
              <DarkModeOutlinedIcon />
            )}
          </Tooltip>
        </IconButton>
        <IconButton >
          <Tooltip title="notifications">
            <Badge badgeContent={count} color="error"> 
              <NotificationsOutlinedIcon  onClick={handleClickNot}/>
            </Badge>
          </Tooltip>
        </IconButton>
    
        <IconButton>
          <Tooltip title="Account">
            <PersonOutlinedIcon
              onClick={handleClick} />
          </Tooltip>
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            p: 2,
            paddingRight: 5,
            paddingTop: 2,
            paddingLeft: 2,
            paddingBottom: 2,
            '& .MuiAvatar-root': {
              width: 30,
              height: 30,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => handleClickOpen()} >
          <ListItemIcon >
            <Person  fontSize= 'small'/>
          </ListItemIcon>
          My account
        </MenuItem>
        <Divider sx={{
          marginTop: '10px'
        }}/>
        <Link to="/add_users" >
          <MenuItem >
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            <span style={{color:'white'}}>
            New account
            </span>
          </MenuItem>
        </Link>
        <MenuItem onClick={handleClose}>
          <Link to="/changePass">
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <span style={{color:'white'}}>
          Change Password
          </span>
          </Link>
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="medium" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Menu
        anchorEl={anchorE2}
        id="account-menu"
        open={openNot}
        onClose={handleCloseNot}
        onClick={handleCloseNot}
        
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            p: 2,
            paddingRight: 5,
            paddingTop: 2,
            paddingLeft: 2,
            paddingBottom: 2,
            '& .MuiAvatar-root': {
              width: 30,
              height: 30,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
              {notifications.map((message) => (
          <div key={message._id} style={styles.notification}>
            <p style={styles.notificationInfo}>
              <Link style={{color: 'white'}} to='/pendingshopitems'>
              <span style={styles.cashier}>{message.cashierName}</span> requested <span style={styles.quantity}>{message.quantity}</span> {message.name} {formatDistanceToNow(new Date(message.createdAt))} ago
              </Link>
            </p>
          </div>
        ))}
      </Menu>
    </Box>
  );
};

export default Topbar;