  import express from 'express';
  import { body, validationResult } from 'express-validator';
  import { getTasks, createTask, getTask, updateTask} from '../controllers/taskController.js';
  import auth from '../middleware/auth.js';

  const router = express.Router();

  // Get all tasks
  router.get('/', auth, getTasks);

  // Get a specific task
  router.get('/:id', auth, getTask);

  // Create a new task
  router.post('/', auth, [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('dueDate').isISO8601().withMessage('Valid due date is required'),
    body('wedding').notEmpty().withMessage('Wedding ID is required')
  ], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }, createTask);

  // Update a task
  router.put('/:id', auth, [
    body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
    body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),
    body('dueDate').optional().isISO8601().withMessage('Valid due date is required'),
    body('status').optional().isIn(['Pending', 'In Progress', 'Completed']).withMessage('Invalid status')
  ], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }, updateTask);


  export default router;