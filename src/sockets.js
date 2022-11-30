module.exports = (io) =>{

    let nickNames = [];

    io.on('connection', socket =>{
        console.log('Nuevo jugador encontrado');

        // 1. emparejar players
        // 2. crear partida sólo para 2 players
        // 3. asignar deck y ubicaciones
        // 4. hacer lógica para recibir next step y que este calcule la suma total de las cartas y vuelva a enviar el deck sin las cartas jugadas
        // 5. una vez el turno 6 se complete hacer computo global y finalizar partida.
        // 6. crear diferentes sockets para partidas simultaneas 
        
        socket.on('new user', (datos, callback) => {
            //Nos devuelve el indice si el dato existe, es decir, si ya existe el nombre de usuario:
            if(nickNames.indexOf(datos) != -1 || nickNames.length > 1){
                console.log("ya hay 2 jugadores en una partida.")
                callback(false);
            }else{
                //Si no existe le respondemos al cliente con true y agregamos el nuevo usuario:
                callback(true);
                socket.nickname = datos;
                nickNames.push(socket.nickname);
                //Enviamos al cliente el array de usuarios:
                updateUsers();
                // createGame();
            }
        });

        //Al recibir un mensaje recojemos los datos
        socket.on('enviar mensaje', (datos) =>{
            //console.log(datos);
            //Lo enviamos a todos los usuarios (clientes)
            io.sockets.emit('nuevo mensaje', {
                msg: datos,
                nick: socket.nickname
            });
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
            const defaultGameValues = {
                id: 0,  //id of the match/game
                name: 'World 01',
                player: {
                    id: 0,
                    deck: deckMock,
                    hand: [card1Mock, card2Mock, card3Mock],
                    mana: 1,
                    name: 'Ramon'
                },
                oponent: {
                    id: 0,
                    deck: deckMock,
                    hand: [card1Mock, card2Mock, card3Mock],
                    mana: 1,
                    name: 'Ramon'
                },
                locations: locationsMock,
                turn: 1, // every new step sum + 1 as the mana
                maxTurns: 6,
            };

            io.sockets.emit('newGame', defaultGameValues);
        }

    });
}