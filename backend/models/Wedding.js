const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WeddingSchema = new Schema({
  // Relationship with User (one-to-one, bidirectional)
  couple: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  budget: {
    type: Number,
    required: true
  },
  // Relationship with Guests (one-to-many)
  guests: [{
    type: Schema.Types.ObjectId,
    ref: 'Guest'
  }],
  // Relationship with Vendors (one-to-many)
  vendors: [{
    type: Schema.Types.ObjectId,
    ref: 'Vendor'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Wedding', WeddingSchema); 