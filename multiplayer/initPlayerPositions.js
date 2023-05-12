// Emit all player positions to the frontend on client join 
const globals = require("../globals.js");

initPlayerPositions();

function initPlayerPositions() {
    console.log("INITPLAYERPOSTION RAN")
    let connectedclients = globals.getGlobal('connectedclients');

    // Create new array of logged in user
    let opponents = [];

    connectedclients.forEach( (element, index) => {
console.log("CHECKING ELEMENT", element)
        if(element.username != ''){
      opponents.push(element)
        console.log(opponents);
    }
        
    });

   // socket.emit('initopponents', opponents)
}

module.exports = initPlayerPositions;
// [
//     {"username": "hippo",
//     "x": 780,
//     "y": 300,
//      "score":6,
//      "type": "Shila",
//     },
//     {"username": "zebra",
//     "x": 700,
//     "y": 120,
//      "score":5478,
//      "type": "Tiz",
//     },
//      {"username": "shrimp",
//     "x": 2000,
//     "y": 200,
//      "score":19,
//       "type": "Jeal",
//     },

//     {"username": "cupcake",
//     "x": 334,
//     "y": 1904,
//      "score":19,
//      "type": "Seonie",
//     },
//     {"username": "giraffe",
//     "x": 2247,
//     "y": 1003,
//      "score":19,
//      "type": "Bina",
//     },
//      {"username": "fox",
//     "x": 300,
//     "y": 3200,
//      "score":19,
//       "type": "Dale",
//     },
//      {"username": "chicken",
//     "x": 270,
//     "y": 2060,
//      "score":19,
//       "type": "Jax",
//     },
//      {"username": "shrek",
//     "x": 2437,
//     "y": 3200,
//      "score":19,
//       "type": "Mimi",
//     },
//      {"username": "dolphin",
//     "x": 4300,
//     "y": 2040,
//      "score":19,
//       "type": "Aram",
//     },
//     {"username": "donkey",
//     "x": 3200,
//     "y": 3540,
//      "score":19,
//       "type": "Jimmie",
//     },
//     {"username": "stay4life",
//     "x": 4300,
//     "y": 440,
//      "score":19,
//       "type": "Nika",
//     },
//     {"username": "otter",
//     "x": 4300,
//     "y": 4000,
//      "score":19,
//       "type": "HatsumeMiku",
//     },
//     {"username": "doglover123",
//     "x": 500,
//     "y": 2040,
//      "score":19,
//       "type": "Tiz",
//     },
//     {"username": "miroh",
//     "x": 4300,
//     "y": 700,
//      "score":19,
//       "type": "Polly",
//     },
//   ],