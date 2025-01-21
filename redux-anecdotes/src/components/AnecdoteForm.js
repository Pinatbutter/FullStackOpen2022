import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notifReducer'
import { connect } from 'react-redux'
const AnecdoteForm = (props) => {
    const addAnecdote = async(event) => {
        event.preventDefault()
        const content = event.target.create.value
        event.target.create.value = ''
        props.createAnecdote(content)
        props.setNotification(`you created '${content}'`, 5000)

    }
    return (
        <>
            <h2>create new</h2>
            <form  onSubmit={addAnecdote} >
            <div><input name='create' /></div>
            <button type='submit'>create</button>
            </form>
        </>
    )
}

const mapDispatchToProps = {
    createAnecdote, setNotification
}
const ConnectedForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedForm