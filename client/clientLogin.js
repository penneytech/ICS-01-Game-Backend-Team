// Import the required functions, modules, and MongoDB client
const globals = require("../globals.js");
const { MongoClient } = require("mongodb");
const { clientLoginSecurity } = require('./clientLoginSecurity.js');
let clientFailCounter = 0;

// MongoDB setup
const uri = "mongodb+srv://ICS3U01:burlingtoncentralics3u@ics3u01.ckxzf5i.mongodb.net/game1?retryWrites=true&w=majority"; // replace with your connection string

const client = new MongoClient(uri);

// Define a function to handle a client login attempt
async function clientLogin(data, socket, io) {
  let alreadyloggedin = false;

  console.log("");

  // Connect to MongoDB and query for credentials
  await client.connect();
  const collection = client.db("<dbname>").collection("<collectionName>"); // replace with your DB and collection names
  const match = await collection.findOne({
    username: data.username,
    password: data.password,
  });

  // Check to see if user already logged in
  let connectedclients = globals.getGlobal('connectedclients');

  connectedclients.forEach((client) => {
    if (client.username == data.username) {
      console.log("ALREADY LOGGED IN");
      alreadyloggedin = true;
      return;
    }
  });

  // If a match is found and not already logged in
  if (match && alreadyloggedin == false) {
    console.log(socket.id, "Successful login using default credentials! From", socket.id);

    // Send message to the client saying that login was successful
    socket.emit('loginSucceed');

    // Import food array global here
    socket.emit(globals.getGlobal("foodArray"));

    // Update the random connectedclient to include the user name of the logged in user
    let connectedclients = globals.getGlobal("connectedclients");
    const clientIndex = connectedclients.findIndex(client => client.id === socket.id);
    console.log("[clientLogin]: Client index:", clientIndex);
    if (clientIndex !== -1) {
      console.log("[clientLogin]: Setting name:", socket.id + " - " + data.username);
      connectedclients[clientIndex].username = match.username;
      connectedclients[clientIndex].type = match.type;
    }

    // Emit the newly logged in user to the frontend
    io.emit('initopponents', [{
      "username": connectedclients[clientIndex].username,
      "x": connectedclients[clientIndex].x,
      "y": connectedclients[clientIndex].y,
      "type": connectedclients[clientIndex].type,
    }]);

    // Emit the 'update' event to the 'frontendmonitor' room with the current list of user IDs
    //console.log("[clientLogin]: Sending user ID's:", connectedclients);
    io.to('frontendmonitor').emit('update', connectedclients);

  } else if (alreadyloggedin == true) {
    socket.emit('loginFailed', `User already logged in!`)
  } else {
    // No match was found
    clientLoginSecurity(data, socket, io);
  }

  if (clientFailCounter == 4) {
    console.log(" !!WARNING!! Too many failed login attemps.");
    console.log("One more attempt before IP is stolen");
  } else if (clientFailCounter >= 5) {
    deactivateLoginButton();
    clientFailCounter == 0;
  }

  // Close the MongoDB connection after we're done
  await client.close();
}

// Export the function for other modules to use
module.exports = clientLogin;
