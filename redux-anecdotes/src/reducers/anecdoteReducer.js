import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(vote.fulfilled, (state, action)=>{
      return state.map(a => a.id === action.payload.id? action.payload: a)
    })
  }
})

export const {addVote, setAnecdotes, appendAnecdote} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}
export const vote = createAsyncThunk(
  'anecdotes/vote',
  async(id, {getState})=>{
    const likedAnecdote = getState().anecdotes.find(n => n.id === id)
    const changedLike = {
      ...likedAnecdote,
      votes: likedAnecdote.votes+1
    }
    const response = await anecdoteService.addLike(id, changedLike)
    return response
  }
)
export default anecdoteSlice.reducer