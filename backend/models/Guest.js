import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const guestSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  wedding: {
    type: Schema.Types.ObjectId,
    ref: 'Wedding',
    required: true
  },
  status: {
    type: String,
    enum: ['Invited', 'Confirmed', 'Declined', 'Pending'],
    default: 'Invited'
  },
  partySize: {
    type: Number,
    default: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Guest', guestSchema);