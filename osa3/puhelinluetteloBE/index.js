/// npm run dev
/// https://fullstackopen.com/osa3/sovellus_internetiin
///https://powerful-ravine-83754.herokuapp.com/

/*const mongoose = require('mongoose')



if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
`mongodb+srv://fullstacku:${password}@hhcluster-yslhn.mongodb.net/puhelinluettelo-app?retryWrites=true&w=majority`
  

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})*/

require('dotenv').config()
const Person = require('./models/person')
const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('build'))


/*let persons= [
  {
    "name": "HEINI",
    "number": "050123456",
    "id": 1
  },
  {
    "name": "heini",
    "number": "efgw",
    "id": 2
  },
  {
    "name": "joku",
    "number": "0s808",
    "id": 3  
  }
]*/

 /* app.get('/', (req, res) => {
    res.send('<h1>Puhelinluettelo</h1>')
  })*/

  app.get('/info', (req, res) => {
    res.send(`Phonebook has info for ${persons.length} people  <br/>  ${new Date()}`  )
  })
  
  /*app.get('/api/persons', (req, res) => {
    res.json(persons)
  })*/

  app.get('/api/persons', (request, response) => {
    Person.find({}).then(person => {
      response.json(person.map(person => person.toJSON()))
    })
  })
  
  /*app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
  
    response.status(204).end()
  })*/

  app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })

  /*app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
  })*/

  app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
      if (person) {
        response.json(person.toJSON())
      } else {
        response.status(404).end()
      }
    }).catch(error => next(error))
    
  })

  

  const generateId = () => {
    const randId = Math.round(Math.random() * 10000)
    return randId 
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (body.name === undefined) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }
    if (body.number === undefined) {
      return response.status(400).json({ 
        error: 'number missing' 
      })
    }

   if (persons.find(p => p.name === body.name) ) {
      return response.status(400).json({ 
        error: 'name must be unique' 
      })
    }
  
    const person = new Person( {
      name:body.name,
      number:body.number,
      id: generateId(),
    })
  
   /* persons = persons.concat(person)
    response.json(person)*/

    person.save().then(savedPerson => {
      response.json(savedPerson.toJSON())
    })
  })

  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError' && error.kind == 'ObjectId') {
      return response.status(400).send({ error: 'malformatted id' })
    }
  
    next(error)
  }
  app.use(errorHandler)

  const PORT = process.env.PORT

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })