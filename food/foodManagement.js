const globals = require("../globals.js"); 

let foodArray = []
let display_width = 6000;
let display_height = 6000;

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


function foodGenerator(max_width, max_height) {
  food_x = Math.floor(Math.random() * max_width);
  food_y = Math.floor(Math.random() * max_height);
  food_type = Math.floor(Math.random() * numArray.length);
  food_value = 0;
  if (food_type <=9){
    food_type = "CanCookie";
    cookiecount++;
    food_value = 10;
  }
  if (food_type > 9 && food_type <=17){
    food_type = "CanGreen";
    greencount++;
    food_value = 20;
  }
  if (food_type > 17 && food_type <=22){
    food_type = "CanRed";
    canredcount++;
    food_value = 30;
  }
  if (food_type >22 && food_type <=26){
    food_type = "Canmacblue";
    macbluecount++;
    food_value = 50;
  }
  if (food_type >26 && food_type <=29){
    food_type = "CanMacRed";
    macredcount++;
    food_value = 60;
  }
  if (food_type >29 && food_type <=31){
    food_type = "CanRainbow";
    rainbowcount++;
    food_value = 100;
  }
  if (food_type == 32){
    food_type = "Lollypop";
    lollycount++;
    food_value = 200;
  }

  foodArray.push({ "x": food_x, "y": food_y, "Type": food_type, "Value": food_value});

    
}

function generateAllFood(num_total_food) {
  for (i = 0; i < num_total_food; i++) {
    foodGenerator(display_width, display_height);
  }
  console.log("Food array", foodArray);

  // Set the foodArray global here
  
  globals.setGlobal("foodArray", foodArray);
}

generateAllFood(100);

console.log("Cookies:", cookiecount);
console.log("CanGreens:", greencount);
console.log("CanReds:", canredcount);
console.log("MacBlues:", macbluecount);
console.log("MacReds:", macredcount);
console.log("Rainbows:", rainbowcount);
console.log("Lollypops:", lollycount);
//when food is eaten, remove that food from array, make a new food

