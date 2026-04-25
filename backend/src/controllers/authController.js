const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword });
    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);

    return res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/auth/me
exports.getMe = async (req, res) => {
  return res.json({ success: true, user: req.user });
};

// PUT /api/auth/update
exports.updateProfile = async (req, res) => {
  try {
    const { name, avatar } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, avatar },
      { new: true }
    ).select('-password');

    return res.json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/auth/password
exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const user = await User.findById(req.user._id);
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    return res.json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};