const globals = require('../globals.js');
const inGameLeaderboard = require('./inGameLeaderboard.js');

function scoreUpdate(value, socket, io) {

    console.log(`[scoreUpdate]: Add ${value} points to ${socket.id}`);

    // Import the connectedclients global
    let connectedclients = globals.getGlobal('connectedclients');

    // Find the connected client object that has the socket.id
    let index = connectedclients.indexOf(connectedclients.find(client => socket.id == client.id));
    console.log(`[scoreUpdate]: index number`, index);

    try {

        if (index != -1) {
            // Update the currentscore for that object to include the value
            connectedclients[index].currentscore = connectedclients[index].currentscore + value;
            console.log(
                `[scoreUpdate]: updated score for`,
                connectedclients[index].username,
                connectedclients[index].currentscore,
            );

            // Emit ingame scoreboard
            let ingamescore = inGameLeaderboard(connectedclients);
            console.log(`[scoreUpdate]: ingame leaderboard`, ingamescore);

            io.emit('ingameleaderboard', ingamescore);

            // Emit the individual player score
            socket.emit('playerscoreupdate', connectedclients[index].currentscore);

            // Console log conencted clients
            console.log(`[scoreUpdate]: connected clients:`, connectedclients);

            // Update the front end 
            io.to('frontendmonitor').emit('update', connectedclients);

        } // End up updating score
    } catch (e) {
        console.log(`[scoreUpdate]: error`, index, connectedclients[index].currentscore, error);
    }
}

module.exports = scoreUpdate;

