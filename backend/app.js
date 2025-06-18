import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import logger from './config/logger.js';
import { requestLogger, errorLogger } from './middleware/logger.js';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { generalLimiter, authLimiter, sensitiveLimiter } from './middleware/rateLimiter.js';

// Import routes
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/task.js';
import guestRoutes from './routes/guests.js';
import vendorRoutes from './routes/vendors.js';
import weddingRoutes from './routes/wedding.js';
import testRoutes from './routes/testRoutes.js';

dotenv.config();

const app = express();

// Connect to MongoDB only if not in test environment
if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", process.env.CLIENT_URL],
    },
  },
}));
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Apply general rate limiting to all routes
app.use('/api/', generalLimiter);

// Apply stricter rate limiting to auth routes
app.use('/api/v1/auth', authLimiter);

// Apply sensitive operation rate limiting
app.use('/api/v1/weddings', sensitiveLimiter);
app.use('/api/v1/vendors', sensitiveLimiter);

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parser
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    ttl: 24 * 60 * 60, // 1 day
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  },
}));

// Compression
app.use(compression());

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

// Mount test routes
apiRouter.use('/test', testRoutes);

// Health check route
apiRouter.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
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
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!';
  res.status(statusCode).json({ 
    success: false, 
    error: message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

export default app; 