import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  businessName: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  priceRange: { type: String, required: true },
  description: String,
  contactNumber: String
});

export default mongoose.model('Vendor', vendorSchema);