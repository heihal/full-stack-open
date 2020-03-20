/// npm run dev
/// https://fullstackopen.com/osa3/sovellus_internetiin
///https://powerful-ravine-83754.herokuapp.com/



const express = require('express')
const app = express()





const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

let persons= [
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
]

 /* app.get('/', (req, res) => {
    res.send('<h1>Puhelinluettelo</h1>')
  })*/

  app.get('/info', (req, res) => {
    res.send(`Phonebook has info for ${persons.length} people  <br/>  ${new Date()}`  )
  })
  
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })
  
  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
  
    response.status(204).end()
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
  })

  const generateId = () => {
    const randId = Math.round(Math.random() * 10000)
    return randId 
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }
    if (!body.number) {
      return response.status(400).json({ 
        error: 'number missing' 
      })
    }

   if (persons.find(p => p.name === body.name) ) {
      return response.status(400).json({ 
        error: 'name must be unique' 
      })
    }
  
    const person = {
      name:body.name,
      number:body.number,
      id: generateId(),
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })

  const PORT = process.env.PORT || 3001

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })