import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const VendorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Venue', 'Catering', 'Photography', 'Florist', 'Music', 'Other'],
    required: true
  },
  contact: {
    email: String,
    phone: String,
    website: String
  },
  // Relationship with Wedding (many-to-one)
  wedding: {
    type: Schema.Types.ObjectId,
    ref: 'Wedding',
    required: true
  },
  price: {
    type: Number
  },
  notes: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Vendor', VendorSchema);