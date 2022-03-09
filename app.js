const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const port = process.env.PORT

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection

db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to database'))

app.use(express.urlencoded({ extended: false }));
app.use(express.static('static'))

app.use(express.json())

const playersRouter = require('./routes/players')
const matchesRouter = require('./routes/matches')
app.use('/players', playersRouter)
app.use('/matches', matchesRouter)

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
