const express = require('express')
const app = express()
const port = 3002
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./database')

//for local development tests
const corsOptions = {
  origin: 'http://localhost:3000',
}

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres order-api. This is CORS-enabled for http://localhost:3000!' })
})

app.get('/orders', cors(corsOptions), db.getAllOrders)

app.get('/orders/:id', cors(corsOptions), db.getOrderById)

app.post('/orders', cors(corsOptions), db.createOrder)

//allow OPTIONS on all resources
app.options('*', cors(corsOptions))

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})