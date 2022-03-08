const express = require('express')
const router = express.Router()
const Player = require('../models/player')
var path = require('path');

async function checkIfPlayerExists(req, res, next) {
    let player
    try { // checking the database
        player = await Player.find({ firstName: req.body.firstName, lastName: req.body.lastName }).exec();
        if (player == null) {
            return res.status(404).json({ message: 'Cannot find player'})
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.player = player 
    next()
}

function getAge(birthDate) { // format: '1996-06-26' => 25

    const yearInMs = 3.15576e+10 // This constant is one year in milliseconds
    return Math.floor((new Date() - new Date(birthDate).getTime()) / yearInMs)
}

router.get('/', (req, res) => {
    res.redirect('/players/register')
})

router.get('/register', (req, res) => {
    res.sendFile(path.resolve('static/register.html'));
    
})

router.post('/register', checkIfPlayerExists, async (req, res) => {

    const age = getAge(req.body.dob)

    if (age < 16 ) {

        res.status(400).json({ message: 'Players must be at least 16 years old to be able to enter the club'})

    } else if (res.player[0] != null ) {

        res.status(400).json({ message: 'This player already exists'})

    } else {
        
        const player = new Player({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nationality: req.body.nationality,
            dob: req.body.dob,
            score: 1200
        })
    
        try {
            const newPlayer = await player.save()
            res.status(201).json(newPlayer)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }   
    }


})



module.exports = router;