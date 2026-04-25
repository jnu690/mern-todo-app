require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('❌ DB connection failed:', err.message);
    process.exit(1);
  });