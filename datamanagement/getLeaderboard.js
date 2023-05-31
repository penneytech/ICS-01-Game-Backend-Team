const { MongoClient } = require('mongodb');
const globals = require("../globals.js")

// MongoDB setup
const client = globals.getGlobal('mongoDbClient');

async function sortUsersByPoints() {
    console.log('[sortUsersByPoints]: Sorting users by points.');

    try {
        //await client.connect();
        const collection = client.db("game1").collection("game1"); // replace with your DB and collection names

        // Fetch all users
        const userData = await collection.find({}).toArray();

        // Sort the user data by total points in descending order
        const sortedUserData = userData.sort((a, b) => b.total_points - a.total_points);

        console.log('[sortUsersByPoints]: Users sorted successfully.');

        globals.setGlobal("leaderboarddata", sortedUserData);

    } catch (error) {
        console.error('[sortUsersByPoints]: Error interacting with MongoDB:', error.message);
    } finally {
        // Close the MongoDB connection after we're done
        //await client.close();
    }
}

module.exports = sortUsersByPoints;
