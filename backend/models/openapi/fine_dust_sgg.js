var mongoose = require('mongoose');

var FineDustSggSchema = new mongoose.Schema({
  "SD_ENM": String,
  "SD_NM": String,
  "short_SD_NM": String,
  "SGG_NM": String,
  "SD_CD": String,
  "SGG_CD": String,
  "pm2_5": Number,
  "pm10": Number,
  "no2": Number,
  "dataTime": String,
  "created_at": { type:Date, default:Date.now }
});

module.exports = mongoose.model('FineDustSgg', FineDustSggSchema,'fine_dust_sgg');