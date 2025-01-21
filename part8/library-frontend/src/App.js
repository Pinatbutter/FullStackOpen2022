import { useState, useEffect } from 'react'
import { useQuery, useMutation, useSubscription, useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { ALL_AUTHORS, ALL_BOOKS, ME, BOOK_ADDED } from './components/queries'
import Recommend from './components/Recommend'

export const updateCache = (cache, query, addedBook) => {
  const uniqById = (a) => {
    let seen = new Set()
    let updatedList =  a.filter((book) => {
      let k = book.id
      return seen.has(k) ? false : seen.add(k)
    })
    return updatedList
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqById(allBooks.concat(addedBook)),
    }
  })
}
const App = () => {
  const [page, setPage] = useState('authors')
  const result = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS);
  const myGenre = useQuery(ME);
  const [token, setToken] = useState(null)
  const [error, setError] = useState("token expired")
  const [login, setLogin] = useState("login");
  const client = useApolloClient()

  const logout = () => {
    if(login === "login") {
      setPage('login');
      setToken(null)
      localStorage.clear()
      client.resetStore()
    }
    else{
      setToken(null)
      setLogin("logout")
      localStorage.clear()
      client.resetStore()
    }
  }
  useEffect(() => {
    if ( token ) {
      setLogin("logout")
      setPage('authors');
    }
  }, [token])
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setToken(token);
    }
  }, [])
  useSubscription(BOOK_ADDED, {
    onData: async ({ data, client }) => {
      const addedBook = data.data.bookAdded
      window.alert('added', addedBook.title);
      updateCache(client.cache, {query: ALL_BOOKS}, addedBook )
      await client.refetchQueries({
        include: [ALL_AUTHORS],
      });
    }
  })

  if (result.loading || books.loading || myGenre.loading) {
    return <div>loading...</div>
  }
  else console.log('ready')
  let recommendedBooks = books.data.allBooks.filter((b) => b.genres.includes(myGenre.data.me.favouriteGenre))
  console.log(result.data.allAuthors)
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {login==="logout"?
        <>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('reccomend')}>recommend</button>
        </>: null
        }

        <button onClick={logout}>{login}</button>
      </div>
        <Authors show={page === 'authors'} allAuthors={result.data.allAuthors} />
        <Books show={page === 'books'} allBooks={books.data.allBooks} />
        <Recommend show={page === 'reccomend'} recommendedBooks={recommendedBooks} />
        <NewBook show={page === 'add'} />
        <LoginForm show={page === 'login'} setLogin={setLogin} setToken={setToken} setError={setError} />
    </div>
  )
}

export default App