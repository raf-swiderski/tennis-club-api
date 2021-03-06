const express = require('express')
const router = express.Router()
const Player = require('../models/player')
var path = require('path');
const { calculateWinner, calculateLoser } = require('../business-logic/calculatePoints')
const calculateRankName = require('../business-logic/calculateRankName')
const getPlayer = require('../db-queries/getPlayer');

// routes

router.get('/update', (req, res) => {
    res.sendFile(path.resolve('app/static/views/update.html'))
});

router.post('/update', async (req, res, next) => {

    let winner = await getPlayer(req.body.winnerFirstName, req.body.winnerLastName)
    .then( (winner) => { res.winner = winner } )
    let loser = await getPlayer(req.body.loserFirstName, req.body.loserLastName)
    .then( (loser) => { res.loser = loser } )
    next()
    
}, async (req, res) => {

    if (res.winner == null || res.loser == null) {
        res.status(404).json({ message: 'Cannot find one or both of these players. Please check their names'})
    } else {
        
        res.winner.points = calculateWinner(res.winner.points, res.loser.points)
        res.loser.points = calculateLoser(res.winner.points, res.loser.points)

        res.winner.gamesPlayed += 1
        res.loser.gamesPlayed += 1

        res.winner = calculateRankName(res.winner)
        res.loser = calculateRankName(res.loser)

        let winner, loser
        try { 
            winner = await Player.findOneAndUpdate({ firstName: res.winner.firstName,  lastName: res.winner.lastName }, res.winner );
            loser = await Player.findOneAndUpdate({ firstName: res.loser.firstName,  lastName: res.loser.lastName }, res.loser );
            res.status(200).json([
                { message: "Succesfully updated the points of both players" }, 
                { winner: res.winner },
                { loser: res.loser }
            ])
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }    
});

module.exports = router;