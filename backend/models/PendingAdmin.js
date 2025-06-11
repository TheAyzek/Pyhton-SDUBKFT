const mongoose = require('mongoose');

const PendingAdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hash'li olacak
  email: { type: String },
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  approvalToken: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('PendingAdmin', PendingAdminSchema); 