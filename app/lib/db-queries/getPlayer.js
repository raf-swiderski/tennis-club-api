const Player = require('../models/player')

async function getPlayer(firstName, lastName) {
    let player
    try { 
        player = await Player.find({ firstName: firstName, lastName: lastName }).exec();
    } catch (error) {
        console.log(error)
        return error
    }
    return player[0]
}

module.exports = getPlayer