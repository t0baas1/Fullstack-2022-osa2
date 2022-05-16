import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/persons'
import './index.css'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        console.log('promise fulfilled')
        setPersons(persons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    console.log(newName)
    const personObject = {
      name: newName,
      number: newNumber
    }
    console.log(personObject.name, personObject.number)

    if (persons.some(person => person['name'] === newName) === true) {
      if (window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)){
        const person = persons.find(person => person.name === personObject.name)
        const editedPerson = { ...person, number: personObject.number}

        personService
          .update(editedPerson.id, editedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== editedPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setErrorMessage(`Information of ${person.name} has already been removed from the server`)
            setTimeout(() => {
              setErrorMessage(null)}, 5000)
            })
            setPersons(persons.filter(p => p.id !== person.id))
          }
    } else { 
      personService
        .create(personObject)
        .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setSuccessMessage(`${personObject.name} was added to the phonebook`)
        setTimeout(() => {
          setSuccessMessage(null)}, 5000)
        setNewName('')
        setNewNumber('')
        })
    }
  }

  const deletePerson = person => {
    if(window.confirm(`Delete ${person.name} ?`)){
      const id = person.id
      personService
        .deletePerson(id)
        .then(() =>{
          console.log('delete succesful')
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          setErrorMessage(`Information of ${person.name} has already been removed from the server`)
          setTimeout(() => {
            setErrorMessage(null)}, 5000)
          })
          setPersons(persons.filter(p => p.id !== person.id))
        }
    }

  

  const filteredPersons = persons.filter((person) => {
    return person.name.toLowerCase().includes(nameFilter.toLowerCase())
  })


  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} error={errorMessage}/>
      <Filter filter={nameFilter} handleChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm personName={newName} personNumber={newNumber} handleSubmit={addPerson} handleName={handlePersonChange} handleNumber={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )

}

export default App