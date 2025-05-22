import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        minlength: [3, 'Title must be at least 3 characters long'],
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        minlength: [10, 'Description must be at least 10 characters long'],
        maxlength: [1000, 'Description cannot be more than 1000 characters']
    },
    dueDate: {
        type: Date,
        required: [true, 'Due date is required'],
        validate: {
            validator: function(v) {
                return v > new Date();
            },
            message: 'Due date must be in the future'
        }
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Assigned user is required']
    },
    wedding: {
        type: Schema.Types.ObjectId,
        ref: 'Wedding',
        required: [true, 'Wedding is required']
    },
    status: {
        type: String,
        enum: {
            values: ['Pending', 'In Progress', 'Completed'],
            message: 'Status must be one of: Pending, In Progress, Completed'
        },
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Indexes
taskSchema.index({ assignedTo: 1, wedding: 1 });
taskSchema.index({ dueDate: 1 });
taskSchema.index({ status: 1 });

// Pre-save middleware to ensure dueDate is in the future
taskSchema.pre('save', function(next) {
    if (this.isModified('dueDate') && this.dueDate <= new Date()) {
        next(new Error('Due date must be in the future'));
    }
    next();
});

export default mongoose.model('Task', taskSchema);