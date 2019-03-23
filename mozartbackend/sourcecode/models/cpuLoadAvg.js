const mongoose = require('mongoose');

const cpuLoadAvgSchema = new mongoose.Schema({
  oneMin: Number,
  fiveMin: Number,
  fifteenMin: Number,
  date: Date,
});

module.exports = mongoose.model('cpuLoadAvg', cpuLoadAvgSchema);
