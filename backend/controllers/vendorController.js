import Vendor from '../models/Vendor.js';
import logger from '../config/logger.js';

// Get all vendors
export const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: vendors.length,
      vendors
    });
  } catch (error) {
    logger.error(`Get vendors error: ${error.message}`);
    res.status(500).json({
      success: false,
      error: 'Error fetching vendors',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get single vendor
export const getVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id)
      .populate('user', 'name email');

    if (!vendor) {
      return res.status(404).json({
        success: false,
        error: 'Vendor not found'
      });
    }

    res.json({
      success: true,
      vendor
    });
  } catch (error) {
    logger.error(`Get vendor error: ${error.message}`);
    res.status(500).json({
      success: false,
      error: 'Error fetching vendor',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Create vendor
export const createVendor = async (req, res) => {
  try {
    const vendor = new Vendor({
      ...req.body,
      user: req.user.id
    });

    await vendor.save();

    logger.info(`New vendor created by user ${req.user.id}`);

    res.status(201).json({
      success: true,
      vendor
    });
  } catch (error) {
    logger.error(`Create vendor error: ${error.message}`);
    res.status(500).json({
      success: false,
      error: 'Error creating vendor',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Update vendor
export const updateVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!vendor) {
      return res.status(404).json({
        success: false,
        error: 'Vendor not found'
      });
    }

    logger.info(`Vendor ${req.params.id} updated by user ${req.user.id}`);

    res.json({
      success: true,
      vendor
    });
  } catch (error) {
    logger.error(`Update vendor error: ${error.message}`);
    res.status(500).json({
      success: false,
      error: 'Error updating vendor',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Delete vendor
export const deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!vendor) {
      return res.status(404).json({
        success: false,
        error: 'Vendor not found'
      });
    }

    logger.info(`Vendor ${req.params.id} deleted by user ${req.user.id}`);

    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    logger.error(`Delete vendor error: ${error.message}`);
    res.status(500).json({
      success: false,
      error: 'Error deleting vendor',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}; 