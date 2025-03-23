const Guest = require('../models/Guest');

// Update a guest
exports.updateGuest = async (req, res) => {
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

// Delete a guest
exports.deleteGuest = async (req, res) => {
  try {
    const guest = await Guest.findById(req.params.id);
    
    if (!guest) {
      return res.status(404).json({ message: 'Guest not found' });
    }
    
    // Remove guest from the wedding's guests array
    await Wedding.findByIdAndUpdate(
      guest.wedding,
      { $pull: { guests: req.params.id } }
    );
    
    // Delete the guest
    await Guest.findByIdAndDelete(req.params.id);
    
    res.status(200).json({ message: 'Guest deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}; 