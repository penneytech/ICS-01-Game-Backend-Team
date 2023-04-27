// import {setGlobal} from './globals.js';

let foodArray = []
let display_width = 600;
let display_height = 600;

let cookiecount = 0;
let greencount = 0;
let macbluecount = 0;
let macredcount = 0;
let rainbowcount = 0;
let canredcount = 0;
let lollycount = 0;

let numArray = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  2, 2, 2, 2, 2, 2, 2, 2,
  3, 3, 3, 3, 3,
  4, 4, 4, 4,
  5, 5, 5,
  6, 6,
  7]


// const clientMessage = require("../clientMessage.js");

function foodGenerator(max_width, max_height) {
  food_x = Math.floor(Math.random() * max_width);
  food_y = Math.floor(Math.random() * max_height);
  food_type = Math.floor(Math.random() * numArray.length);
  if (food_type <=9){
    food_type = "CanCookie";
    cookiecount++;
  }
  if (food_type > 9 && food_type <=17){
    food_type = "CanGreen";
    greencount++;
  }
  if (food_type > 17 && food_type <=22){
    food_type = "CanMacBlue";
    macbluecount++;
  }
  if (food_type >22 && food_type <=26){
    food_type = "CanMacRed";
    macredcount++;
  }
  if (food_type >26 && food_type <=29){
    food_type = "CanRainbow";
    rainbowcount++;
  }
  if (food_type >29 && food_type <=31){
    food_type = "CanRed";
    canredcount++;
  }
  if (food_type == 32){
    food_type = "Lollypop";
    lollycount++;
  }

  foodArray.push({ "x": food_x, "y": food_y, "Type": food_type });
}

function generateAllFood(num_total_food) {
  for (i = 0; i < num_total_food; i++) {
    foodGenerator(display_width, display_height);
  }
  console.log("Food array", foodArray);

  // Set the foodArray global here
  // const setGlobal = require("./globals.js");
    
  // setGlobal("foodArray", foodArray);

}


generateAllFood(1000);

  // socket.emit(foodArray);

console.log("Cookies:", cookiecount);
console.log("CanGreens:", greencount);
console.log("MacBlues:", macbluecount);
console.log("MacReds:", macredcount);
console.log("Rainbows:", rainbowcount);
console.log("CanReds:", canredcount);
console.log("Lollypops:", lollycount);
//when food is eaten, remove that food from array, make a new food