const mongoose = require('mongoose');

const FormFieldSchema = new mongoose.Schema({
  label: { type: String, required: true },
  type: { type: String, enum: ['text', 'select'], default: 'text' },
  options: [String], // select için
  maxResponses: [{ type: Number, default: 0 }], // Her seçenek için maksimum yanıt sayısı
  required: { type: Boolean, default: false }, // Zorunlu alan
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('FormField', FormFieldSchema); 