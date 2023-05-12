const GAME_DURATION = 10000; // 5 minutes in milliseconds
const RESTART_INTERVAL = 10000; // 30 seconds in milliseconds-
let timerLeft = 300000; //timerLeft updater
globals = require("../globals.js");

function startGame() {
  console.log('Game started.');

  const clock = setInterval(() => {
    timerLeft = timerLeft - 1000;
    globals.setGlobal('timerLeft', timerLeft); 
    //console.log("Second", globals.getGlobal("timerLeft"));

  }, 1000);

  // Set a timer to stop the game after 5 minutes
  const timer = setTimeout(() => {
    console.log('Game stopped.');

    // Set an interval to restart the game every 30 seconds
    const interval = setInterval(() => {
      console.log('Game restarting.');
      startGame();
      clearInterval(interval);
      clearInterval(clock);
    }, RESTART_INTERVAL);
  }, GAME_DURATION);
}

module.exports = startGame();

// Start the game


// socket.emit('startGame' , 'setTimeout', 'setInterval')