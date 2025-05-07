const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Loads the env file

const app = express(); // Create an express app instance
app.use(cors()); // Enable CORS globally 
app.use(express.json()); // Middleware to parse incoming JSON in request bodies

app.get('/', (req, res) => res.send('API working!'));

const PORT = process.env.PORT || 3000; // Use port defined in env or default to 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Starts server and listens on specified port