const globals = require('../globals.js');

// Map to store hit reports from users
const hitReports = new Map();

function eatPlayer(message, socket, io) {
    try {
        // Message - {"user": myusername, "hit": userhit}
        console.log('PlayerHit.js', message);

        const { user, hit } = message;

        // Store the hit report in the map
        hitReports.set(user, hit);

        // Check if both users have hit each other, and take an action
        if (hitReports.has(user) && hitReports.get(user) === hit) {
            console.log(`${user} hit ${hit}`);

            // Register the hit logic here
            // Compare the two player scores
            let connectedclients = globals.getGlobal('connectedclients');
            console.log("message.user", message.user, "message.hit", message.hit);
            // Find each player in the connectedclients array.
            let player1index = connectedclients.indexOf(
                connectedclients.find((client) => client.username == message.user)
            );
            let player2index = connectedclients.indexOf(
                connectedclients.find((client) => client.username == message.hit)
            );
            console.log("PlayerHit Indexes", player1index, player2index);

            let player1score = connectedclients[player1index].currentscore;
            let player2score = connectedclients[player2index].currentscore;

            console.log("PlayerHit Scores", player1score, player2score);

            if (player1score > player2score) {
                // Give the points to the highest scoring player
                connectedclients[player1index].currentscore =
                    player1score + player2score;

                // Respawn the player that lost
                let randomx = Math.floor(Math.random() * 6000);
                let randomy = Math.floor(Math.random() * 6000);

                // Send the position to the player
                socket.emit("initposition", { "x": randomx, "y": randomy });

                connectedclients[player2index].x = randomx;
                connectedclients[player2index].y = randomy;

                // Set the losing player's score to zero
                connectedclients[player2index].currentscore = 0;
            } else if (player1score < player2score) {
                connectedclients[player2index].currentscore =
                    player1score + player2score;

                let randomx = Math.floor(Math.random() * 6000);
                let randomy = Math.floor(Math.random() * 6000);

                // Send the position to the player
                socket.emit("initposition", { "x": randomx, "y": randomy });

                connectedclients[player1index].x = randomx;
                connectedclients[player1index].y = randomy;

                // Set the losing player's score to zero
                connectedclients[player1index].currentscore = 0;
            }

            // Once the hit is registered, remove the hit reports from the map
            hitReports.delete(user);
            hitReports.delete(hit);
        }
    } catch (error) {
        // Handle the error gracefully
        console.error("An error occurred in eatPlayer:", error);
        // You can perform any necessary error handling here, such as logging the error or sending a response to the client.
    }
}

module.exports = eatPlayer;
