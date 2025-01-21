import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { setNotification } from './msgReducer';
import { logout } from './tokenReducer';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(comment.fulfilled, (state, action) => {
      return state.map((a) => (a.id === action.payload.id ? action.payload : a));
    });
    builder.addCase(vote.fulfilled, (state, action) => {
      return state.map((a) => (a.id === action.payload.id ? action.payload : a));
    });
  },
});

export const { setBlogs, appendBlog, removeBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogList = await blogService.getAll().then((blogs) => {
      return blogs.filter((blog) => blog.userId !== undefined).sort((a, b) => b.likes - a.likes);
    });
    console.log(blogList);
    dispatch(setBlogs(blogList));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const anecId = await blogService.create(content).catch((err) => {
      if (err.message === 'Request failed with status code 401') {
        dispatch(setNotification('session expired, please log in again', 5000));
        dispatch(logout());
      }
    });
    const newAnecdote = await blogService.get(anecId.id);
    dispatch(appendBlog(newAnecdote));
  };
};
export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id).catch((err) => {
      if (err.message === 'Request failed with status code 401') {
        dispatch(setNotification('session expired, please log in again', 5000));
        dispatch(logout());
      }
    });
    dispatch(removeBlog(id));
  };
};
export const comment = createAsyncThunk('blogs/comment', async (data, { getState, dispatch }) => {
  const { content, id } = data;
  const blog = getState().blogs.find((n) => n.id === id);
  const addedComment = {
    ...blog,
    comments: blog.comments.concat(content),
  };
  const response = await blogService.update(id, addedComment).catch((err) => {
    if (err.message === 'Request failed with status code 401') {
      dispatch(setNotification('session expired, please log in again', 5000));
      dispatch(logout());
    } else console.log(err);
  });
  return addedComment;
});
export const vote = createAsyncThunk('blogs/vote', async (id, { getState, dispatch }) => {
  const likedBlog = getState().blogs.find((n) => n.id === id);
  console.log(likedBlog);
  const changedLike = {
    ...likedBlog,
    likes: likedBlog.likes + 1,
  };
  console.log(changedLike);
  const response = await blogService.update(id, changedLike).catch((err) => {
    if (err.message === 'Request failed with status code 401') {
      dispatch(setNotification('session expired, please log in again', 5000));
      dispatch(logout());
    }
  });
  console.log(response);
  return changedLike;
});

export default blogSlice.reducer;
