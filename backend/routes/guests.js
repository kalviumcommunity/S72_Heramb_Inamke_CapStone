import express from 'express';
import { getGuests, updateRSVP } from '../controllers/guestController.js';
import { protect } from '../middleware/auth.js';
import { validateRSVP, validate } from '../middleware/validation.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// Get all guests for a wedding
router.get('/wedding/:weddingId', getGuests);

// Update guest RSVP
router.put('/wedding/:weddingId/rsvp', validateRSVP, validate, updateRSVP);

export default router;
