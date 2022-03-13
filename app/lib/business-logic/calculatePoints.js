const percentage = 10 // % of loser's total points which get transferred to the winner after a match

function winner(winnerPoints, loserPoints) {
    let winner = Math.floor(winnerPoints + (loserPoints / percentage))
    return winner
}

function loser(winnerPoints, loserPoints) {
    let loser = Math.floor(loserPoints - (loserPoints / percentage))
    return loser
}

module.exports = {
    winner,
    loser
};