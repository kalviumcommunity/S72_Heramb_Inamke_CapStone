import Guest from '../models/Guest.js';
import Wedding from '../models/Wedding.js';
import logger from '../config/logger.js';

// Get all guests for a wedding
export const getGuests = async (req, res) => {
  try {
    const wedding = await Wedding.findById(req.params.weddingId);

    if (!wedding) {
      return res.status(404).json({
        success: false,
        error: 'Wedding not found'
      });
    }

    if (!wedding.couple.includes(req.user.id) &&
        !wedding.guests.some(g => g.user.toString() === req.user.id)) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to view guests'
      });
    }

    const guests = await Guest.find({ wedding: req.params.weddingId })
        .populate('user', 'name email')
        .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: guests.length,
      guests
    });
  } catch (error) {
    logger.error(`Get guests error: ${error.message}`);
    res.status(500).json({
      success: false,
      error: 'Error fetching guests',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get single guest
export const getGuest = async (req, res) => {
  try {
    const guest = await Guest.findOne({
      _id: req.params.id,
      wedding: req.params.weddingId
    }).populate('user', 'name email');

    if (!guest) {
      return res.status(404).json({
        success: false,
        error: 'Guest not found'
      });
    }

    res.json({
      success: true,
      guest
    });
  } catch (error) {
    logger.error(`Get guest error: ${error.message}`);
    res.status(500).json({
      success: false,
      error: 'Error fetching guest',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Create new guest
export const createGuest = async (req, res) => {
  try {
    const wedding = await Wedding.findById(req.params.weddingId);

    if (!wedding) {
      return res.status(404).json({
        success: false,
        error: 'Wedding not found'
      });
    }

    if (!wedding.couple.includes(req.user.id)) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to add guests'
      });
    }

    const newGuest = new Guest({
      ...req.body,
      wedding: req.params.weddingId,
      addedBy: req.user.id
    });

    const savedGuest = await newGuest.save();
    await savedGuest.populate('user', 'name email');

    logger.info(`New guest created for wedding ${req.params.weddingId} by user ${req.user.id}`);

    res.status(201).json({
      success: true,
      guest: savedGuest
    });
  } catch (error) {
    logger.error(`Create guest error: ${error.message}`);
    res.status(500).json({
      success: false,
      error: 'Error creating guest',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Update guest
export const updateGuest = async (req, res) => {
  try {
    const wedding = await Wedding.findById(req.params.weddingId);

    if (!wedding) {
      return res.status(404).json({
        success: false,
        error: 'Wedding not found'
      });
    }

    if (!wedding.couple.includes(req.user.id)) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update guests'
      });
    }

    const guest = await Guest.findOneAndUpdate(
        { _id: req.params.id, wedding: req.params.weddingId },
        { $set: req.body },
        { new: true, runValidators: true }
    ).populate('user', 'name email');

    if (!guest) {
      return res.status(404).json({
        success: false,
        error: 'Guest not found'
      });
    }

    logger.info(`Guest ${req.params.id} updated for wedding ${req.params.weddingId}`);

    res.json({
      success: true,
      guest
    });
  } catch (error) {
    logger.error(`Update guest error: ${error.message}`);
    res.status(500).json({
      success: false,
      error: 'Error updating guest',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Delete guest
export const deleteGuest = async (req, res) => {
  try {
    const wedding = await Wedding.findById(req.params.weddingId);

    if (!wedding) {
      return res.status(404).json({
        success: false,
        error: 'Wedding not found'
      });
    }

    if (!wedding.couple.includes(req.user.id)) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete guests'
      });
    }

    const guest = await Guest.findOneAndDelete({
      _id: req.params.id,
      wedding: req.params.weddingId
    });

    if (!guest) {
      return res.status(404).json({
        success: false,
        error: 'Guest not found'
      });
    }

    logger.info(`Guest ${req.params.id} deleted from wedding ${req.params.weddingId}`);

    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    logger.error(`Delete guest error: ${error.message}`);
    res.status(500).json({
      success: false,
      error: 'Error deleting guest',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Update guest RSVP
export const updateRSVP = async (req, res) => {
  try {
    const { status, plusOne, dietaryRestrictions, specialRequests } = req.body;

    const wedding = await Wedding.findById(req.params.weddingId);
    if (!wedding) {
      return res.status(404).json({
        success: false,
        error: 'Wedding not found'
      });
    }

    const guestIndex = wedding.guests.findIndex(
        g => g.user.toString() === req.user.id
    );

    if (guestIndex === -1) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update RSVP'
      });
    }

    wedding.guests[guestIndex] = {
      ...wedding.guests[guestIndex],
      rsvpStatus: status,
      plusOne: plusOne ? {
        allowed: true,
        name: plusOne.name,
        dietaryRestrictions: plusOne.dietaryRestrictions
      } : { allowed: false },
      dietaryRestrictions,
      specialRequests
    };

    await wedding.save();

    logger.info(`Guest ${req.user.id} updated RSVP for wedding ${req.params.weddingId}`);

    res.json({
      success: true,
      guest: wedding.guests[guestIndex]
    });
  } catch (error) {
    logger.error(`Update RSVP error: ${error.message}`);
    res.status(500).json({
      success: false,
      error: 'Error updating RSVP',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
