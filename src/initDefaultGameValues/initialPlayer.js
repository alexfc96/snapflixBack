const cards = require('../cards/cards')

function createInitialPlayer1(){
    const arrCards = [cards]
    const initialPlayer = {
        id: 0,
        deck: arrCards,
        hand: [cards.card1, cards.card2, cards.card3],
        mana: 1,
        name: 'Ramon'
    }
    return initialPlayer
}

function createInitialPlayer2(){
    const arrCards = [cards]
    const initialPlayer = {
        id: 1,
        deck: arrCards,
        hand: [cards.card1, cards.card2, cards.card3],
        mana: 1,
        name: 'Alex'
    }
    return initialPlayer
}

module.exports = {
    createInitialPlayer1,
    createInitialPlayer2,
}