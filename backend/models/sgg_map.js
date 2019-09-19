var mongoose = require('mongoose');

var SggMap = new mongoose.Schema({
  "type" : String,
  "properties" : JSON,
  "geometry" : JSON
});

module.exports = mongoose.model('SggMap', SggMap, 'sggmaps');