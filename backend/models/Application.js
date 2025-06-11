const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  answers: [{
    field: { type: mongoose.Schema.Types.ObjectId, ref: 'FormField' },
    value: String,
    selectedOption: Number,
  }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Application', ApplicationSchema); 