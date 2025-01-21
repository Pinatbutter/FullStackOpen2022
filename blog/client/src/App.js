import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { setToken } from './reducers/tokenReducer';
import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';
import UserList from './components/UserList';
import User from './components/User';
import Blog from './components/Blog';
import blogService from './services/blogs';
import { initializeBlogs } from './reducers/blogReducer';
import { Container, AppBar, Toolbar, IconButton, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const App = () => {
  const userToken = useSelector((store) => store.userToken);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setToken(user));
      blogService.setToken(user.token);
    }
  }, []);
  console.log(userToken);
  return (
    <Container>
      <Router>
        <AppBar position="sticky">
          <Toolbar variant="dense">
            <IconButton edge="start" color="secondary" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Button color="secondary" size="large" component={Link} to="/">
              home
            </Button>
            <Button color="secondary" size="large" component={Link} to="/users">
              users
            </Button>
          </Toolbar>
        </AppBar>
        {userToken === null ? (
          <LoginForm />
        ) : (
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:userId" element={<User />} />
            <Route path="/blogs/:blogId" element={<Blog />} />
          </Routes>
        )}
      </Router>
    </Container>
  );
};

export default App;
