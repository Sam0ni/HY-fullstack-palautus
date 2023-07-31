import { useState } from 'react'

const Display = ({persons}) => {
  return(
    persons.map(person => <p key={person.name} >{person.name} {person.number}</p>)
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: "040-1233210"
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")

  const addNewName = (event) => {
    event.preventDefault()
    if (convertToLower(persons).includes(newName.toLowerCase())){
      alert(`${newName} is already added to the phonebook`)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newPerson))
      setNewName("")
      setNewNumber("")
    }
  }

  const convertToLower = (persons) => {
    return(
      persons.map(person => person.name.toLowerCase())
    )
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
          name: 
          <input 
          value={newName} 
          onChange={handleNameChange}
          />
        </div>
        <div>number: 
          <input 
          value={newNumber} 
          onChange={handleNumberChange}/>
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
