import express from 'express';
import {
  createWedding,
  getWeddings,
  getWedding,
  updateWedding,
  addGuest
} from '../controllers/weddingController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validateWedding, validate } from '../middleware/validation.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// Get all weddings for the current user
router.get('/', getWeddings);

// Get single wedding
router.get('/:id', getWedding);

// Create wedding (only for couples)
router.post('/', authorize('couple'), validateWedding, validate, createWedding);

// Update wedding (only for couples)
router.put('/:id', authorize('couple'), validateWedding, validate, updateWedding);

// Add guest to wedding (only for couples)
router.post('/:id/guests', authorize('couple'), addGuest);

export default router; 