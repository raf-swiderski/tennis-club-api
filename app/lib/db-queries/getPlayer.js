const Player = require('../models/player')

async function getPlayer(firstName, lastName) {
    let player
    try { 
        player = await Player.find({ firstName: firstName, lastName: lastName }).exec();
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    return player[0]
}

module.exports = getPlayer