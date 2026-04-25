const express = require('express');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Routes
app.use('/api/auth',  authRoutes);
app.use('/api/todos', todoRoutes);

module.exports = app;