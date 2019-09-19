const express = require('express');
const router = express.Router();
const OverallDeathSgg = require('../../models/overall_death/sgg');
const Stats = require('../../models/stats');
const JejuSgg = require('../../models/overall_death/jeju_sgg');

router.get('/', (req, res, next) => {
  const date = req.query.date;
  Stats.find({district: "sgg", type: "overall_death"}, [`${date}`, "stats", "district", "type"], (err, stats) => {
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
  OverallDeathSgg.find({}, [`${date}`, "SD_NM", "SD_CD", "SGG_NM", "SGG_CD"], (err, result) => {
    if (err) return next(err);
    Stats.find({district: "sgg", type: "overall_death"}, [`${date}`, "stats", "district", "type"], (err, stats) => {
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

router.get('/jeju', (req, res, next) => {
  const query = req.query;
  const date = req.query.date;
  JejuSgg.findOne({SGG_CD: query.SGG_CD}, [`${date}`, "stats", "district", "type"], (err, result) => {
    if (err) return next(err);
    res.json({
      success: true,
      result
    });
  })
});

router.get('/raw', (req, res, next) => {
  const SD_CD = req.query.SD_CD,
        date = req.query.date,
        sort = req.query.sort;
  OverallDeathSgg.find({SD_CD}).sort(sort).select(`${date} SD_CD SD_NM SGG_NM SGG_CD`).exec((err, results) => {
    if (err) return next(err);
    if (results.length == 0) return console.log("results 0");
    
    res.json({
      success: true,
      results
    });
  });
});

module.exports = router;