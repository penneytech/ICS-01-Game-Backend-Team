function inGameLeaderboard(players) {
    // filter out players without a username
    let filteredPlayers = players.filter(player => player.username !== '' && player.username !== 'frontendmonitor');

    // create a new array containing usernames and scores
    let playerScores = filteredPlayers.map(player => ({ username: player.username, score: player.currentscore }));

    // sort the array in descending order of score
    playerScores.sort((a, b) => b.score - a.score);

    return playerScores;
}

module.exports = inGameLeaderboard;