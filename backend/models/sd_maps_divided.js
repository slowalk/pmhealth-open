var mongoose = require('mongoose');

var sdMapsDividedSchema = new mongoose.Schema({
  type: String,
  properties: JSON,
  geometry: JSON
});

module.exports = mongoose.model('SdMapsDivided', sdMapsDividedSchema, 'sdmaps_divided');