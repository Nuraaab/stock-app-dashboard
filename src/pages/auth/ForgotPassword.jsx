import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useTheme } from "@mui/material";
import { tokens } from '../../theme';
import { useNavigate } from 'react-router-dom';
import  Axios  from 'axios';
import { useState } from 'react';
import Message from '../../components/admincomponents/Message';
import CircularProgress from '@mui/material/CircularProgress';
import { useContext } from 'react';
import { AuthContext } from '../../context/Context';
// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function ForgotPassword() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmited, setIsSubmited] = useState(false);
  const [openAlert, setOpenAlert] = useState(true);
  // const [submitStatus, setSubmitStatus] = useState(false);
  // const [submitPhoneNumber, setSubmitPhoneNumber] = useState(true);
  // const [phone, setPhone] = useState('');
  // const [isPhoneSubmitted, setIsphoneSubmitted] = useState(false);
  // const [isEmailsent, setIsEmailSent] = useState(false);
  // const [isUserVerified, setIsUserVerified] = useState(false);
  const navigate = useNavigate();
  const { refreshUser } = useContext(AuthContext)
  const handleSubmit = (event) => {
    setIsSubmited(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    Axios.post('/auth/login', {
        email: data.get('email'),
        password: data.get('password'),
       }).then((response) => {
        // setMessage("You are logged in successfully!!")
        setIsSubmited(false);
        refreshUser(response.data||  null)
        localStorage.setItem("user", JSON.stringify(response.data  ||null))
          navigate('/');
       }).catch((error) => {
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage("An error occurred");
        }
        setIsSubmited(false)
       })
  };
        // const handlePhone = () => {
        //   setIsphoneSubmitted(true);
        // Axios.post('/auth/forgot', {
        //   phone: phone,
        // }).then((response) => {
        //   setIsphoneSubmitted(false);
        // }).catch((error) => {
        //   setIsphoneSubmitted(false);
        // })
        // }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            px: 2,
            py: 6,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
         <Message message={errorMessage} openAlert={openAlert} setOpenAlert={setOpenAlert} severity='error'/>
         
         <Avatar sx={{ m: 0, bgcolor: 'secondary.main', width: '80px', 
           height: '80px'}} >
           <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
          </Avatar>
          <Typography mt={5}  variant="h6" color={colors.grey[300]}  
          sx={{
            fontSize: 14, 
              }}>
          Enter the credentials below to reset your password
        </Typography>
          <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="number"
              label="Enter Phone Number"
              name="phone"
              autoComplete="phone"
              autoFocus
              // onChange={(e) => setPhone(e.target.value)}
            />
            {/* {submitPhoneNumber &&  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            sx={{ marginLeft: 'auto' }}
            onClick={() => handlePhone()}
          >
            {isPhoneSubmitted ? (<span style={{display:"flex"}}>please wait... <CircularProgress color='primary' size={30} /></span>) : 'Submit Phone'}
          </Button>
        </Box>} */}
           {/* { isEmailsent && <TextField
              margin="normal"
              required
              fullWidth
              name="otp"
              label="Enter the code sent to your email"
              type="number"
              id="otp"
              autoComplete="otp"
            />}
            {isEmailsent && isUserVerified && <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Enter New Password"
              type="password"
              id="password"
              autoComplete="new-password"
            />} */}
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
           <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
            {isSubmited ? (<span style={{display:"flex"}}>please wait... <CircularProgress color='primary' size={30} /></span>) : 'Submit'}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}