const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true
    },
    rank: {
        type: String,
        required: true
    },
    gamesPlayed: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Player', playerSchema)