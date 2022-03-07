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

app.get('/', (req, res) => {
    res.redirect('/register')
})

const Player = require('./models/player')

app.route('/register')
  
    .get((req, res) => {
        res.sendFile('static/register.html', {root: __dirname })
    })

    .post( async (req, res) => {
    
        const player = new Player({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nationality: req.body.nationality,
            dob: req.body.dob
        })
    
        try {
            const newPlayer = await player.save()
            res.status(201).json(newPlayer)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }   

    })
/

// app.use(express.json())


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
