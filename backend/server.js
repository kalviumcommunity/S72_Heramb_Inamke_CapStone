import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Import routes
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/task.js';
import guestRoutes from './routes/guests.js';
import vendorRoutes from './routes/vendors.js';

// Load environment variables
dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/guests', guestRoutes);
app.use('/api/vendors', vendorRoutes);

app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀Server is running on port http://localhost:${PORT}`);
});