import { useMutation, useQuery } from "@apollo/client"
import { ALL_AUTHORS, ALL_BOOKS, UPDATE_AUTHOR } from "../queries"
import { useState } from "react"

const Authors = (props) => {
  if (!props.show) {
    return null
  }

  const [authorName, setName] = useState("")
  const [bYear, setBYear] = useState("")

  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [ { query: ALL_BOOKS }, { query: ALL_AUTHORS } ],
    onError: (error) => console.log(error.message)
  })

  const result = useQuery(ALL_AUTHORS)
  if (result.loading) {
    return <div>Still loading...</div>
  }
  const authors = result.data.allAuthors


  const submit = async (event) => {
    event.preventDefault()
    updateAuthor({ variables: {name: authorName, born: bYear}})
    setName("")
    setBYear("")
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
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          <select value={authorName} onChange={({target}) => setName(target.value)}>
            {authors.map((a) => <option value={a.name} key={a.name}>{a.name}</option>)}
          </select>
        </div>
        <div>
          born
          <input
          type="number"
          value={bYear}
          onChange={({target}) => setBYear(parseInt(target.value))}
          />
        </div>
        <button type="submit">
          update author
        </button>
      </form>
    </div>
  )
}

export default Authors
