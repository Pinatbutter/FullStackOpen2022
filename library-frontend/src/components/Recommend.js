const Recommend = ({ recommendedBooks, show }) => {
  let books = recommendedBooks;

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>books in your favorite genre <strong>patterns</strong></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
