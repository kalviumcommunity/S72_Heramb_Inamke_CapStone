import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['couple', 'vendor'], required: true },
  wedding: {
    type: Schema.Types.ObjectId,
    ref: 'Wedding'
  },
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }],
  createdAt: { type: Date, default: Date.now },
  weddings: [{
    type: Schema.Types.ObjectId,
    ref: 'Wedding'
  }],
  participatingWeddings: [{
    type: Schema.Types.ObjectId,
    ref: 'Wedding',
    role: {
      type: String,
      enum: ['guest', 'bridesmaid', 'groomsman', 'other'],
      default: 'guest'
    }
  }]
});

export default mongoose.model('User', userSchema);