const express = require('express')
const router = express.Router()
const Player = require('../models/player')
var path = require('path');
const getPlayer = require('../db-queries/getPlayer');
const getAge = require('../business-logic/getAge')

const { sortUnrankedPlayers,
    sortPlayersByPoints,
    addSeed,
    addAge,
    deleteUnwantedProperties
} = require('../business-logic/allPlayers')

// routes

router.get('/', (req, res) => {
    res.redirect('/players/register')
})

router.get('/register', (req, res) => {
    res.sendFile(path.resolve('app/static/views/register.html'));
})

router.post('/register', async (req, res, next) => {

    let player = await getPlayer(req.body.firstName, req.body.lastName)
    .then( (response) => { res.player = response; })
    next()

}, async (req, res) => {

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

// This route takes its parameters from the query string
// e.g. all?rank=Unranked&nationality=United+Kingdom

router.get('/all', async (req, res) => {

    var attributes = {} 
    req.query.nationality ? attributes.nationality = req.query.nationality : null
    req.query.rankName ? attributes.rankName = req.query.rankName : null

    try {
        var allPlayers = await Player.find(attributes).lean().exec(); 

        sortPlayersByPoints(allPlayers);
        allPlayers = sortUnrankedPlayers(allPlayers) // Unranked players moved to bottom of seed ranking, while still themselves being ordered by points.
        addSeed(allPlayers); // adding these properties to each Player. 'Seed' is the current position in the whole ranking. 
        addAge(allPlayers);

        // remove 'id', '__v', 'dob' properties
        deleteUnwantedProperties(allPlayers);

        res.status(200).json(allPlayers)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

})

module.exports = router;