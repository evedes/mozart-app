const mongoose = require('mongoose');

const memoryStatzSchema = new mongoose.Schema({
  total: Number,
  free: Number,
  used: Number,
  active: Number,
  available: Number,
  date: Date,
});

module.exports = mongoose.model('memoryStatz', memoryStatzSchema);
