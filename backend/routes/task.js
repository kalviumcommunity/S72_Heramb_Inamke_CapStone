import express from 'express';
import Task from '../models/Task.js';
import auth from '../middleware/auth.js';

const router = express.Router();



// Create a new task
router.post(
  '/',
  auth,
  [
    body('title').isString().notEmpty().withMessage('Title is required and must be a string'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('dueDate').optional().isISO8601().toDate().withMessage('Due date must be a valid date'),
    body('completed').optional().isBoolean().withMessage('Completed must be a boolean'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    try {
      const task = new Task({
        ...req.body,
        userId: req.user._id,
      });
      await task.save();
      res.status(201).json(task);
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);



// Get all tasks
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// endpoint to retrieve a specific task by ID as requested.
router.get('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Update a task by ID
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });

    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
