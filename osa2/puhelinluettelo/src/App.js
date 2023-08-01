import { useState, useEffect } from 'react'
import Comms from './services/Comms'

const Display = ({persons, deletPerson}) => {
  return(
    persons.map(person => {
      return(
        <div key={person.name}>
          {person.name} {person.number}
          <button onClick={() => deletPerson(person.id, person.name)}>Delete</button>
        </div>
      )
      })
  )
}

const AddPerson = ({newName, addNewName, newNumber,
  handleNameChange, handleNumberChange}) => {
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
    Comms.getAll()
    .then(response => setPersons(response))
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
      Comms.addNew(newPerson)
      .then(response => setPersons(persons.concat(response)))
      setNewName("")
      setNewNumber("")
    }
  }

  const deletAPerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      Comms
      .delPerson(id)
      setPersons(persons.filter(person => person.id !== id))
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
      <Display persons={peopleToDispay} deletPerson={deletAPerson}/>
    </div>
  )

}

export default App
