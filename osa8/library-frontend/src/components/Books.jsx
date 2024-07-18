import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import { useState } from "react"

const Books = (props) => {
  if (!props.show) {
    return null
  }

  const [chosenGenre, setChosenGenre] = useState(null)
  const result = useQuery(ALL_BOOKS, {
    variables: { genreToSearch: chosenGenre }
  })
  if (result.loading) {
    return <div>Still loading...</div>
  }
  let books = result.data.allBooks

  return (
    <div>
      <h2>books</h2>

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
      <div>
        {props.genres.map((g) => {
          return <button onClick={() => setChosenGenre(g)} key={g}>{g}</button>
        })}
        <button onClick={() => setChosenGenre(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
