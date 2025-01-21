//#region middleware imports
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/persons')
const app = express()
const baseUrl = '/api/persons'
//#endregion

//#region app.use express and morgan(tokens)
app.use(cors())
app.use(express.static('build'))
app.use(express.json())

morgan.token('newData', function (req) { return req.blah })
function displayNewData(req, res, next) {
  Object.keys(req.body).length === 0 ? req.newData = ('') : req.newData = JSON.stringify(req.body)
  next()
}
app.use(displayNewData)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :newData'))
//#endregion

app.post(baseUrl, (request, response, next) => {
  const { name, number } = request.body
  if (!name || !number) return response.status(400).json({ error: 'content missing' })
  const person = new Person({ name, number })
  person.save()
    .then(savedContact => {
      response.json(savedContact)
    })
    .catch(error => next(error))
})
app.put(`${baseUrl}/:id`, (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(request.params.id, { name, number }, { new: true, runValidators: true, context: 'query' })
    .then(updateContact => {
      response.json(updateContact)
    })
    .catch(error => next(error))
})

//#region get methods

app.get(baseUrl, (request, response) => {
  Person.find({}).then(contact => {
    contact === null ? response.json('Phonebook is empty') : response.json(contact)
  })
})

app.get('/info', (request, response) => {
  Person.countDocuments({}, function (err, count) {
    const display = `<p>Phonebook has info for ${count} people</p><p>${new Date()}</p>`
    response.send(display)
  })
})
app.get(`${baseUrl}/:id`, (request, response, next) => {
  Person.findById(request.params.id)
    .then(contact => {
      contact ? response.json(contact) : response.status(404).end()
    })
    .catch(error => next(error))
})
//#endregion

app.delete(`${baseUrl}/:id`, (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

//#region error Handlers
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)
//#endregion

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)