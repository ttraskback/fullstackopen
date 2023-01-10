import { useEffect, useState } from 'react'
import Persons from './components/Persons';
import AddForm from './components/AddForm';
import axios from 'axios';
import PersonServices from './services/Persons';
import Notifications from './components/Notifications';

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificatiolevel, setNotificatiolevel] = useState('error')

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }
    const foundName = persons.find(person => person.name.toLocaleLowerCase() === newName.toLocaleLowerCase())
    
    // Update phonumber if name is found
    if (foundName !== undefined) {
      if (window.confirm(`${newName} is already in the phonebook, update the number?`)) {
        PersonServices.update(foundName.id, newPerson).then(returnedPerson => {
          setPersons(persons.map(person => person.id !== foundName.id ? person : returnedPerson))
          setNotificationMessage(
            `Updated '${newName}.`
          )
          setNotificatiolevel("success")
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        }).catch(error => {
          setNotificationMessage(
            `Person ${newName} was already removed from server.`
          )
          setNotificatiolevel("error")
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
          setPersons(persons.filter(n => n.id.toString() !== foundName.id.toString()))
        })
      }
    }else{
      PersonServices.create(newPerson).then(data => {
        console.log('promise fulfilled')
        setPersons(persons.concat(data))
        setNotificationMessage(
          `Added ${newName}.`
        )
        setNotificatiolevel("success")
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  useEffect(() => {
    console.log('effect')
    PersonServices.getAll().then(data => {
      console.log('promise fulfilled')
      setPersons(data)
    }
    )
  }, [])

  const handleDelete = (event) => {
    const found = persons.find(person => person.id.toString() === event.target.value)
    if (window.confirm(`you really want to delete ${found.name}?`)) {
      PersonServices.remove(event.target.value).then(id => {
        setPersons(persons.filter(n => n.id.toString() !== id.toString()))
      }).catch(error => {
        setNotificationMessage(
          `Person ${newName} was already removed from server.`
        )
        setNotificatiolevel("error")
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
        setPersons(persons.filter(n => n.id.toString() !== event.target.value.toString()))
      })
    }
  }

  return (
    <div>
      <Notifications message={notificationMessage} classname={notificatiolevel}/>
      <h2>Phonebook</h2>
      <AddForm onSubmit={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} handleDelete={handleDelete}/>
    </div>
  )
}

export default App