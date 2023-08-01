import { useState, useEffect } from 'react'
import axios from 'axios'

const Display = ({persons}) => {
  return(
    persons.map(person => <p key={person.name} >{person.name} {person.number}</p>)
  )
}

const AddPerson = ({newName, addNewName, newNumber, handleNameChange, handleNumberChange}) => {
  return(
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
  )
}

const FilterNames = ({filterStr, handleFilterChange}) => {
  return (
    <div> filter
      <input
      value={filterStr} 
      onChange={handleFilterChange}/>
      </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [filterStr, setFilterStr] = useState("")

  useEffect(() => {
    axios
    .get("http://localhost:3001/persons")
    .then(response => setPersons(response.data))
  }, [])

  const addNewName = (event) => {
    event.preventDefault()
    if (convertToLower(persons).includes(newName.toLowerCase())){
      alert(`${newName} is already added to the phonebook`)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      axios
      .post("http://localhost:3001/persons", newPerson)
      .then(response => setPersons(persons.concat(response.data)))
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

  const handleFilterChange = (event) => {
    setFilterStr(event.target.value)
  }

  const filterPhoneBook = () => {
    return (
      persons.filter(person => person.name.toLowerCase().includes(filterStr.toLowerCase()))
    )
  }

  const peopleToDispay = filterStr === ""
    ? persons
    : filterPhoneBook()

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterNames filterStr={filterStr} handleFilterChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <div>
        <AddPerson 
        newName={newName} 
        addNewName={addNewName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}/>
      </div>
      <h2>Numbers</h2>
      <Display persons={peopleToDispay}/>
    </div>
  )

}

export default App
