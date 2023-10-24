// import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { tokens } from '../../theme';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Avatar, useTheme } from "@mui/material";
import  Axios  from 'axios';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiDialog-paper': {
    width: '100%', // Adjust the width as needed
  },
}));
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
const Account = ({fullScreen, open, handleClose}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [adminName, setAdminName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  
  useEffect(() => {
    Axios.post('/auth/refresh',{
      withCredentials: true,
    }).then((response) => {
      setAdminName(response.data.adminName);
      setEmail(response.data.email);
      setPhone(response.data.phone);
      setRole(response.data.type);
       }).catch((error) => {
        console.log(error);
       })
}, []);
  return (
    <BootstrapDialog
      // fullScreen ={fullScreen}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Manage Profile
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers sx={{ display: 'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}> 
      <Avatar sx={{ m: 0, bgcolor: 'secondary.main', width: '150px',  
           height: '150px'}} >
           <img
                  alt="profile-user"
                  width="150px"
                  height="150px"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                  
                />
          </Avatar>
          <Typography gutterBottom variant="body1" style={{display: 'flex', justifyContent: 'center', alignItems:'center', marginTop: '5px'}}>
            {adminName}
          </Typography>
          <Typography gutterBottom variant="body1" style={{display: 'flex', justifyContent: 'center', alignItems:'center', marginTop: '5px'}}>
           {email}
          </Typography>
          <Typography gutterBottom variant="body1" style={{display: 'flex', justifyContent: 'center', alignItems:'center', marginTop: '5px'}}>
           {role}
          </Typography>
          <Typography gutterBottom variant="body1" style={{display: 'flex', justifyContent: 'center', alignItems:'center', marginTop: '5px'}}>
           {phone}
          </Typography>
      </DialogContent>
      <DialogActions style={{ justifyContent: 'center' }}> 
          <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
          Upload file
          <VisuallyHiddenInput type="file" />
        </Button>
        {/* <Button autoFocus onClick={handleClose}>
          Save changes
        </Button> */}
      </DialogActions>
    </BootstrapDialog>

  )
}

export default Account;