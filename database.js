// commands called from psql cli

// CREATE DATABASE orders-api;

// CREATE TABLE [IF NOT EXISTS] orders  (
//   id SERIAL PRIMARY KEY,
//   date DATE NOT NULL,
//   inventory_ordered TEXT NOT NULL,
//   total NUMERIC NOT NULL,
// );
const Pool = require('pg').Pool

const pool = new Pool({
  host: 'localhost',
  database: 'orders-api',
  port: 5432,
})


const getAllOrders = (request, response) => {
  pool.query('SELECT * FROM orders', (error, results) => {
    if (error) {
      console.log('cannot connect');
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getOrderById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM orders WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createOrder = (request, response) => {
  const { date, items, total } = request.body

  pool.query('INSERT INTO orders (date, inventory_ordered, total) VALUES ($1, $2, $3)', [date, items, total], (error, result) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Order added successfully`)
  })
}

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
}