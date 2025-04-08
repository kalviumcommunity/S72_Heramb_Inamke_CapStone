import Wedding from '../models/Wedding.js';
import User from '../models/User.js';
import logger from '../config/logger.js';

// Create a new wedding
export const createWedding = async (req, res) => {
  try {
    const { date, venue, budget } = req.body;
    
    // Create wedding
    const wedding = new Wedding({
      couple: [req.user.id],
      date,
      venue,
      budget
    });

    await wedding.save();

    // Update user's wedding reference
    await User.findByIdAndUpdate(req.user.id, {
      $push: { weddings: wedding._id }
    });

    logger.info(`New wedding created by user ${req.user.id}`);

    res.status(201).json({
      success: true,
      wedding
    });
  } catch (error) {
    logger.error(`Create wedding error: ${error.message}`);
    res.status(500).json({
      success: false,
      error: 'Error creating wedding',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get all weddings for the current user
export const getWeddings = async (req, res) => {
  try {
    const weddings = await Wedding.find({
      $or: [
        { couple: req.user.id },
        { 'guests.user': req.user.id }
      ]
    })
    .populate('couple', 'name email')
    .populate('guests.user', 'name email')
    .populate('vendors', 'name category');

    res.json({
      success: true,
      count: weddings.length,
      weddings
    });
  } catch (error) {
    logger.error(`Get weddings error: ${error.message}`);
    res.status(500).json({
      success: false,
      error: 'Error fetching weddings',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get single wedding
export const getWedding = async (req, res) => {
  try {
    const wedding = await Wedding.findOne({
      _id: req.params.id,
      $or: [
        { couple: req.user.id },
        { 'guests.user': req.user.id }
      ]
    })
    .populate('couple', 'name email')
    .populate('guests.user', 'name email')
    .populate('vendors', 'name category');

    if (!wedding) {
      return res.status(404).json({
        success: false,
        error: 'Wedding not found'
      });
    }

    res.json({
      success: true,
      wedding
    });
  } catch (error) {
    logger.error(`Get wedding error: ${error.message}`);
    res.status(500).json({
      success: false,
      error: 'Error fetching wedding',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Update wedding
export const updateWedding = async (req, res) => {
  try {
    const wedding = await Wedding.findOneAndUpdate(
      {
        _id: req.params.id,
        couple: req.user.id
      },
      req.body,
      {
        new: true,
        runValidators: true
      }
    )
    .populate('couple', 'name email')
    .populate('guests.user', 'name email')
    .populate('vendors', 'name category');

    if (!wedding) {
      return res.status(404).json({
        success: false,
        error: 'Wedding not found'
      });
    }

    logger.info(`Wedding ${req.params.id} updated by user ${req.user.id}`);

    res.json({
      success: true,
      wedding
    });
  } catch (error) {
    logger.error(`Update wedding error: ${error.message}`);
    res.status(500).json({
      success: false,
      error: 'Error updating wedding',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Add guest to wedding
export const addGuest = async (req, res) => {
  try {
    const { userId, plusOne, dietaryRestrictions, specialRequests } = req.body;
    
    const wedding = await Wedding.findById(req.params.id);
    if (!wedding) {
      return res.status(404).json({
        success: false,
        error: 'Wedding not found'
      });
    }

    // Check if user is part of the couple
    if (!wedding.couple.includes(req.user.id)) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to add guests'
      });
    }

    await wedding.addGuest(userId, {
      plusOne,
      dietaryRestrictions,
      specialRequests
    });

    logger.info(`Guest ${userId} added to wedding ${req.params.id}`);

    res.json({
      success: true,
      wedding
    });
  } catch (error) {
    logger.error(`Add guest error: ${error.message}`);
    res.status(500).json({
      success: false,
      error: 'Error adding guest',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}; 