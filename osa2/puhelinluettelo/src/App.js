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

const Notification = ({message}) => {
  if (message === null) {
    return null
  }
  const className = message.err 
    ? "error"
    : "notification"

  return (
    <div className={className}>
      {message.msg}
    </div>
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
  const [message, setMessage] = useState(null)

  useEffect(() => {
    Comms.getAll()
    .then(response => setPersons(response))
  }, [])

  const addNewName = (event) => {
    event.preventDefault()
    if (convertToLower(persons).includes(newName.toLowerCase())){
      if (window.confirm(`${newName} is already added to phonebook. Replace the old number?`)) {
        updateNumber()
        setNewName("")
        setMessage({msg: `The old number was succesfully replaced with ${newNumber}.`,
          err: false})
        setTimeout(() => {setMessage(null)}, 5000)
        setNewNumber("")
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      Comms.addNew(newPerson)
      .then(response => {
        setPersons(persons.concat(response))
        setMessage({msg: `${newName} was added to phonebook.`,
        err: false})
        setTimeout(() => {setMessage(null)}, 5000)
        console.log('whattagoindeoon')
        setNewName("")
        setNewNumber("")
      })
      .catch(error => {
        setMessage({msg: error.response.data.error, err: true})
        setTimeout(() => {setMessage(null)}, 5000)})
    }
  }

  const deletAPerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      Comms
      .delPerson(id)
      setPersons(persons.filter(person => person.id !== id))
      setMessage({msg: `${name} was deleted from phonebook.`,
        err: false})
      setTimeout(() => {setMessage(null)}, 5000)
    }
  }

  const convertToLower = (persons) => {
    return(
      persons.map(person => person.name.toLowerCase())
    )
  }
  const updateNumber = () => {
    const personToUpdt = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    const updtdPerson = {...personToUpdt, number: newNumber}
    Comms.update(updtdPerson.id, updtdPerson)
    .then(response => {
      setPersons(persons.map(person => person.id !== updtdPerson.id ? person : response))
    })
    .catch(error => {
      setMessage({ msg: `${personToUpdt.name} has already been deleted from phonebook.`,
        err: true})
      setTimeout(() => {setMessage(null)}, 5000)
      setPersons(persons.filter(person => person.id !== personToUpdt.id))
    })
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
      <Notification message={message}/>
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
