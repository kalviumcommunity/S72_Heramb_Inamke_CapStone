import express from 'express';
import Guest from '../models/Guest.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const guests = await Guest.find({ userId: req.user._id });
    res.json(guests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const guest = new Guest({
      ...req.body,
      userId: req.user._id
    });
    await guest.save();
    res.status(201).json(guest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
