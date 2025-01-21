import { setNotification } from '../reducers/msgReducer';
import { createBlog } from '../reducers/blogReducer';
import { useDispatch } from 'react-redux';
import { Button, Box, TextField, Alert, Typography, Paper } from '@mui/material';
import { useState } from 'react';

const BlogForm = ({ toggle }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState();
  const [author, setAuthor] = useState();
  const [url, setUrl] = useState();
  const addBlog = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    let newBlog = { title: data.get('title'), author: data.get('author'), url: data.get('url') };
    dispatch(createBlog(newBlog));
    dispatch(setNotification(`a new blog ${data.get('title')} by ${data.get('author')} added`, 5000));
    toggle.current.toggleVisibility();
  };
  return (
    <>
      <Typography variant="h5" component="h4" sx={{ mt: 2, mb: 2 }} color="primary">
        Create New
      </Typography>
      <Box
        component="form"
        onSubmit={addBlog}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
        }}
      >
        Title: <TextField name="title" variant="standard" required />
        <br />
        <>
          {' '}
          Author: <TextField name="author" variant="standard" required />
          <br />
        </>
        <>
          {' '}
          url: <TextField name="url" variant="standard" required />
          <br />
        </>
        <Button type="submit" color="inherit" variant="outlined" id="createBlog">
          create
        </Button>
      </Box>
    </>
  );
};

export default BlogForm;
