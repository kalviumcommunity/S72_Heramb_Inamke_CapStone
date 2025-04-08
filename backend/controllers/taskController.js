import Task from '../models/Task.js';
import logger from '../config/logger.js';

// Read: Get all tasks from the database
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user._id })
      .populate('wedding', 'date venue')
      .sort({ dueDate: 1 });
    res.json({
      success: true,
      count: tasks.length,
      tasks
    });
  } catch (error) {
    logger.error(`Get tasks error: ${error.message}`);
    res.status(500).json({ 
      success: false,
      error: 'Error fetching tasks',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Write: Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, wedding } = req.body;
    const newTask = new Task({
      title,
      description,
      dueDate,
      assignedTo: req.user._id,
      wedding,
      status: req.body.status || 'Pending'
    });

    const savedTask = await newTask.save();
    await savedTask.populate('wedding', 'date venue');
    
    logger.info(`New task created by user ${req.user._id}`);
    
    res.status(201).json({
      success: true,
      task: savedTask
    });
  } catch (error) {
    logger.error(`Create task error: ${error.message}`);
    res.status(500).json({ 
      success: false,
      error: 'Error creating task',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Read: Get a single task
export const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({ 
      _id: req.params.id, 
      assignedTo: req.user._id 
    }).populate('wedding', 'date venue');

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }

    res.json({
      success: true,
      task
    });
  } catch (error) {
    logger.error(`Get task error: ${error.message}`);
    res.status(500).json({ 
      success: false,
      error: 'Error fetching task',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Update: Modify an existing task
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, assignedTo: req.user._id },
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate('wedding', 'date venue');

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }

    logger.info(`Task ${req.params.id} updated by user ${req.user._id}`);

    res.json({
      success: true,
      task
    });
  } catch (error) {
    logger.error(`Update task error: ${error.message}`);
    res.status(500).json({ 
      success: false,
      error: 'Error updating task',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Delete task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      assignedTo: req.user._id
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }

    logger.info(`Task ${req.params.id} deleted by user ${req.user._id}`);

    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    logger.error(`Delete task error: ${error.message}`);
    res.status(500).json({ 
      success: false,
      error: 'Error deleting task',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};