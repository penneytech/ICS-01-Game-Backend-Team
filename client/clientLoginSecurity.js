
const credentials = require('./credentials.json');
const fs = require("fs");
const path = require("path");

function readUserDataDemo() {
    // Called to run in server.js at the bottom for demo purposes
}

for (let i = 0; i < credentials.length; i++) {
    console.log("[readUserDataDemo]:", credentials[i].username);
}


// Resets number for failed logins for the user to 0
function resetLogins(data, socket, io) {
    console.log('login reset for ', socket.id)
    data.numberfailedlogins == 0;

    // Update the user data in the credentials.json file
    const filePath = path.join(__dirname, "credentials.json");
    const allData = fs.readFileSync(filePath);
    const userData = JSON.parse(allData);
    const newUserData = userData.map(user => {
        if (user.username === data.username) {
            return retrievedData;
        } else {
            return user;
        }
    });

    fs.writeFileSync(filePath, JSON.stringify(newUserData, null, 2)); // Human-readable JSON formatting with 2 spaces for indentation
}

function clientLoginSecurity(data, socket, io) {
    console.log("[clientLoginSecurity]: Running...");

    let retrievedData = searchUserByUsername(data.username);
    console.log("[clientLoginSecurity]: retrieving user - ", retrievedData);

    // checks if numberfailedlogins is greater than or equal to 4
    // if so, log the date and start 15min timer before user can login again
    if (retrievedData.numberfailedlogins == 4) {
        retrievedData.numberfailedlogins == 5;
        console.log("Too many logins, please wait 15 minutes");

        const date = new Date();
        retrievedData.lastlogindate = date;
        console.log("[clientLoginSecurity]:", retrievedData);

        setTimeout(function() {
            console.log("")
            console.log("setTimeout Created for", socket.id, retrievedData.user)
            
            // resetLogins(data, socket, io);
            retrievedData.numberfailedlogins = 0;
            
            // Update the user data in the credentials.json file
            const filePath = path.join(__dirname, "credentials.json");
            const allData = fs.readFileSync(filePath);
            const userData = JSON.parse(allData);
            const newUserData = userData.map(user => {
                if (user.username === retrievedData.username) {
                    return retrievedData;
                } else {
                    return user;
                }
            });

            fs.writeFileSync(filePath, JSON.stringify(newUserData, null, 2)); // Human-readable JSON formatting with 2 spaces for indentation

        }, 2000); // Sets timer for 15 minutes (900000)

    } else if (retrievedData.numberfailedlogins == 5) {
        console.log("FIVE: Too many logins, please wait 15 minutes");
        socket.emit('loginFailed', "Account locked for 15 minutes.")
    } else {
        retrievedData.numberfailedlogins = retrievedData.numberfailedlogins + 1;
        const date = new Date();
        retrievedData.lastlogindate = date;
        console.log("[clientLoginSecurity]:", retrievedData);
        const numbertriesremaining = 5 - retrievedData.numberfailedlogins;
        socket.emit('loginFailed', `Incorrect username or password combination. ` + numbertriesremaining + ` tries remaining.`)
    }

    // Update the user data in the credentials.json file
    const filePath = path.join(__dirname, "credentials.json");
    const allData = fs.readFileSync(filePath);
    const userData = JSON.parse(allData);
    const newUserData = userData.map(user => {
        if (user.username === retrievedData.username) {
            return retrievedData;
        } else {
            return user;
        }
    });

    fs.writeFileSync(filePath, JSON.stringify(newUserData, null, 2)); // Human-readable JSON formatting with 2 spaces for indentation
}

function searchUserByUsername(username) {
    const filePath = path.join(__dirname, "credentials.json");
    const returnedjson = fs.readFileSync(filePath);
    const userData = JSON.parse(returnedjson);
    for (let user of userData) {
        if (user.username === username) {
            return user;
        }
    }
    return null;
}

module.exports = { clientLoginSecurity, readUserDataDemo };