import { useState, useEffect } from "react";
const Books = ({ allBooks, show }) => {
  const [currentFilter, setFilter] = useState(null);
  const [bookList, setList] = useState(allBooks);

  useEffect(() => {
    setList(allBooks)
  }, [allBooks])

  if (!show) {
    return null
  }
  let genres = []
  allBooks.forEach((book) => {
    let addG = book.genres.filter((g) => !genres.includes(g))
    genres = genres.concat(addG)
  });

  const filterGenre = (genre) => {
    if(genre==="all"){
      setList(allBooks)
      setFilter(null)
    }
    else{
      console.log(genre)
      setList(allBooks.filter((book) => book.genres.includes(genre)) )
      setFilter(genre)
    }
  }

  return (
    <div>
      <h2>books</h2>
      {currentFilter? <p>in genre <strong>{currentFilter}</strong></p>: null}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {bookList.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />

      {genres.map((g)=>
        <button key={g} onClick={() => filterGenre(g)}>{g}</button>
      )}
      <button onClick={() => filterGenre("all")}>allGenres</button>
    </div>
  )
}

export default Books
