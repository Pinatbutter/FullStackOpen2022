import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { EDIT_AUTHOR, ALL_AUTHORS } from "./queries";

const Authors = ({allAuthors, show}) => {
  const [setBornTo, setYear] = useState();
  const [name, setName] = useState('');
  const [ changeBorn ] = useMutation(EDIT_AUTHOR, { refetchQueries: [ { query: ALL_AUTHORS } ]});
  const [authors, setAuthors] = useState(allAuthors);

  useEffect(() => {
    setAuthors(allAuthors)
  }, [allAuthors])

 // console.log(authors, allAuthors)
  
  if (!show) {
    return null
  }
  const updateAuthor = (event) => {
    event.preventDefault();
    console.log(name, typeof setBornTo, setBornTo)
    changeBorn({ variables: { name, setBornTo } })

  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.booksWritten}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birth year</h2>
      <form onSubmit={updateAuthor}>
          <select value={name} onChange={({target}) => setName(target.value)}>
            {authors.map((a) => <option key={a.name}  value={a.name}>{a.name}</option>)}
          </select>
          born <input type='number' onChange={({target})=> setYear(target.valueAsNumber)} />
          <button type="submit">update year born</button>
      </form>
    </div>
  )
}

export default Authors
