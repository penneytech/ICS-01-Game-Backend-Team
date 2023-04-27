const fs = require('fs');

function updateUserScore(username, scoreUpdate) {
  // Read the JSON data from file
  const data = fs.readFileSync('credentials.json', 'utf8');

  // Parse the JSON data into an object
  const users = JSON.parse(data);

  // Find the user with the given username
  const index = users.findIndex((user) => user.username === username);

  if (index !== -1) {
    // Add the new score to the score history array
    users[index].score_history.push(scoreUpdate);

    // Find the highest score in the score history array
    const topScore = Math.max(...users[index].score_history);

    // Update the top score property of the user
    users[index].top_score = topScore;

    // Calculate the total points from the score history array
    const totalPoints = users[index].score_history.reduce((a, b) => a + b, 0);

    // Update the total points property of the user
    users[index].total_points = totalPoints;

    // Convert the updated object back into a JSON string
    const updatedData = JSON.stringify(users);

    // Write the updated JSON string back to file
    fs.writeFileSync('credentials.json', updatedData);
  }
}