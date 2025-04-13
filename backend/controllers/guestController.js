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

// Update & Delete

export const updateGuest = async (req, res) => {
  try {
    const updatedGuest = await Guest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedGuest) {
      return res.status(404).json({ message: 'Guest not found' });
    }
    
    res.status(200).json(updatedGuest);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteGuest = async (req, res) => {
  try {
    const guest = await Guest.findById(req.params.id);
    
    if (!guest) {
      return res.status(404).json({ message: 'Guest not found' });
    }
    
    await Wedding.findByIdAndUpdate(
      guest.wedding,
      { $pull: { guests: req.params.id } }
    );
    
    await Guest.findByIdAndDelete(req.params.id);
    
    res.status(200).json({ message: 'Guest deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
