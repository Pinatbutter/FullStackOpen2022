import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notifReducer'
const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(( {anecdotes, filter}) => anecdotes.filter(({content}) => content.includes(filter)).sort((a, b) => b.votes - a.votes))
    const voteClicked = (id) => {
        dispatch(vote(id))
        const likedAnecdote = anecdotes.find(a => a.id === id)
        dispatch(setNotification(`you liked '${likedAnecdote.content}'`, 5000))
    }

    return(
    <>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => voteClicked(anecdote.id)}>vote</button>
                </div>
            </div>
        )}
    </>
    )
}

export default AnecdoteList