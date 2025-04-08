import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import logger from './config/logger.js';
import { requestLogger, errorLogger } from './middleware/logger.js';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';

// Import routes
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/task.js';
import guestRoutes from './routes/guests.js';
import vendorRoutes from './routes/vendors.js';
import weddingRoutes from './routes/wedding.js';

// Load environment variables
dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Security middleware
app.use(helmet());
app.use(mongoSanitize());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parser
app.use(express.json({ limit: '10kb' }));

// Request logging
app.use(requestLogger);

// API Routes
const apiRouter = express.Router();

// Version 1 routes
const v1Router = express.Router();
v1Router.use('/auth', authRoutes);
v1Router.use('/tasks', taskRoutes);
v1Router.use('/guests', guestRoutes);
v1Router.use('/vendors', vendorRoutes);
v1Router.use('/weddings', weddingRoutes);

// Mount version 1 routes
apiRouter.use('/v1', v1Router);

// Health check route
apiRouter.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Mount API routes
app.use('/api', apiRouter);

// Welcome route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to the Wedding Planner API',
    version: '1.0.0',
    documentation: '/api/docs',
    endpoints: {
      auth: '/api/v1/auth',
      tasks: '/api/v1/tasks',
      guests: '/api/v1/guests',
      vendors: '/api/v1/vendors',
      weddings: '/api/v1/weddings'
    }
  });
});

// Error handling
app.use(errorLogger);
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ 
    success: false, 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  logger.info(`🚀 Server is running on port http://localhost:${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});