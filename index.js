// Requirements for the use of Express
// db variables must be used which is connecting the queries file to the index
const express = require('express')
const bodyParser = require('body-parser')
const db = require('./queries')
const app = express()
const port = 1337

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})

// HTTP request methods for communication with Database
app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)