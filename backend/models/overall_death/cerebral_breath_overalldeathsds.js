var mongoose = require('mongoose');

var CerebralBreathOverallDeathSdsSchema = new mongoose.Schema({
  "SD_NM": String,
  "SGG_NM": String,
  "SGG_CD": String,
  "SD_CD": String,
  "beta": Number,
  "beta_L": Number,
  "beta_U": Number,
  "2012_1": Number,
  "2012_2": Number,
  "2012_3": Number,
  "2012_4": Number,
  "2012_5": Number,
  "2012_6": Number,
  "2012_7": Number,
  "2012_8": Number,
  "2012_9": Number,
  "2012_10": Number,
  "2012_11": Number,
  "2012_12": Number,
  "2013_1": Number,
  "2013_2": Number,
  "2013_3": Number,
  "2013_4": Number,
  "2013_5": Number,
  "2013_6": Number,
  "2013_7": Number,
  "2013_8": Number,
  "2013_9": Number,
  "2013_10": Number,
  "2013_11": Number,
  "2013_12": Number,
  "2014_1": Number,
  "2014_2": Number,
  "2014_3": Number,
  "2014_4": Number,
  "2014_5": Number,
  "2014_6": Number,
  "2014_7": Number,
  "2014_8": Number,
  "2014_9": Number,
  "2014_10": Number,
  "2014_11": Number,
  "2014_12": Number,
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
  "1mth_avg": Number,
  "2mth_avg": Number,
  "3mth_avg": Number,
  "4mth_avg": Number,
  "5mth_avg": Number,
  "6mth_avg": Number,
  "7mth_avg": Number,
  "8mth_avg": Number,
  "9mth_avg": Number,
  "10mth_avg": Number,
  "11mth_avg": Number,
  "12mth_avg": Number,
  "created_at": { type:Date, default:Date.now }
});

module.exports = mongoose.model('CerebralBreathOverallDeathSds', CerebralBreathOverallDeathSdsSchema, 'cerebral_breath_overalldeathsds');