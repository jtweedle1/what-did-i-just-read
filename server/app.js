import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import summarizeRoutes from './routes/summarize.js';

dotenv.config(); // Loads the env file

const app = express(); // Create an express app instance
const FRONTEND_ORIGIN = process.env.FRONTEND_URL;

// Middleware
app.use(cors({
    origin: FRONTEND_ORIGIN,
}));
app.use(express.json()); // Middleware to parse incoming JSON in request bodies

// Routes
app.use('/api/summarize', summarizeRoutes);
// app.use('/api/diagram', diagramRoutes);

app.get('/', (req, res) => res.send('API working!'));

// Start server
const PORT = process.env.PORT || 3000; // Use port defined in env or default to 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Starts server and listens on specified port