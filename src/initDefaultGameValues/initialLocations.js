function createInitialLocations(){
    const initialLocations = [{
        id: 'l_0',
        name: 'Location 1',
        oponentPoints: 0,
        playerPoints: 0,
        playerCards: [],
        oponentCards: [],
    },
    {
        id: 'l_1',
        name: 'Location 2',
        oponentPoints: 0,
        playerPoints: 0,
        playerCards: [],
        oponentCards: [],
    },
    {
        id: 'l_2',
        name: 'Location 3',
        oponentPoints: 3,
        playerPoints: 0,
        playerCards: [],
        oponentCards: [],
    },]
    return initialLocations
}

module.exports = {
    createInitialLocations
}