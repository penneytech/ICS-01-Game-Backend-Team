const GAME_DURATION = 300000; // 5 minutes in milliseconds
const RESTART_INTERVAL = 10000; // 30 seconds in milliseconds-
let timerLeft = 10000; //timerLeft updater
globals = require("../globals.js");
const updateScores = require('../score/writeScore.js');
const sortUsersByPoints = require('../datamanagement/getLeaderboard.js');
const randomPosition = require('./randomPosition.js');

let betweenRounds = false;


function startGame() {
    console.log('Game started.');

    const clock = setInterval(() => {
        // Decrement the timer
        timerLeft = timerLeft - 1000;

        // Sets the time global
        globals.setGlobal('timerLeft', timerLeft);
        globals.setGlobal('betweenrounds', betweenRounds)


        try {
            if (timerLeft == 0 && betweenRounds == false) {
                let io = globals.getGlobal('io');
                console.log("Round Over!");
                betweenRounds = true;
                globals.setGlobal('betweenRounds', betweenRounds)
                timerLeft = 10000;

                io.emit("betweenrounds", betweenRounds);

                // Record everyone's scores.
                updateScores();

                // Update the leaderboard
                sortUsersByPoints();

            } else if (timerLeft == 0 && betweenRounds == true) {
                let io = globals.getGlobal('io');

                console.log("Restarting round!");

                // Set everyone's score to 0.
                io.emit("resetscore");
                io.emit('ingameleaderboard', []);

                // for each socket in the io, set their position to a random position
                for (let socket of io.sockets.sockets.values()) {
                    randomPosition(socket);
                }

                timerLeft = 10000;
                betweenRounds = false;
                globals.setGlobal('betweenRounds', betweenRounds)
                io.emit("betweenrounds", betweenRounds);
                // Emit a signal to client that round is starting
            }

        } catch (error) {
            console.log(error);
        }
    }, 1000);
}

module.exports = startGame();

// Start the game
