import express from 'express';
import { register, login, getCurrentUser } from '../controllers/authController.js';
import { validateUserRegistration, validateUserLogin, validate } from '../middleware/validation.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', validateUserRegistration, validate, register);
router.post('/login', validateUserLogin, validate, login);

// Protected routes
router.get('/me', protect, getCurrentUser);

export default router;