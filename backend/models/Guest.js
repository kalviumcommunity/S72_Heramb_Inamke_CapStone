import mongoose from 'mongoose';

const guestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  email: String,
  phone: String,
  rsvpStatus: {
    type: String,
    enum: ['pending', 'attending', 'not-attending'],
    default: 'pending'
  }
});

export default mongoose.model('Guest', guestSchema);