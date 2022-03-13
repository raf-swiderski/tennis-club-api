function calculateNewPoints(res) {
    let winner = res.winner
    let loser = res.loser
    res.winner.points = Math.floor(winner.points + (loser.points / 10))
    res.loser.points = Math.floor(loser.points - (loser.points / 10))
    return res
}

module.exports = calculateNewPoints;