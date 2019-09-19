var mongoose = require('mongoose');

var SggMapGroupsSchema = new mongoose.Schema({
  "year" : String,
  "abstract_point" : String,
  "type" : String,
  "geometry" : JSON,
  "properties": JSON,
  created_at: { type:Date, default:Date.now }
});

module.exports = mongoose.model('SggMapGroups', SggMapGroupsSchema, 'sggmap_groups');