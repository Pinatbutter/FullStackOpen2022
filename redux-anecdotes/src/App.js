import Notification from './components/Notification.js'
import AnecdoteForm from './components/AnecdoteForm.js'
import AnecdoteList from './components/AnecdoteList.js'
import FilterForm from './components/FilterForm.js'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import {initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      <FilterForm/>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App