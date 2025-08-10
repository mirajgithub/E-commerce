// server.js
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './src/config/db.js';

// Load env vars
dotenv.config({ debug: true });
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
connectDB();

// Basic route
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});


