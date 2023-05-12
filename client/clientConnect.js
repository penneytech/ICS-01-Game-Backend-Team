/*
This code defines a function that handles a client connection to the server. When a client connects, it retrieves the array of connected clients from the global variables using the getGlobal function from the 'globals.js' module. It then adds the id of the connected client to the array along with any other relevant client information. It logs the list of connected clients to the console and updates the global variable with the updated array. Finally, it exports the function for other modules to use.
*/

// Import the required functions from the 'globals.js' module
const globals = require('../globals.js');
const randomPosition = require("../multiplayer/randomPosition.js");
const sortUsersByPoints = require('../datamanagement/getLeaderboard.js');
const inGameLeaderboard = require('../score/inGameLeaderboard.js');
const initPlayerPositions = require('../multiplayer/initPlayerPositions.js')

// Define a function to handle a client connection
function clientConnect(socket, io) {
    console.log("");
    console.log('[clientConnect]: A user connected.');

    let connectedclients = globals.getGlobal('connectedclients');
    
    // Send the client a random start position and 
    const randomposition = randomPosition(socket);
    socket.emit("initposition", randomposition);

    // Send Food To Client
    socket.emit("foodinit", globals.getGlobal("foodArray"));

    // Send leaderboard data to Client
    let leaderboarddata = sortUsersByPoints();

    socket.emit('leaderboarddata', leaderboarddata);


    // Add the id of the connected client to the array along with any other relevant client information
    connectedclients.push({
        id: socket.id,
        username: "",
        x: randomposition.x,
        y: randomposition.y,
        currentscore: 0,
        type: "",
        // Any other client information here
    });


    // Log the list of connected clients to the console
    //console.log('Connected clients:', connectedclients);

    // Emit ingame scoreboard
    let ingamescore = inGameLeaderboard(connectedclients);
    io.emit('ingameleaderboard', ingamescore);


    // Update the global variable with the updated array
    globals.setGlobal('connectedclients', connectedclients);

    // Send initial player positions to the client
    initPlayerPositions(socket);
}

// Export the function for other modules to use
module.exports = clientConnect;