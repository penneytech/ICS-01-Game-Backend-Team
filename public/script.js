const socket = io();

// On initial connection
socket.on("connect", () => {
    console.log("Connected to server");

    // Identify with the backend server as "frontendmonitor"
    socket.emit("ident", "frontendmonitor");

    // Login with the frontendmonitor credentials
    socket.emit("login", {
        username: "frontendmonitor",
        password: "password"
    });
});

// When a new client list is received
socket.on("update", (data) => {
    console.log("Received client from server", data);

    // Get the client data
    let connectedClients = data;
    const clientTable = document.getElementById("connected-clients");

    // Clear the previous table rows
    clientTable.innerHTML = "";

    // Add the header row
    const headerRow = document.createElement("tr");
    const idHeader = document.createElement("th");
    const usernameHeader = document.createElement("th");
    const xHeader = document.createElement("th"); // New column for X
    const yHeader = document.createElement("th"); // New column for Y
    const scoreHeader = document.createElement("th"); // New column for score

    idHeader.textContent = "ID";
    usernameHeader.textContent = "Username";
    xHeader.textContent = "X"; // New column label for X
    yHeader.textContent = "Y"; // New column label for Y
    scoreHeader.textContent = "Score"; // New column label for score

    headerRow.appendChild(idHeader);
    headerRow.appendChild(usernameHeader);
    headerRow.appendChild(xHeader); // Add the new column header for X
    headerRow.appendChild(yHeader); // Add the new column header for Y
    headerRow.appendChild(scoreHeader); // Add the new column header for score

    clientTable.appendChild(headerRow);

    // Add the new table rows
    connectedClients.forEach((clientID) => {
        const tableRow = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent = clientID.id;
        tableRow.appendChild(idCell);

        const usernameCell = document.createElement("td");
        usernameCell.textContent = clientID.username;
        tableRow.appendChild(usernameCell);

        const xCell = document.createElement("td"); // New cell for X
        xCell.textContent = clientID.x; // Assuming the client data contains the value for X
        tableRow.appendChild(xCell);

        const yCell = document.createElement("td"); // New cell for Y
        yCell.textContent = clientID.y; // Assuming the client data contains the value for Y
        tableRow.appendChild(yCell);

        const scoreCell = document.createElement("td"); // New cell for score
        scoreCell.textContent = clientID.currentscore; // Assuming the client data contains the value for score
        tableRow.appendChild(scoreCell);

        clientTable.appendChild(tableRow);
    });
});

// On disconnect
socket.on("disconnect", () => {
    console.log("Disconnected from server");
});
