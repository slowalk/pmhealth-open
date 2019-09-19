const express = require('express');
const router = express.Router();
const Pm2_5Sgg = require('../../models/pm2_5/sgg');
const Pm2_5SggGroup = require('../../models/pm2_5/group');
const Stats = require('../../models/stats');

router.get('/', (req, res, next) => {
  const date = req.query.date;
    Stats.find({district: "sgg", type: "pm2_5"}, [`${date}`, "stats", "district", "type"], (err, stats) => {
      if (err) return next(err);
      res.json({
        success: true,
        stats: {
          min: stats.find(s=> s.stats == "min"),
          max: stats.find(s=> s.stats == "max")
        },
      });
    });
});


router.get('/change', (req, res, next) => {
  const date = req.query.date;
  Pm2_5Sgg.find({}, [`${date}`, "SD_NM", "SD_CD", "SGG_NM", "SGG_CD"],(err, result) => {
    if (err) return next(err);
    Stats.find({district: "sgg", type: "pm2_5"}, [`${date}`, "stats", "district", "type"], (err, stats) => {
      if (err) return next(err);
      res.json({
        success: true,
        result: result,
        stats: {
          min: stats.find(s=> s.stats == "min"),
          max: stats.find(s=> s.stats == "max")
        },
      });
    });
  });
});

router.get('/group', (req, res, next) => {
  const date = req.query.date;
  Pm2_5SggGroup.find({}, [`${date}`, "SD_NM", "SD_CD", "SGG_NM", "SGG_CD"], (err, result) => {
    if (err) return next(err);
    Stats.find({district: "sgg", type: "pm2_5"}, [`${date}`, "stats", "district", "type"], (err, stats) => {
      if (err) return next(err);
      res.json({
        success: true,
        result: result,
        stats: {
          min: stats.find(s=> s.stats == "min"),
          max: stats.find(s=> s.stats == "max")
        },
      });
    });
  });
});

router.get('/monthly', (req, res, next) => {
  const query = req.query;
  Pm2_5Sgg.findOne(query, {'_id': 0, "1mth_avg": 1,"2mth_avg": 1,"3mth_avg": 1,"4mth_avg": 1,"5mth_avg": 1,"6mth_avg": 1,"7mth_avg": 1,"8mth_avg": 1,"9mth_avg": 1,"10mth_avg": 1,"11mth_avg": 1,"12mth_avg": 1}, (err, result) => {
    if (err) return next(err);
    res.json({
      success: true,
      result
    });
  });
});


module.exports = router;