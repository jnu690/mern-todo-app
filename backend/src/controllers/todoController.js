const Todo = require('../models/Todo');

// GET /api/todos
exports.getAll = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, data: todos });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/todos
exports.create = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || title.trim() === '') {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }
    const todo = await Todo.create({ title, description, user: req.user._id });
    res.status(201).json({ success: true, data: todo });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/todos/:id
exports.update = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || title.trim() === '') {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, description },
      { new: true, runValidators: true }
    );
    if (!todo) return res.status(404).json({ success: false, message: 'Todo not found' });
    res.json({ success: true, data: todo });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PATCH /api/todos/:id/done
exports.toggleDone = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });
    if (!todo) return res.status(404).json({ success: false, message: 'Todo not found' });
    todo.done = !todo.done;
    await todo.save();
    res.json({ success: true, data: todo });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/todos/:id
exports.remove = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!todo) return res.status(404).json({ success: false, message: 'Todo not found' });
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};