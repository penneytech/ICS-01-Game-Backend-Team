const globals = require("../globals.js");

async function clientLoginSecurity(data, socket, io) {
    console.log("[clientLoginSecurity]: Running...");

    const client = globals.getGlobal('mongoDbClient');

    try {
        await client.connect();
        const collection = client.db("game1").collection("game1");
        let retrievedData = await collection.findOne({ username: data.username });

        console.log("[clientLoginSecurity]: retrieving user - ", retrievedData);

        if (retrievedData == null) {
            console.log("[clientLoginSecurity]: retrieving user - Not found");
            return;
        }

        if (retrievedData.numberfailedlogins == 4) {
            retrievedData.numberfailedlogins = 5;
            console.log("Too many logins, please wait 15 minutes");

            const date = new Date();
            retrievedData.lastlogindate = date;
            console.log("[clientLoginSecurity]:", retrievedData);

            await collection.updateOne(
                { username: retrievedData.username },
                { $set: retrievedData }
            );

            setTimeout(async function () {
                const clientTimeout = new MongoClient(uri);
                await clientTimeout.connect();

                const collectionTimeout = clientTimeout.db("game1").collection("game1");
                
                console.log("setTimeout Created for", socket.id, retrievedData.user)

                retrievedData.numberfailedlogins = 0;
                await collectionTimeout.updateOne(
                    { username: retrievedData.username },
                    { $set: retrievedData }
                );
                
                await clientTimeout.close();
            }, 900000);
        } else if (retrievedData.numberfailedlogins == 5) {
            console.log("FIVE: Too many logins, please wait 15 minutes");
            socket.emit('loginFailed', "Account locked for 15 minutes.")
        } else {
            if (retrievedData.numberfailedlogins === undefined) {
                retrievedData.numberfailedlogins = 0;
            }
            retrievedData.numberfailedlogins = retrievedData.numberfailedlogins + 1;
            const date = new Date();
            retrievedData.lastlogindate = date;
            console.log("[clientLoginSecurity]:", retrievedData);
            const numbertriesremaining = 5 - retrievedData.numberfailedlogins;
            socket.emit('loginFailed', `Incorrect username or password combination. ` + numbertriesremaining + ` tries remaining.`)

            await collection.updateOne(
                { username: retrievedData.username },
                { $set: retrievedData }
            );
        }
    } catch (error) {
        console.error("[clientLoginSecurity]: Error occurred", error);
    } finally {
        // Close the MongoDB connection after we're done
       // await client.close();
    }
}

module.exports = { clientLoginSecurity };
