const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB bağlantısı başarılı'))
  .catch((err) => console.error('MongoDB bağlantı hatası:', err));

// Routes
const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);

const formRouter = require('./routes/form');
app.use('/api/form', formRouter);

const musicRouter = require('./routes/music');
app.use('/api/music', musicRouter);

// Test endpoint
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Backend çalışıyor!' });
});

// Vercel için export
module.exports = app; 