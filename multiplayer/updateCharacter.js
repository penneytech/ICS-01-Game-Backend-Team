const { MongoClient } = require('mongodb');
const globals = require('../globals.js')

// MongoDB setup
const client = globals.getGlobal('mongoDbClient');

async function updateCharacters(character, socket) {

    console.log('[updateCharacters]:', character, socket.id);

    // Set the character in connectedclients
    let connectedclients = globals.getGlobal('connectedclients');

    let index = connectedclients.indexOf(connectedclients.find(client => client.id == socket.id))
    console.log(index)

    // Write the character to the MongoDB
    if (index != -1) {
        connectedclients[index].type = character;
        globals.setGlobal('connectedclients', connectedclients);
        console.log(connectedclients);
    }

    try {
        await client.connect();
        const collection = client.db("game1").collection("game1"); // replace with your DB and collection names

        // Fetch the user
        let user = await collection.findOne({ username: connectedclients[index].username });

        if (!user) {
            console.error('User not found:', connectedclients[index].username);
            return;
        }

        // Update the user's character type
        await collection.updateOne(
            { username: user.username },
            { $set: { type: character } }
        );
        console.log('User character updated successfully.');
    } catch (error) {
        console.error('Error updating user character:', error.message);
    } 
}

module.exports = updateCharacters;
