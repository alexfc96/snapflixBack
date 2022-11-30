const cards = require('../cards/cards')

function createInitialPlayer(){
    const arrCards = [...cards]
    const initialPlayer = {
        id: 0,
        deck: arrCards,
        hand: [cards.card1, cards.card2, cards.card3],
        mana: 1,
        name: 'Ramon'
    }
    return initialPlayer
}

module.exports = {
    createInitialPlayer
}