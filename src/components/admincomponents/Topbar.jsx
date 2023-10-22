import * as React from 'react';
import { Avatar, Box, Divider, IconButton, ListItemIcon, Menu, Tooltip, useTheme } from "@mui/material";
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
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/Context';

const Topbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="end" p={2}>
      {/* SEARCH BAR */}
      {/* <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box> */}
{/* ICONS */}
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
        <IconButton>
          <Tooltip title="notifications">
            <Badge badgeContent={4} color="error">
              <NotificationsOutlinedIcon />
            </Badge>
          </Tooltip>
        </IconButton>
        {/* <IconButton>
          <Tooltip title="Account settings">
            <Link to="/my_account">
              <SettingsOutlinedIcon color='secondary'/>
            </Link>
          </Tooltip>
        </IconButton> */}
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
        <MenuItem onClick={handleClose} >
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
          <Link to="/my_account">
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <span style={{color:'white'}}>
          Settings
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
    </Box>
  );
};

export default Topbar;