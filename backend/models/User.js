import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
    select: false,
    validate: {
      validator: function(v) {
        // Password must contain at least one number and one letter
        return /\d/.test(v) && /[a-zA-Z]/.test(v);
      },
      message: 'Password must contain at least one number and one letter'
    }
  },
  role: { 
    type: String, 
    enum: ['couple', 'vendor', 'admin'],
    required: [true, 'Role is required']
  },
  isEmailVerified: {
    type: Boolean,
    default: true
  },
  wedding: {
    type: Schema.Types.ObjectId,
    ref: 'Wedding'
  },
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }],
  participatingWeddings: [{
    wedding: {
      type: Schema.Types.ObjectId,
      ref: 'Wedding'
    },
    role: {
      type: String,
      enum: ['guest', 'bridesmaid', 'groomsman', 'other'],
      default: 'guest'
    }
  }],
  lastLogin: Date,
  isActive: {
    type: Boolean,
    default: true
  },
  failedLoginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: Date
}, {
  timestamps: true
});

// Indexes
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ role: 1 });
userSchema.index({ 'participatingWeddings.wedding': 1 });

// Pre-save middleware for password hashing
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to check if account is locked
userSchema.methods.isLocked = function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
};

// Method to increment failed login attempts
userSchema.methods.incrementLoginAttempts = async function() {
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return await this.updateOne({
      $set: { failedLoginAttempts: 1 },
      $unset: { lockUntil: 1 }
    });
  }
  
  const updates = { $inc: { failedLoginAttempts: 1 } };
  if (this.failedLoginAttempts + 1 >= 5) {
    updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 }; // Lock for 2 hours
  }
  
  return await this.updateOne(updates);
};

// Method to reset failed login attempts
userSchema.methods.resetLoginAttempts = async function() {
  return await this.updateOne({
    $set: { failedLoginAttempts: 0 },
    $unset: { lockUntil: 1 }
  });
};

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

// Methods
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  delete user.failedLoginAttempts;
  delete user.lockUntil;
  return user;
};

export default mongoose.model('User', userSchema);