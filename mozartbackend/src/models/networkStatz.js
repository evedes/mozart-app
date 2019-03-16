
const mongoose = require('mongoose');

const networkStatzSchema = new mongoose.Schema({
  "iface": String,
  "operstate": String,
  "rx_bytes": Number,
  "rx_dropped": Number,
  "rx_errors": Number,
  "tx_bytes": Number,
  "tx_dropped": Number,
  "tx_errors": Number,
  "rx_sec": Number,
  "tx_sec": Number,
  "ms": Number,
  "date": Date,
});

module.exports = mongoose.model('NetworkStatz', networkStatzSchema);