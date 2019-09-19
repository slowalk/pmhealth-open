var mongoose = require('mongoose');

var districtsSchema = new mongoose.Schema({
  SD_NM: String,
  SD_CD: String,
  SGG_NM: String,
  SGG_CD: String,
});

module.exports = mongoose.model('Districts', districtsSchema);