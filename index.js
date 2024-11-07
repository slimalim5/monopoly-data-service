const express = require('express');
const db = require('./config'); // Import the database connection from config.js
const app = express();
const port = process.env.PORT || 3000;

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the Monopoly data service');
});

// Database connection test route
app.get('/test-db', async (req, res) => {
  try {
    const result = await db.one('SELECT 1');
    res.json({ success: true, result });
  } catch (error) {
    console.error("Database connection test failed:", error.message);
    res.status(500).send('Database connection failed');
  }
});

// Retrieve all players
app.get('/players', async (req, res) => {
  try {
    console.log("Attempting to fetch players...");
    const players = await db.any('SELECT * FROM Player');
    console.log("Players fetched:", players);
    res.json(players);
  } catch (error) {
    console.error("Error fetching players:", error.message); // Log specific error message
    console.error("Full error details:", error); // Log full error object for deeper insights
    res.status(500).send('Error fetching players');
  }
});

// Retrieve player by ID
app.get('/players/:id', async (req, res) => {
  const playerId = req.params.id;
  try {
    const player = await db.oneOrNone('SELECT * FROM Player WHERE ID = $1', [playerId]);
    if (player) res.json(player);
    else res.status(404).send('Player not found');
  } catch (error) {
    console.error("Error fetching player:", error.message);
    res.status(500).send('Error fetching player');
  }
});

// Undefined route for testing error handling
app.get('/blob', (req, res) => {
  res.status(404).send('Endpoint not defined');
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Additional error handling to capture port binding errors
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Please choose a different port.`);
  } else {
    console.error("Error starting server:", err);
  }
});
