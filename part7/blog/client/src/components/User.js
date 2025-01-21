/* eslint-disable indent */
import userService from '../services/users.js';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { logout } from '../reducers/tokenReducer.js';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Alert,
  Paper,
  Button,
  Box,
  Typography,
} from '@mui/material';
const UserList = () => {
  const [users, setUsers] = useState(null);
  const userToken = useSelector((store) => store.userToken);
  const notification = useSelector((store) => store.notifications);
  const dispatch = useDispatch();
  const id = useParams().userId;
  useEffect(() => {
    const fetchUsers = async () => {
      let allUsers = await userService.getAll();
      setUsers(allUsers);
    };
    fetchUsers();
  }, []);
  let displayUser = null;
  if (users !== null) displayUser = users.find((u) => u.id === id);

  return (
    <Box sx={{ mt: 5, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h3" color="text.secondary">
        Users
      </Typography>
      {notification !== null ? <Alert severity="info">{notification}</Alert> : null}
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 1, mt: 1 }}>
        <Typography fontSize={16} variant="subtitle2" color="text.primary">
          {userToken.name} logged-in
        </Typography>
        <Button sx={{ ml: 2 }} color="inherit" size="small" variant="outlined" onClick={() => dispatch(logout())}>
          logout
        </Button>
      </Box>
      {users === null ? null : (
        <div>
          <h2>{displayUser.name}</h2>
          <strong>added blogs</strong>
          <ul>
            {displayUser.blogs.map((blog) => (
              <li key={blog.id}>{blog.title}</li>
            ))}
          </ul>
        </div>
      )}
    </Box>
  );
};

export default UserList;
