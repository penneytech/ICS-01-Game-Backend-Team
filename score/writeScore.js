const fs = require('fs');
const globals = require('../globals.js'); // Assuming globals is a module

function updateScores() {
  const connectedclients = globals.getGlobal('connectedclients');

  fs.readFile('credentials.json', 'utf8', (err, data) => {
    if (err) {
      console.error('[updateScores]: Error reading credentials file:', err);
      return;
    }

    try {
      const credentials = JSON.parse(data);

      // Loop through all connected clients
      connectedclients.forEach(client => {
        // Skip this client if their score is 0
        if (client.score === 0) return;

        console.log('[updateScores]: Updating score for:', client.username, 'Score:', client.score);  // New log line

        const user = credentials.find(user => user.username === client.username);

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
          }
        } else {
          console.error('[updateScores]: User not found:', client.username);
          return;
        }
      });

      // Save connected clients 
      globals.setGlobal('connectedclients', connectedclients);

      // Write the updated credentials to file
      fs.writeFile('credentials.json', JSON.stringify(credentials, null, 2), 'utf8', (err) => {
        if (err) {
          console.error('[updateScores]: Error writing credentials file:', err);
        } else {
          console.log('[updateScores]: Credentials file updated successfully.');
        }
      });
    } catch (err) {
      console.error('[updateScores]: Error parsing credentials file:', err);
    }
  });
}

module.exports = updateScores;
