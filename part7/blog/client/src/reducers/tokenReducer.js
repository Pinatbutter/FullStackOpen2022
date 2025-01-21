import { createSlice } from '@reduxjs/toolkit';

const tokenSlice = createSlice({
  name: 'token',
  initialState: null,
  reducers: {
    setToken(state, action) {
      return action.payload;
    },
    logout(state, action) {
      window.localStorage.removeItem('loggedInUser');
      return null;
    },
  },
});

export const { setToken, logout } = tokenSlice.actions;

export default tokenSlice.reducer;
