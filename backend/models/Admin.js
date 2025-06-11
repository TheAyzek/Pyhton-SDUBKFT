const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: false }, // artık opsiyonel
  noPassword: { type: Boolean, default: false } // şifresiz giriş için flag
});

module.exports = mongoose.model('Admin', AdminSchema); 