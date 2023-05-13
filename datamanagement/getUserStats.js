const fs = require('fs');

function getUserStats(inputusername) {
  
    console.log('[getUserStats]:', inputusername)

  try {
    const fileContents = fs.readFileSync('credentials.json', 'utf-8');
    const data = JSON.parse(fileContents);
    
    const user = data.find(user => user.username === inputusername);
    if (!user) {
      throw new Error('User not found');
    }

    const { username, top_score, total_points, type, score_history } = user;
    const historyCount = score_history.length;

    return {
      username,
      type,
      top_score,
      total_points,
      historyCount
    };
  } catch (error) {
    console.error('Error reading credentials.json:', error.message);
    return null;
  }
}

module.exports = getUserStats;