import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch} from 'react-redux';
import { setUser } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';
import "../styles/Login.css"
// import { useSelector } from 'react-redux';

//mui
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';

import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles'; // root of tree


const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const user = useSelector((state) => state.user);s


  const handleLogin = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget)
    console.log({
      email: data.get('email'),
      password: data.get('password')
    })

    try {
      const response = await axios.post('/api/login', {
         email,
        password, 
      }, {
        headers: {
          'Content-Type': 'application/json', // Ensure the content type is set to JSON
        },
      });

      console.log('API Response:',  response.data.user.name);

      if(response.data && response.data.user){
        // Dispatch the user data to the Redux store
        dispatch(setUser({
          id: response.data.user.id,
          email: response.data.user.email,
          name: response.data.user.name,
          role: response.data.user.role,
        }));

      console.log(response.data.user)
      
      // alert('Login successful!');
      setEmail('');
      setPassword('');
      // Redirect or update UI upon successful login
      navigate('/');
      }else {
        console.log(response.data.user)
        setError(error.response?.data?.message || 'Login failed')
      }

    } catch (error) {
      // Log error details for debugging
      console.error('Login error:', error.response?.data || error);
      // Set error message to state to display it to the user
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'black',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e)=> setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              
              type="password"
              
              autoComplete="current-password"
              // autoFocus

              onChange={(e)=> setPassword(e.target.value)}
            />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 33, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        efootball
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
      </Container>
    </ThemeProvider>
  );

  // return (
  //   <div className='login-container'>
  //     <form className='login-form' onSubmit={handleLogin}>
  //       <input
  //         type="email"
  //         placeholder="Email"
  //         value={email}
  //         onChange={(e) => setEmail(e.target.value)}
  //         required
  //       />
  //       <input
  //         type="password"
  //         placeholder="Password"
  //         value={password}
  //         onChange={(e) => setPassword(e.target.value)}
  //         required
  //       />
  //       <button type="submit">Login</button>
  //     </form>
  //     {error && <p style={{ color: 'red' }}>{error}</p>}
  //     {user.id ? <div>Welcome, {user.name}</div> : <div>Please log in</div>}
  //   </div>
  // );

};

export default Login;
