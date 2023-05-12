globals = require("../globals.js");

function updatePosition(message,socket,io){
  // Update the connectedclients global for this socket with the passed x/y params
    let connectedclients = globals.getGlobal('connectedclients');

    let index = connectedclients.indexOf(
        connectedclients.find(object => socket.id === object.id)
    )

    if (index != -1) {
        connectedclients[index].xpos = message.x;
        connectedclients[index].ypos = message.y;
    }

    globals.setGlobal('connectedclients', connectedclients);

  // Emit the new position to all the clients for that user
  // Format {"username:" //, "x": //, "y": //}
  io.emit('updateopponentposition', {"username": message.username, "x": message.x, "y": message.y});

    // Update the frontendmonitor with the latest information 
      io.to('frontendmonitor').emit('update', connectedclients);

}

module.exports = updatePosition();










// function clientRemove(socket){
//   socket.emit('remove player', 'username')
// }








