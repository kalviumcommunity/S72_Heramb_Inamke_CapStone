import Task from '../models/Task.js';

// Read: Get all tasks from the database
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user._id })
      .populate('wedding', 'date venue')
      .sort({ dueDate: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error: error.message });
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
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error: error.message });
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
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error fetching task", error: error.message });
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
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error: error.message });
  }
};