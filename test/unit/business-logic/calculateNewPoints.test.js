const { calculateWinner, calculateLoser } = require('../../../app/lib/business-logic/calculatePoints')

test('calculates the new points of the match winner˘', () => {
    expect(calculateWinner(2000, 1500)).toBe(2150)
    expect(calculateWinner(1000, 1800)).toBe(1180)
    
})

test('calculates the new points of the match loser', () => {
    expect(calculateLoser(2000, 1500)).toBe(1350)
    expect(calculateLoser(1200, 9879)).toBe(8891)
})