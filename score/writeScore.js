const { MongoClient } = require('mongodb');
const globals = require('../globals.js');

// MongoDB setup
const client = globals.getGlobal('mongoDbClient');

async function updateScores() {
  const connectedclients = globals.getGlobal('connectedclients');

  try {
    await client.connect();
    const collection = client.db("game1").collection("game1"); // replace with your DB and collection names

    // Loop through all connected clients
    for (let client of connectedclients) {
      // Skip this client if their score is 0
      if (client.score === 0) continue;

      console.log('[updateScores]: Updating score for:', client.username, 'Score:', client.currentscore);

      const user = await collection.findOne({ username: client.username });

      if (user) {

        if (client.currentscore != 0) {
          const scoreEntry = {
            score: client.currentscore,
            datestamp: new Date().toISOString()
          };

          user.score_history.push(scoreEntry);
          user.total_points = user.score_history.reduce((total, entry) => total + entry.score, 0);
          user.top_score = Math.max(...user.score_history.map(entry => entry.score));
          client.currentscore = 0;

          // Update user in MongoDB
          await collection.updateOne({ username: client.username }, { $set: user });
        }
      } else {
        console.error('[updateScores]: User not found:', client.username);
        continue;
      }
    }

    // Save connected clients
    globals.setGlobal('connectedclients', connectedclients);

    console.log('[updateScores]: Scores updated successfully.');

  } catch (error) {
    console.error('[updateScores]: Error interacting with MongoDB:', error.message);
  } finally {
    // Close the MongoDB connection after we're done
   // await client.close();
  }
}

module.exports = updateScores;
