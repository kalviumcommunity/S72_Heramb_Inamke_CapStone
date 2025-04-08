import express from 'express';
import {
  getVendors,
  getVendor,
  createVendor,
  updateVendor,
  deleteVendor
} from '../controllers/vendorController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validateVendor, validate } from '../middleware/validation.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// Get all vendors
router.get('/', getVendors);

// Get single vendor
router.get('/:id', getVendor);

// Create vendor (only for vendors)
router.post('/', authorize('vendor'), validateVendor, validate, createVendor);

// Update vendor (only for the vendor owner)
router.put('/:id', validateVendor, validate, updateVendor);

// Delete vendor (only for the vendor owner)
router.delete('/:id', deleteVendor);

export default router;