import { useState, useEffect } from 'react'
import contacts from './services/contacts'
import './app.css'

const Button = ({ onClick, text }) => <button onClick={onClick} type="submit"> {text} </button>;
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={message.style}>
      {message.text}
    </div>
  )
}

const ShowFilteredPerson = ({p, handleFilter}) =>{
  return(
     <>
     <div>filter shown with <input onChange={handleFilter}/> </div>
     <div>{p.name} {p.number}</div>
     </>
   )
}
const NewPersonForm = ({handleName, handleNumber, onSubmitForm}) => {
  return(
    <>
      <div>name: <input onChange={handleName}/></div>
      <div>number: <input onChange={handleNumber}/></div>
      <div> <Button onClick={onSubmitForm} text={'add'} /> </div>
    </>
  )
}
const ShowPeople = ({p, onDelete}) => p.map((person)=><p key={person.id}>{person.name} {person.number} <Button onClick={() => onDelete(person.id)} text={'delete'}/></p> );
const CheckExistingNames = (persons, newName) => persons.map(person=> person.name.toLowerCase() ).indexOf(newName.toLowerCase());

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personFiltered, setPersonFiltered] = useState({ name: ' ', number: ' '})
  const [successMessage, setMessage] = useState(null)

  const hook = () => {
   contacts
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  useEffect(hook, [])

  const handleNameChange  = (e) => setNewName(e.target.value)
  const handleNumberChange  = (e) => setNewNumber(e.target.value)
  const handleFilterChange  = (e) => {
    const filterIndex = CheckExistingNames(persons, e.target.value)
    filterIndex !== -1 ? setPersonFiltered(persons[filterIndex]) : setPersonFiltered({ name: ' ', number: ' '})
  }
  const handleSaveContact = (e) =>{
    e.preventDefault()
    let sameNameIndex = CheckExistingNames(persons, newName);
    const newContact = {
      name: newName,
      number: newNumber
    }
    //If its a new contact lets post
    if(newName !== '' && newNumber !== ''){
      if(sameNameIndex === -1){
        contacts.create(newContact)
        .then(response => {
          setPersons(persons.concat(response.data))
          setMessage({text: `${newName} was added to phonebook`, style: 'success'})
          setTimeout(() => { setMessage(null) }, 5000)
        })
        .catch(error => {
          setMessage({text: error.response.data.error, style: 'error'})
          setTimeout(() => { setMessage(null) }, 5000)
        })
      }

      //else its a new contact. Is it a new phone number? lets update(post)
      else if(newNumber !== persons[sameNameIndex].number){
        let updateId = persons[sameNameIndex].id;
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          contacts.update(updateId, newContact)
          .then(response => {
            if(personFiltered.id===updateId) setPersonFiltered(response.data)
            setPersons(persons.map((person) => person.id === updateId? response.data : person))
            setMessage({text:  `Updated phone number for ${newName}`, style: 'success'})
            setTimeout(() => { setMessage(null) }, 5000)
          })
          .catch(error => {
            if(personFiltered.id===updateId) setPersonFiltered({ name: ' ', number: ' '})
            //setPersons(persons.filter(person=> person.id !== updateId))
            //El codigo de arriba era para el error de update algo que fue eliminado(part2)
            setMessage({text: error.response.data.error, style: 'error'})
            setTimeout(() => { setMessage(null) }, 5000)
          })
        }
      }
      //else its the same name and number
      else{
        alert(`An exact copy of this contact already exists`)
      }
    }
    else{
      alert(`Fill out name and number`)
    }
  }
  const handleDeleteContact = (id) =>{
    if (window.confirm("Do you really want to delete?")) {
      contacts.remove(id)
      .then(response => {
        if(personFiltered.id===id) setPersonFiltered({name: ' ', number: ' '})
        setPersons(persons.filter((person) => person.id !== id))
      })
    }
  }
  
  return (
    <>
      <h2> Phonebook </h2>
      <Notification message={successMessage} />
      <ShowFilteredPerson p = {personFiltered} handleFilter={handleFilterChange} />
      <h2> Add new contact </h2>
      <NewPersonForm handleName={handleNameChange} handleNumber={handleNumberChange} onSubmitForm={handleSaveContact} />
      <h2>Numbers</h2>
      <ShowPeople p = {persons} onDelete={handleDeleteContact}/>
    </>
  )
}

export default App