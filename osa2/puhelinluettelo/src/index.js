import React, { useState,useEffect } from 'react'

import ReactDOM from 'react-dom'
import Persons from './Persons'
import PersonForm from './PersonForm';
import Filter from './Filter'
import './index.css'

import tyyppiService from './services/persons.js'


const Notification = ({ message, tyyli }) => {
  if (message === null) {
    return null
  }
  return (
   
    <div className={tyyli}>
      {message}
    </div>
  )
}



const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber,setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorTyyli, setErrorTyyli] = useState('')



  useEffect(() => {
    tyyppiService
      .getAll()
      .then(joku => {
        setPersons(joku)
      })
  }, [])

  const lisaaTyyppi= (event)=>{
    event.preventDefault()
    if (persons.some(x=>x.name === newName) && persons.some(x=>x.number !== newNumber )){

      const c=window.confirm(`${newName} is already added to the phonebook. Replace the old number with a new one?`)
      if (c){

      const ihminen = persons.find(n => n.name === newName)
      const vaihdettuNumero = { ...ihminen, number : newNumber }
        tyyppiService
          .update(vaihdettuNumero.id, vaihdettuNumero)
            .then(t => {
            setPersons(persons.map(x => x.id !== vaihdettuNumero.id ? x : t))
 
          })
          setErrorTyyli('errorG')
          setErrorMessage(`Updated '${vaihdettuNumero.name}' `)
          setTimeout(() => {setErrorMessage(null)}, 5000)
      }
        else{
          setNewNumber('')
          setNewName('')
        }

      
    }else{
      const uusiTyyppi={
        name: newName,
        number: newNumber
      }
      
    tyyppiService
    .create(uusiTyyppi)
      .then(r => {
        setPersons(persons.concat(r))
        setNewNumber('')
        setNewName('')
    })
    setErrorTyyli('errorG')
    setErrorMessage(`added '${uusiTyyppi.name}' `)
    setTimeout(() => {setErrorMessage(null)}, 5000)
    
  }
   
  }
  const poistaTyyppi= (id)=>{
    const ihminen = persons.find(n => n.id === id)
    const uudetTyypit = persons.filter(item => item.id !== id);
    tyyppiService
    .del(id)
      .then(r => {
       setPersons(uudetTyypit)       
    })
    .catch(error => {
      setErrorTyyli('error')
      setErrorMessage(`'${ihminen.name}' is already deleted from the server`)
      setTimeout(() => {setErrorMessage(null)}, 5000)
      setPersons(uudetTyypit)
  })

    setErrorMessage(`Deleted '${ihminen.name}'`)
    setTimeout(() => {setErrorMessage(null)}, 5000)
    
    
  }
   
  

  const handlaaTyyppi =(event)=>{
    setNewName(event.target.value)
    //console.log(event.target.value,'uustyyppi');
  }
  const handlaaNumba =(event)=>{
    setNewNumber(event.target.value)
    //console.log(event.target.value);
  }

  const handlaaFiltteri =(event)=>{
    //setNewFiltteri( event.target.value)

    const filtteroituPersons=
    persons.filter(x=> x.name.toLowerCase().indexOf(event.target.value.toLowerCase())>=0)
    
    setPersons(filtteroituPersons)
    //console.log('tama on',filtteroituPersons)
    //console.log(JSON.stringify(persons));
  }




  return (
    <div>
      <h1 >Phonebook</h1>

      <Notification message={errorMessage} tyyli={errorTyyli} />
      <div>
      <Filter onChange= {handlaaFiltteri}/>
      </div>
    <h2>Add a new number</h2>
    <div>
      <PersonForm
      lisaaTyyppi={lisaaTyyppi}
      newName ={newName}
      handlaaTyyppi= {handlaaTyyppi}
      newNumber={newNumber}
      handlaaNumba={handlaaNumba}
       />
    </div>
      <h2 >Numbers</h2>
      <div>
      <Persons persons = {persons} poistaTyyppi={poistaTyyppi}/>
      </div>
      
    
    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'))