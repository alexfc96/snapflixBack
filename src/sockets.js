const initialWorld = require('./initDefaultGameValues/initialWorld')
const initialLocations = require('./initDefaultGameValues/initialLocations')
const initialPlayer = require('./initDefaultGameValues/initialPlayer')

// 1. emparejar players
// 2. crear partida sólo para 2 players
// 3. asignar deck y ubicaciones
// 4. hacer lógica para recibir next step y que este calcule la suma total de las cartas y vuelva a enviar el deck sin las cartas jugadas
// 5. una vez el turno 6 se complete hacer computo global y finalizar partida.
// 6. crear diferentes sockets para partidas simultaneas

module.exports = (io) =>{

    let nickNames = [];
    let gameValues = {};

    io.on('connection', socket =>{
        console.log('Nuevo jugador encontrado');

        socket.on('new game', (data, callback) => {
            if(nickNames.indexOf(data) != -1 || nickNames.length > 1){
                console.log("ya hay 2 jugadores en una partida.")
                callback(false);
            }else{
                callback(true);
                socket.nickname = data;
                nickNames.push(socket.nickname);
                updateUsers();

                // if there are two players then start the game
                if(nickNames.length == 2){
                    createGame();
                }
            }
        });

        socket.on('next step', (data) =>{
            // receive data and compare on function the difference between the last step and the newest

            // sum and rest the new points to every player

            // resend total object
            // io.sockets.emit('nuevo mensaje', {
            //     msg: data,
            //     nick: socket.nickname
            // });
        });

        socket.on('disconnect', datos =>{
            //Si un usuario se desconecta lo eliminamos del array
            if(!socket.nickname){
                return;
            }else{
                //buscamos su posición en el array y lo eliminamos con splice()
                nickNames.splice(nickNames.indexOf(socket.nickname), 1);

                //Enviamos al cliente el array de usuarios actualizado:
                updateUsers();
            }
        });

        function updateUsers(){
            io.sockets.emit('usernames', nickNames);
        }

        function createGame(){
            console.log('Creando partida');

            const defaultWorld = initialWorld.createInitialWorld();
            const defaultLocations = initialLocations.createInitialLocations();

            const defaultPlayer1 = initialPlayer.createInitialPlayer1();
            const defaultPlayer2 = initialPlayer.createInitialPlayer2();

            gameValues = {
                id: defaultWorld.id,  //id of the match/game
                name: defaultWorld.name,
                player1: defaultPlayer1,
                oponent: defaultPlayer2,
                locations: defaultLocations,
                turn: defaultWorld.turn, // every new step sum + 1 as the mana
                maxTurns: defaultWorld.maxTurns,
            };

            console.log("🚀 ~ file: sockets.js:78 ~ createGame ~ defaultGameValues", gameValues)
            io.sockets.emit('new game created', gameValues);

            return
        }

    });
}