const GAME_DURATION = 300000; // 5 minutes in milliseconds
const RESTART_INTERVAL = 10000; // 30 seconds in milliseconds-
let timerLeft = 3000; //timerLeft updater
globals = require("../globals.js");

let betweenRounds = false;

function startGame() {
    console.log('Game started.');

    const clock = setInterval(() => {
        // Decrement the timer
        timerLeft = timerLeft - 1000;
        // Sets the time global
        globals.setGlobal('timerLeft', timerLeft);
        globals.setGlobal('betweenrounds', betweenRounds)
        // Log time
        //console.log("Second", globals.getGlobal("timerLeft"));

        try {
            if (timerLeft == 0 && betweenRounds == false) {
                //console.log("Round Over!");
                betweenRounds = true;
                globals.setGlobal('betweenRounds', betweenRounds)
                timerLeft = 5000;

                let io = globals.getGlobal('io');
                io.emit("betweenrounds", betweenRounds);
                // Emit a signal to client that round is over


            } else if (timerLeft == 0 && betweenRounds == true) {

                //console.log("Restarting round!");
                timerLeft = 10000;
                betweenRounds = false;
                globals.setGlobal('betweenRounds', betweenRounds)
                let io = globals.getGlobal('io');
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
