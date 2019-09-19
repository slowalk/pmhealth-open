var mongoose = require('mongoose');

var SggmapsSggBySdSchema = new mongoose.Schema({
  "SD_CD" : String,
  "base_year" : String,
  "type" : String,
  "crs" : JSON,
  "features" : Array,
  created_at: { type:Date, default:Date.now }
});

module.exports = mongoose.model('SggmapsSggBySd', SggmapsSggBySdSchema, 'sggmaps_sgg_sd');