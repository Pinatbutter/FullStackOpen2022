import { createSlice } from '@reduxjs/toolkit';

const initialState = null;
let timeOutId = '';
const notifSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return null;
    },
  },
});
export const { createNotification, clearNotification } = notifSlice.actions;

export const setNotification = (content, timer) => {
  return async (dispatch) => {
    clearTimeout(timeOutId);
    dispatch(createNotification(content));
    timeOutId = setTimeout(() => {
      dispatch(clearNotification());
    }, timer);
  };
};
export default notifSlice.reducer;
