import loginService from '../services/logins.js';
import blogService from '../services/blogs.js';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../reducers/tokenReducer.js';
import { setNotification } from '../reducers/msgReducer';
import { useNavigate } from 'react-router-dom';
import { Button, Box, TextField, Alert, Typography } from '@mui/material';

const LoginForm = () => {
  const dispatch = useDispatch();
  const msg = useSelector((store) => store.notifications);
  const userToken = useSelector((store) => store.userToken);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    try {
      const authorization = await loginService.login({
        username: data.get('username'),
        password: data.get('password'),
      });
      dispatch(setToken(authorization));
      blogService.setToken(authorization.token);
      window.localStorage.setItem('loggedInUser', JSON.stringify(authorization));
      navigate('/');
    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 7000));
    }
  };

  return (
    <>
      {userToken === null ? (
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{
            mt: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <Typography component="h1" variant="strong" color="primary">
            Log in to application
          </Typography>
          {msg !== null ? <Alert severity="error">{msg}</Alert> : <></>}
          <TextField
            color="primary"
            margin="normal"
            required
            fullWidth
            name="username"
            label="username"
            sx={{
              '& .MuiInputLabel-root ': {
                color: '#a6bfcc',
              },
            }}
          />
          <TextField
            color="primary"
            margin="normal"
            required
            fullWidth
            type="password"
            name="password"
            label="password"
            sx={{
              '& .MuiInputLabel-root ': {
                color: '#a6bfcc',
              },
            }}
          />
          <Button type="submit" color="primary" variant="contained" sx={{ mt: 3, mb: 2 }}>
            login
          </Button>
        </Box>
      ) : null}
    </>
  );
};

export default LoginForm;
