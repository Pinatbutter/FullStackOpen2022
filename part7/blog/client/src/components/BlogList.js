import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Togglable from './Togglable';
import BlogForm from './BlogForm';
import { Button, Box, Alert, Typography, Paper } from '@mui/material';
import { logout } from '../reducers/tokenReducer';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const blogs = useSelector((store) => store.blogs);
  const userToken = useSelector((store) => store.userToken);
  const notification = useSelector((store) => store.notifications);
  const dispatch = useDispatch();
  const blogFormRef = useRef();

  return (
    <Box sx={{ mt: 5, display: 'flex', flexDirection: 'row' }}>
      <Box sx={{ alignItems: 'left', width: '50%' }}>
        <Typography variant="h3" color="text.secondary">
          Blogs
        </Typography>
        {notification !== null ? <Alert severity="info">{notification}</Alert> : null}
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 1, mt: 1 }}>
          <Typography variant="subtitle2" color="text.primary">
            {userToken.name} logged-in
          </Typography>
          <Button sx={{ ml: 2 }} color="inherit" size="small" variant="outlined" onClick={() => dispatch(logout())}>
            logout
          </Button>
        </Box>
        <Paper elevation={0} sx={{ paddingLeft: 2, border: 'solid', borderWidth: 3, borderColor: '#546e7a' }}>
          {blogs.map((blog) => (
            <Typography key={blog.id} variant="h6" color="primary" component={Link} to={`/blogs/${blog.id}`}>
              {blog.title}
              <br />
            </Typography>
          ))}
        </Paper>
      </Box>
      <Box sx={{ mt: 8, ml: 4, display: 'flex', flexDirection: 'column' }}>
        <Togglable buttonLabel="create" cancelLabel="cancel" ref={blogFormRef}>
          <BlogForm toggle={blogFormRef} />
        </Togglable>
      </Box>
    </Box>
  );
};

export default BlogList;
