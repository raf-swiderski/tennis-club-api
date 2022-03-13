const express = require('express')
const router = express.Router()
const Player = require('../models/player')
var path = require('path');
const calculateNewPoints = require('../business-logic/calculatePoints').default
// middleware

async function checkIfMatchPlayersExist(req, res, next) {
    let winner, loser
    try { // checking the database. each succesful query returns an array
        winner = await Player.find({ firstName: req.body.winnerFirstName, lastName: req.body.winnerLastName }).exec();
        loser = await Player.find({ firstName: req.body.loserFirstName, lastName: req.body.loserLastName }).exec();
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.winner = winner[0] 
    res.loser = loser[0]
    next()
}

function updateRankName(player) {
    
    const points = player.points
    const gamesPlayed = player.gamesPlayed

    if (gamesPlayed >= 3) {
        if (points < 3000) {
            player.rankName = 'Bronze'  
        } else if (points > 3000 && points < 5000) {           
            player.rankName = 'Silver'       
        } else if (points > 5000 && points < 10000) {          
            player.rankName = 'Gold'          
        } else {         
            player.rankName = 'Supersonic Legend'
        }
    } else {
        player.rankName = 'Unranked'
    }

    return player
}

// routes

router.get('/update', (req, res) => {
    res.sendFile(path.resolve('static/views/update.html'))
});

router.post('/update', checkIfMatchPlayersExist, async (req, res) => {

    if (res.winner == null || res.loser == null) {
        res.status(404).json({ message: 'Cannot find one or both of these players. Please check their names'})
    } else {
        res = calculateNewPoints(res) // passing the entire response object here, because the winners new points depends on the losers points

        res.winner.gamesPlayed += 1
        res.loser.gamesPlayed += 1

        res.winner = updateRankName(res.winner)
        res.loser = updateRankName(res.loser)

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