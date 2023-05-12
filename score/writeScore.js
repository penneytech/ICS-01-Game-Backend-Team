const fs = require('fs');

function writeScore(username, score) {
  fs.readFile('credentials.json', 'utf8', (err, data) => {
    if (err) {
      console.error('[writeScore]: Error reading credentials file:', err);
      return;
    }

    try {
      const credentials = JSON.parse(data);
      const user = credentials.find(user => user.username === username);

      if (user) {
        const scoreEntry = {
          score: score,
          datestamp: new Date().toISOString()
        };
        user.score_history.push(scoreEntry);
        user.total_points = user.score_history.reduce((total, entry) => total + entry.score, 0);
        user.top_score = Math.max(...user.score_history.map(entry => entry.score));
      } else {
        console.error('[writeScore]: User not found:', username);
        return;
      }

      fs.writeFile('credentials.json', JSON.stringify(credentials, null, 2), 'utf8', (err) => {
        if (err) {
          console.error('[writeScore]: Error writing credentials file:', err);
        } else {
          console.log('[writeScore]: Credentials file updated successfully.');
        }
      });
    } catch (err) {
      console.error('[writeScore]: Error parsing credentials file:', err);
    }
  });
}

module.exports = writeScore;
