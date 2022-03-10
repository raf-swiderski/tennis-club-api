const express = require('express')
const router = express.Router()
const Player = require('../models/player')
var path = require('path');

// middleware

async function checkIfPlayerExists(req, res, next) {
    let player
    try { // checking the database
        player = await Player.find({ firstName: req.body.firstName, lastName: req.body.lastName }).exec();
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.player = player[0]
    next()
}

function getAge(birthDate) { // format: '1996-06-26' => 25
    const yearInMs = 3.15576e+10 // One year in milliseconds
    return Math.floor((new Date() - new Date(birthDate).getTime()) / yearInMs)
}

// routes

router.get('/', (req, res) => {
    res.redirect('/players/register')
})

router.get('/register', (req, res) => {
    res.sendFile(path.resolve('static/views/register.html'));
})

router.post('/register', checkIfPlayerExists, async (req, res) => {

    const age = getAge(req.body.dob)

    if (age < 16 ) {

        res.status(400).json({ message: 'Players must be at least 16 years old to be able to enter the club'})

    } else if (res.player != null ) {

        res.status(400).json({ message: 'This player already exists'})

    } else {
        
        const player = new Player({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nationality: req.body.nationality,
            dob: req.body.dob,
            points: 1200,
            rankName: 'Unranked',
            gamesPlayed: 0
        })

        try {
            const newPlayer = await player.save()
            res.status(201).json(newPlayer)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }   
    }


})

// remember to display age not dob
// add up the games played when you update match
// ordered by points (descending)i.	The unranked players should also be ordered by points (descending) but should appear at the bottom of the list, below all other ranks.

// Query string e.g. ?rank=Unranked&nationality=United+Kingdom

function sortPlayersByPoints(allPlayers) {
    return allPlayers.sort((a, b) => (a.points < b.points) ? 1 : -1)
}

function addSeed(allPlayers) {
    allPlayers.forEach((player, index) => {
        player.seed = index + 1
    });
}

function addAge(allPlayers) {
    allPlayers.forEach((player, index) => {
        let age = getAge(player.dob)
        player.age = age
    });
}

function deleteUnwantedProperties(allPlayers) {
    allPlayers.forEach((player, index) => {
        delete player.gamesPlayed
        delete player._id
        delete player.dob
        delete player.__v
    });
}

router.get('/all', async (req, res) => {

    var attributes = {} 
    req.query.nationality ? attributes.nationality = req.query.nationality : null
    req.query.rankName ? attributes.rankName = req.query.rankName : null



    try {
        var allPlayers = await Player.find(attributes).lean().exec(); // When you add .lean() to the Mongoose Query Builder, it eturns a plain javascript associative array, that you can add keys to.

        sortPlayersByPoints(allPlayers);
        addSeed(allPlayers); // adding these properties to each Player. 'Seed' is the current position in the whole ranking. 
        addAge(allPlayers);

        // remove 'gamesPlayed', 'id', '__v', 'dob' properties
        deleteUnwantedProperties(allPlayers);

        res.status(200).json(allPlayers)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

})



module.exports = router;