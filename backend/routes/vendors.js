import express from 'express';
import Vendor from '../models/Vendor.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const vendors = await Vendor.find().populate('userId', 'name email');
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'vendor') {
      return res.status(403).json({ message: 'Only vendors can create listings' });
    }

    const vendor = new Vendor({
      ...req.body,
      userId: req.user._id
    });
    await vendor.save();
    res.status(201).json(vendor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;