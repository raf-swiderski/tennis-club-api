const express = require('express')
const router = express.Router()
const Player = require('../models/player')
var path = require('path');

async function checkIfPlayerExists(req, res, next) {
    let player
    try {
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

router.get('/', (req, res) => {
    res.redirect('/players/register')
})

router.get('/register', (req, res) => {
    res.sendFile(path.resolve('static/register.html'));
    
})

router.post('/register', checkIfPlayerExists, async (req, res) => {
    
    if (res.player[0] != null ) {
        res.status(400).json({ message: 'this player already exists'})

    } else {
        
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
    }


})



module.exports = router;