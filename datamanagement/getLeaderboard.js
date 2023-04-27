const fs = require('fs');

function sortUsersByPoints() {
  // Read the existing user data from the users.json file
  const userData = JSON.parse(fs.readFileSync('credentials.json'));

  // Sort the user data by total points in descending order
  const sortedUserData = userData.sort((a, b) => b.total_points - a.total_points);

  // Write the sorted user data to a new file called sorted_users.json
  fs.writeFileSync('topscores.json', JSON.stringify(sortedUserData));
}

module.exports = sortUsersByPoints;