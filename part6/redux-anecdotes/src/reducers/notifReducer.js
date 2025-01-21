import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
let timeOutId = ''
const notifSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
      createNotification(state, action) {
        return action.payload
      },
      clearNotification(state, action) {
        return('')
      }
    }
  })
  export const { createNotification, clearNotification } = notifSlice.actions

  export const setNotification = (content, timer) => {
    return async dispatch => {
      clearTimeout(timeOutId)
      dispatch(createNotification(content))
      timeOutId = setTimeout(() => {
        dispatch(clearNotification())
      }, timer)
    }
  }
  export default notifSlice.reducer