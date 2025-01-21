/* eslint-disable indent */
import userService from '../services/users.js';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
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
  useEffect(() => {
    const fetchUsers = async () => {
      let allUsers = await userService.getAll();
      setUsers(allUsers);
    };
    fetchUsers();
  }, []);

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
        <TableContainer component={Paper} sx={{ minWidth: 100, maxWidth: 300, alignItems: 'center' }} elevation={0}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: 24, fontWeight: 'bold', color: 'text.secondary' }} align="center">
                  User
                </TableCell>
                <TableCell sx={{ fontSize: 24, fontWeight: 'bold', color: 'text.secondary' }} align="center">
                  Blogs Created
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell sx={{ fontSize: 20 }} align="center" component="th" scope="row">
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </TableCell>
                  <TableCell sx={{ fontSize: 20 }} align="center">
                    {user.blogs.length}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default UserList;
