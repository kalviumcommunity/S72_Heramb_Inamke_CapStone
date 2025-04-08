import express from 'express';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} from '../controllers/taskController.js';
import { protect } from '../middleware/auth.js';
import { validateTask, validate } from '../middleware/validation.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// Get all tasks for the current user
router.get('/', getTasks);

// Get single task
router.get('/:id', getTask);

// Create task
router.post('/', validateTask, validate, createTask);

// Update task
router.put('/:id', validateTask, validate, updateTask);

// Delete task
router.delete('/:id', deleteTask);

export default router;