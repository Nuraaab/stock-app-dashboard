import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, useTheme } from "@mui/material";
import { tokens } from '../../theme';
import { Link, useNavigate } from 'react-router-dom';
import  Axios  from 'axios';
import { useState } from 'react';
import Message from '../../components/admincomponents/Message';
import CircularProgress from '@mui/material/CircularProgress';
import { useContext } from 'react';
import { AuthContext } from '../../context/Context';
import { Visibility, VisibilityOff } from '@mui/icons-material';
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
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [isPhoneSubmitted, setIsphoneSubmitted] = useState(false);
  const [isPhoneSent, setIsPhoneSent] = useState(false);
  const [isOtpSubmited, setIsOtpSubmitted] = useState(false);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const { refreshUser } = useContext(AuthContext)
  const { currentUser } = useContext(AuthContext)
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handlleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  React.useEffect(() => {
    if (currentUser) {
      navigate("/")
    }
  }
  );
        const handlePhone = () => {
          setIsphoneSubmitted(true);
          
            Axios.post('/auth/forgot', {
              phone: phone,
            }).then((response) => {
              console.log('otp sent');
              setIsPhoneSent(true);
              setIsphoneSubmitted(false);
              setIsOtpSubmitted(true);
            }).catch((error) => {
              console.log('error');
              console.log(error);
              setIsPhoneSent(false);
              setIsphoneSubmitted(false);
              if (error.response && error.response.data) {
                setErrorMessage(error.response.data);
              } else {
                setErrorMessage("An error occurred");
              }
            })
        
        }
        const handleReset = () => {
          setIsSubmited(true);
          if(password !== confirmPassword){
            setErrorMessage("Password should be the same.");
          }else{
          Axios.post('/auth/reset', {
            phone:phone,
            newPassword:password,
            otp:otp,
          }).then((response) => {
            refreshUser(null)
            localStorage.setItem("user", JSON.stringify(null))
              navigate('/login');
              setIsSubmited(false);
            console.log('success');
          }).catch((error) => {
            if (error.response && error.response.data) {
              setErrorMessage(error.response.data);
            } else {
              setErrorMessage("An error occurred");
            }
            setIsSubmited(false);
          })
        }
        }

        const handleOtp = (e) => {

              setOtp(e);

        }
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
          <Box   sx={{ mt: 1 }} width='100%' padding={0} margin={0}>
            {!isPhoneSent &&<TextField
              margin="normal"
              required
              fullWidth
              id="number"
              label="Enter Phone Number"
              name="phone"
              autoComplete="phone"
              autoFocus
              onChange={(e) => setPhone(e.target.value)}
            />}
            {!isPhoneSent &&  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            // sx={{ marginLeft: 'auto' }}
            onClick={() => handlePhone()}
          >
            {isPhoneSubmitted ? (<span style={{display:"flex"}}>please wait... <CircularProgress color='primary' size={30} /></span>) : 'Submit Phone'}
          </Button>
        </Box>}
           { isPhoneSent && <TextField
              margin="normal"
              required
              fullWidth
              name="otp"
              label="Enter the 6 digit code"
              type="number"
              id="otp"
              autoComplete="otp"
              onChange={(e) => handleOtp(e.target.value)}
            />}
             {isOtpSubmited &&  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            // sx={{ marginLeft: 'auto' }}
            onClick={() => handlePhone()}
          >
            {isPhoneSubmitted ? (<span style={{display:"flex"}}>please wait... <CircularProgress color='primary' size={30} /></span>) : 'Submit Otp'}
          </Button>
        </Box>}
            
            {isPhoneSent &&   <FormControl fullWidth>
              <InputLabel>Enter New Password</InputLabel>
            <OutlinedInput
              margin="normal"
              required
              fullWidth
              name="password"
              label="Enter New Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            </FormControl>
            }
            {isPhoneSent &&  <FormControl fullWidth>
              <InputLabel>Confirm Password</InputLabel>
            <OutlinedInput
              margin="normal"
              required
              fullWidth
              name="cpassword"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              id="password"
              autoComplete="c-password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handlleClickShowConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            </FormControl>
            }
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
          {isPhoneSent && <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => handleReset()}
            >
            {isSubmited ? (<span style={{display:"flex"}}>please wait... <CircularProgress color='primary' size={30} /></span>) : 'Submit'}
            </Button>}
            <Grid container>
              <Grid item xs>
                <Link href="/login" variant="body2">
                 Back to login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}