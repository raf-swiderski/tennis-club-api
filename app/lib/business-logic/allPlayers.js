// Logic for the `/all` route, a route which returns a list of all the players in the club. These functions are called as middleware, modfiying the list of players into rank, as well as adding and removing properties.

const getAge = require('./getAge')


function sortUnrankedPlayers(allPlayers) { 
    var unrankedPlayers = allPlayers.filter(player => player.rankName == 'Unranked') // copies all unranked players to separate array.

    allPlayers = allPlayers.filter(player => !unrankedPlayers.includes(player)) // deletes unranked players from allPlayers

    sortPlayersByPoints(unrankedPlayers);

    for (let i = 0; i < unrankedPlayers.length; i++) {
        const player = unrankedPlayers[i];
        allPlayers.push(player); // puts them back in at the bottom. 
    }
    return allPlayers
}

function sortPlayersByPoints(allPlayers) {
    allPlayers.sort((a, b) => (a.points < b.points) ? 1 : -1)
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
        delete player._id
        delete player.dob
        delete player.__v
    });
}

module.exports = {
    sortUnrankedPlayers,
    sortPlayersByPoints,
    addSeed,
    addAge,
    deleteUnwantedProperties
};