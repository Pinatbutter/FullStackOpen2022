import { configureStore } from '@reduxjs/toolkit';

import notificationReducer from './reducers/msgReducer';
import blogReducer from './reducers/blogReducer';
import tokenReducer from './reducers/tokenReducer';
const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    blogs: blogReducer,
    userToken: tokenReducer,
  },
});
export default store;
