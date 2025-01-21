import { comment, deleteBlog, vote } from '../reducers/blogReducer';
import { setNotification } from '../reducers/msgReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { logout } from '../reducers/tokenReducer';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import {
  Button,
  Box,
  Link,
  TextField,
  Divider,
  Card,
  CardContent,
  Alert,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
} from '@mui/material';

const Blog = () => {
  const [comInput, setComment] = useState('');
  const [open, setOpen] = useState(false);

  const id = useParams().blogId;
  const blog = useSelector((store) => store.blogs).find((b) => b.id === id);
  const notification = useSelector((store) => store.notifications);
  const userToken = useSelector((store) => store.userToken);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleClickOpen = (e) => {
    e.preventDefault();
    if (blog.userId.id === userToken.id) setOpen(true);
    else dispatch(setNotification('This blog was added by another user', 5000));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (blog.userId.id !== userToken.id) {
      dispatch(setNotification('This blog was added by another user', 5000));
    } else {
      dispatch(deleteBlog(id));
      dispatch(setNotification('Blog deleted successfully!', 5000));
      nav('/');
    }
  };
  console.log(comInput);
  return (
    <Box sx={{ mt: 5, display: 'flex', flexDirection: 'column' }}>
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
      {blog === undefined ? null : (
        <div>
          <Card sx={{ minWidth: 500 }} variant="outlined">
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography sx={{ fontSize: 34, fontWeight: 'bold' }} color="text.secondary">
                {blog.title}-{blog.author}
              </Typography>
              <Typography sx={{ mb: 2, fontSize: 20 }} color="primary">
                {blog.likes} likes
                <Button
                  sx={{ ml: 2 }}
                  endIcon={<ThumbUpIcon />}
                  color="primary"
                  size="small"
                  variant="contained"
                  onClick={() => dispatch(vote(blog.id))}
                >
                  like
                </Button>
              </Typography>
              <Typography
                variant="subtitle1"
                component={Link}
                underline="always"
                rel="noopener"
                target="_blank"
                href={blog.url}
              >
                Read Blog
              </Typography>
              <Divider variant="middle" role="presentation" sx={{ width: '40%', mb: 1, mt: 1 }} />
              <Typography variant="body2" color="text.secondary">
                added by {blog.userId.name}
              </Typography>
            </CardContent>
          </Card>
          <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
            remove
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{
              color: '#00000',
              width: 400,
            }}
          >
            <DialogTitle id="alert-dialog-title">{'Are you sure you want to delete this blog?'}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Once deleted there will be no record of it anywhere
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleDelete} autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
          <Typography align="left" component="h1" marginTop={2} variant="h4" color="text.secondary">
            Comments
          </Typography>

          <Card sx={{ minWidth: 500 }} variant="outlined">
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
              {blog.comments.map((c, index) => (
                <li key={index}>{c}</li>
              ))}
            </CardContent>
          </Card>
          <Box
            component="form"
            onSubmit={() => dispatch(comment({ content: comInput, id: blog.id }))}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <TextField
              variant="standard"
              sx={{
                '& .MuiInputLabel-root ': {
                  color: '#a6bfcc',
                },
              }}
              label="add commet"
              onChange={({ target }) => setComment(target.value)}
            />
            <br />
            <Button type="submit" color="primary" variant="contained" sx={{ mt: 3, mb: 2 }}>
              add
            </Button>
          </Box>
        </div>
      )}
    </Box>
  );
};

export default Blog;
