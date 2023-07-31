import { useState } from 'react'

const Display = ({persons}) => {
  return(
    persons.map(person => <p key={person.name} >{person.name}</p>)
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addNewName = (event) => {
    event.preventDefault()
    if (convertToLower(persons).includes(newName.toLowerCase())){
      alert(`${newName} is already added to the phonebook`)
    } else {
      const newPerson = {
        name: newName
      }
      setPersons(persons.concat(newPerson))
      setNewName("")
    }
  }

  const convertToLower = (persons) => {
    return(
      persons.map(person => person.name.toLowerCase())
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
          name: 
          <input 
          value={newName} 
          onChange={(event) => setNewName(event.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      <Display persons={persons}/>
    </div>
  )

}

export default App
