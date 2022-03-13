function calculateRankName(player) {
    
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

module.exports = calculateRankName;