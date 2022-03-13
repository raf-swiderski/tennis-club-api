const percentage = 10 // % of loser's total points which get transferred to the winner after a match

function calculateWinner(winnerPoints, loserPoints) {
    let winner = Math.floor(winnerPoints + (loserPoints / percentage))
    return winner
}

function calculateLoser(winnerPoints, loserPoints) {
    let loser = Math.floor(loserPoints - (loserPoints / percentage))
    return loser
}

module.exports = {
    calculateWinner,
    calculateLoser
};