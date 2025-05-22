import express from 'express';
import {
    getGuests,
    getGuest,
    createGuest,
    updateGuest,
    deleteGuest,
    updateRSVP
} from '../controllers/guestController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// GET /api/weddings/:weddingId/guests - Get all guests for a wedding
router.get('/weddings/:weddingId/guests', getGuests);

// GET /api/weddings/:weddingId/guests/:id - Get single guest
router.get('/weddings/:weddingId/guests/:id', getGuest);

// POST /api/weddings/:weddingId/guests - Create new guest
router.post('/weddings/:weddingId/guests', createGuest);

// PUT /api/weddings/:weddingId/guests/:id - Update guest
router.put('/weddings/:weddingId/guests/:id', updateGuest);

// DELETE /api/weddings/:weddingId/guests/:id - Delete guest
router.delete('/weddings/:weddingId/guests/:id', deleteGuest);

// PUT /api/weddings/:weddingId/guests/:id/rsvp - Update guest RSVP
router.put('/weddings/:weddingId/guests/:id/rsvp', updateRSVP);

export default router;
