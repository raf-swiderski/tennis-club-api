const express = require('express')
const router = express.Router()
const Player = require('../models/player')
var path = require('path');

// find players 

async function checkIfMatchPlayersExist(req, res, next) {
    let winner
    let loser
    try { // checking the database
        winner = await Player.find({ firstName: req.body.winnerFirstName, lastName: req.body.winnerLastName }).exec();
        loser = await Player.find({ firstName: req.body.loserFirstName, lastName: req.body.loserLastName }).exec();
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.winner = winner 
    res.loser = loser 
    next()
}

router.get('/update', (req, res) => {
    res.sendFile(path.resolve('static/views/update.html'))
});

function calculateScores(res) {
    res.winner[0].score = Math.round(res.winner[0].score + (res.loser[0].score / 10))
    res.loser[0].score = Math.round(res.loser[0].score - (res.loser[0].score / 10))
    return res
}

router.post('/update', checkIfMatchPlayersExist, async (req, res) => {

    if (res.winner == [] || res.loser == []) {
        return res.status(404).json({ message: 'Cannot find one or both of these players. Please check their names'})
    } else {
        res = calculateScores(res) 


    }
    

    
});

module.exports = router;