const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title too long'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description too long'],
      default: '',
    },
    done: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Todo', todoSchema);