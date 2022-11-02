// Requirements for the connection between Express and PostgreSQL
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

// Query to search for all users
const getUsers = (req, res) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) { 
            throw error
        }
        res.status(200).json(results.rows)
    })
}

// Query to search for specific user
const getUserById = (req, res) => {
    const id = parseInt(req.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
}

// Query to create a new user
const createUser = (req, res) => {
    const { name, email } = req.body
  
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
}

// Query to update an existing user
const updateUser = (req, res) => {
    const id = parseInt(req.params.id)
    const { name, email } = req.body
  
    pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [name, email, id],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`User modified with ID: ${id}`)
      }
    )
}

// Query to delete an existing user
const deleteUser = (req, res) => {
    const id = parseInt(req.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`User deleted with ID: ${id}`)
    })
}

// MUST BE MENTIONED, IN ORDER, TO USE(access) OUR QUERIES IN THE index.js (main) file 
// Exporting CRUD Functions in a REST API
module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}