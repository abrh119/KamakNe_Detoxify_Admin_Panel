require('dotenv').config({ path: './config.env' })
const PORT = process.env.PORT || 3000
const express = require('express')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const dataSetRoute = require('./controllers/dataset')
const statsRoute = require('./controllers/stats')

const server = express()
const dbConnection = require('./utils/db.js')
dbConnection()
server.use(express.json())
app
  .prepare()
  .then(() => {
    server.use('/dataset', dataSetRoute)
    server.use('/stats', statsRoute)

    server.all('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, err => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
