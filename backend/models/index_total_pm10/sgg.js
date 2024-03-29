var mongoose = require('mongoose');

var indexTotalPm10SggsSchema = new mongoose.Schema({
  "SD_NM": String,
  "SGG_NM": String,
  "SD_CD": String,
  "SGG_CD": String,
  "2015_1": Number,
  "2015_2": Number,
  "2015_3": Number,
  "2015_4": Number,
  "2015_5": Number,
  "2015_6": Number,
  "2015_7": Number,
  "2015_8": Number,
  "2015_9": Number,
  "2015_10": Number,
  "2015_11": Number,
  "2015_12": Number,
  "created_at": { type:Date, default:Date.now }
});

module.exports = mongoose.model('IndexTotalPm10Sggs', indexTotalPm10SggsSchema,'index_total_PM10sggs');