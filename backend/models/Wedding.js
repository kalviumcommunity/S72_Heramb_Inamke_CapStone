import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const WeddingSchema = new Schema({
  // Relationship with User (one-to-one, bidirectional)
  couple: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
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
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    rsvpStatus: {
      type: String,
      enum: ['pending', 'attending', 'not attending'],
      default: 'pending'
    },
    plusOne: {
      allowed: {
        type: Boolean,
        default: false
      },
      name: String,
      dietaryRestrictions: String
    },
    dietaryRestrictions: String,
    specialRequests: String
  }],
  // Relationship with Vendors (one-to-many)
  vendors: [{
    type: Schema.Types.ObjectId,
    ref: 'Vendor'
  }],
  // Add reference to photos
  photos: [{
    url: {
      type: String,
      required: true
    },
    caption: String,
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    uploadDate: {
      type: Date,
      default: Date.now
    },
    isPublic: {
      type: Boolean,
      default: true
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Pre-save middleware to update the updatedAt field
WeddingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Add methods for managing guests
WeddingSchema.methods.addGuest = function(userId) {
  if (!this.guests.some(guest => guest.user && guest.user.toString() === userId.toString())) {
    this.guests.push({ user: userId });
  }
  return this.save();
};

WeddingSchema.methods.updateGuestRSVP = function(userId, status) {
  const guest = this.guests.find(guest => guest.user && guest.user.toString() === userId.toString());
  if (guest) {
    guest.rsvpStatus = status;
    return this.save();
  }
  return Promise.reject(new Error('Guest not found'));
};

// Add methods for managing photos
WeddingSchema.methods.addPhoto = function(photoData) {
  this.photos.push(photoData);
  return this.save();
};

const Wedding = mongoose.model('Wedding', WeddingSchema);
export default Wedding; 