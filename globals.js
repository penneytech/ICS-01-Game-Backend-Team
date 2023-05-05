// Define an object to hold the global variables
const globals = {
    connectedclients: [], // A string list of all clients connected
    clients: [], // Array of all websocket clients
    foodArray: []
};

// Define a function to set a global variable
function setGlobal(name, value) {
    //console.log(`Setting global variable '${name}' to '${value}'`);
    globals[name] = value;
}

// Define a function to get a global variable
function getGlobal(name) {
    //console.log(`Getting global variable '${name}': '${globals[name]}'`);
    return globals[name];
}

// Export the functions
module.exports = {
    setGlobal,
    getGlobal,
};
