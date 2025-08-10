// server.js
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './src/config/db.js';
import authRoutes from './src/routes/auth.route.js'
import userRoutes from './src/routes/user.route.js'
import { errorHandler } from './src/middlewares/errorHandler.js'
// Load env vars
dotenv.config({ debug: true });
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
connectDB();

// auth Routes
app.use('/api/auth', authRoutes);

// user Routes
app.use('/api/user', userRoutes)

// Basic route
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use(errorHandler)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});


