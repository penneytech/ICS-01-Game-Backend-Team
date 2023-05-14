const { Client } = require('pg');

// Create a new PostgreSQL client
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Connect to the PostgreSQL database
client.connect();

// Array of pre-defined user objects
const preDefinedUsers = [
  // User objects here...
];

// Function to store user data
async function storeUserData(user) {
  try {
    const query = `
      INSERT INTO users (data)
      VALUES ($1)
    `;
    const values = [user];
    await client.query(query, values);
  } catch (error) {
    console.error('Error storing user data:', error);
  }
}

// Function to check if the database is already initialized
async function isDatabaseInitialized() {
  try {
    const query = `
      SELECT COUNT(*) AS count
      FROM users
    `;
    const result = await client.query(query);

    return result.rows[0].count > 0;
  } catch (error) {
    console.error('Error checking database initialization:', error);
    return false;
  }
}

// Function to initialize the database with pre-defined users
async function initializeDatabase() {
  try {
    const initialized = await isDatabaseInitialized();

    if (!initialized) {
      for (const user of preDefinedUsers) {
        await storeUserData(user);
      }

      console.log('Database initialization complete.');
    } else {
      console.log('Database is already initialized.');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    // Disconnect from the PostgreSQL database
    client.end();
  }
}

// Call the function to initialize the database
initializeDatabase();
