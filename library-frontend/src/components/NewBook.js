import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_BOOKS } from './queries'
import { updateCache } from '../App'
const NewBook = (props) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [published, setPublished] = useState(0)
  const [genre, setGenre] = useState("")
  const [genres, setGenres] = useState([])
  const [addBook] =  useMutation(ADD_BOOK, {
      update: (cache, response) => {
        console.log('data we are sending to update cache: ', (response.data.addBook))
        updateCache(cache, { query: ALL_BOOKS }, response.data.addBook)
      },
      onCompleted: (data)=>{
        console.log('book added succesfuly')
      } ,
      onError: (error)=>{console.log("error", error)}
    }
  )

  if (!props.show) {
    return null
  }
  const Submit = (e) => {
    e.preventDefault()
    addBook({ variables: { published, genres, author, title } }).then(()=>{
    setTitle('')
    setPublished(0)
    setAuthor('')
    setGenres([])
    setGenre('')
    })

  }
  const addGenre = (event) => {
    event.preventDefault();
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={Submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.valueAsNumber)}
          />
        </div>
        <div>
          <input
            value={genre}
            type="text"
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
