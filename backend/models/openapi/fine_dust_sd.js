var mongoose = require('mongoose');

var FineDustSdSchema = new mongoose.Schema({
  "SD_ENM": String,
  "SD_NM": String,
  "SD_CD": String,
  "pm2_5": Number,
  "pm10": Number,
  "no2": Number,
  "dataTime": String,
  "created_at": { type:Date, default:Date.now }
});

module.exports = mongoose.model('FineDustSd', FineDustSdSchema,'fine_dust_sd');