const globals = require("../globals.js")

async function getUserStats(inputusername) {
    // MongoDB setup
    const client = globals.getGlobal('mongoDbClient');

    console.log('[getUserStats]:', inputusername);

    try {
       // await client.connect();
        const collection = client.db("game1").collection("game1"); // replace with your DB and collection names

        const user = await collection.findOne({ username: inputusername });
        if (!user) {
            throw new Error('User not found');
        }



        const { username, top_score, total_points, type, score_history } = user;
        const historyCount = score_history.length;

        // Close the MongoDB connection after we're done
       // await client.close();

        console.log('[getUserStats]:', {
          username,
          type,
          top_score,
          total_points,
          historyCount
      });

        return {
            username,
            type,
            top_score,
            total_points,
            historyCount
        };

    } catch (error) {
        console.error('Error reading from MongoDB:', error.message);
        return null;
    }
}

module.exports = getUserStats;
