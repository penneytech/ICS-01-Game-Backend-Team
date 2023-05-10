sconst globals = require("../globals.js");
const foodManagement = require("./foodManagement.js");
const scoreUpdate = require('../score/scoreUpdate.js');

function foodResetLocation(max_width, max_height) {
    food_x = Math.floor(Math.random() * max_width);
    food_y = Math.floor(Math.random() * max_height);
    return { "x": food_x, "y": food_y }
}

function fooddelete(message, socket, io) {
    console.log('[fooddelete]: Food delete called...');

    try {

        message = parseInt(message);

        let foodArray = globals.getGlobal('foodArray');

        // Update the user score
        scoreUpdate(foodArray[message].Value, socket, io);

        // print foodarray at the message number 
        console.log('[fooddelete]: delete food:', foodArray[message]);
        console.log('[fooddelete]: Food before', foodArray[message]);

        // change the X / Y of the food array object to a random value
        let newFood = foodResetLocation(6000, 6000); // 6000, 6000 
        foodArray[message].x = newFood.x;
        foodArray[message].y = newFood.y;
        console.log('[fooddelete]: Food after', foodArray[message]);

        // Update the food array global
        globals.setGlobal("foodArray", foodArray);

        // Send the new X / Y to all clients 
        socket.emit('foodupdate', {
            "foodnumber": message,
            "x": newFood.x,
            "y": newFood.y
        });

    } catch (e) {
        console.log("ERROR:", e)
    }
}

module.exports = fooddelete;