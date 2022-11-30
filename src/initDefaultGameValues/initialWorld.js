function createInitialWorld(){
    const initialWorld = {
        id: 'w_1',
        maxTurns: 6,
        name: 'World',
        turn: 0,
    }
    return initialWorld
}

module.exports = {
    createInitialWorld
}