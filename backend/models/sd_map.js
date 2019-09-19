var mongoose = require('mongoose');

var sdMapSchema = new mongoose.Schema({
  type: String,
  features: Array,
  crs: JSON,
  created_at: { type:Date, default:Date.now }
});

module.exports = mongoose.model('SdMap', sdMapSchema);