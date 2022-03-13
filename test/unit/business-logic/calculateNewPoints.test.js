const calculatePoints = require('../../../app/lib/business-logic/calculatePoints')

test('calculates the new points of the match winner˘', () => {
    expect(calculatePoints.winner(2000, 1500)).toBe(2150)
    expect(calculatePoints.winner(1000, 1800)).toBe(1180)
    
})

test('calculates the new points of the match loser', () => {
    expect(calculatePoints.loser(2000, 1500)).toBe(1350)
    expect(calculatePoints.loser(1200, 9879)).toBe(8891)
})