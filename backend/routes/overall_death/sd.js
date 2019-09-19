const express = require('express');
const router = express.Router();
const OverallDeathSd = require('../../models/overall_death/sd');
const Stats = require('../../models/stats');
const JejuSd = require('../../models/overall_death/jeju_sd');

router.get('/', (req, res, next) => {
  const date = req.query.date;
  Stats.find({district: "sd", type: "overall_death"}, [`${date}`, "stats", "district", "type"], (err, stats) => {
    if (err) return next(err);
    res.json({
      success: true,
      stats: {
        min: stats.find(s=> s.stats == "min"),
        max: stats.find(s=> s.stats == "max")
      },
    });
  })
});

router.get('/change', (req, res, next) => {
  const date = req.query.date;
  OverallDeathSd.find({}, [`${date}`, "SD_NM", "SD_CD", "SGG_CD"], (err, result) => {
    if (err) return next(err);
    Stats.find({district: "sd", type: "overall_death"}, [`${date}`, "stats", "district", "type"], (err, stats) => {
      if (err) return next(err);
      res.json({
        success: true,
        result: result,
        stats: {
          min: stats.find(s=> s.stats == "min"),
          max: stats.find(s=> s.stats == "max")
        },
      });
    })
  });
});

router.get('/jeju', (req, res, next) => {
  const query = req.query;
  const date = req.query.date;
  JejuSd.findOne({SGG_CD: query.SGG_CD},(err, result) => {
    if (err) return next(err);
    res.json({
      success: true,
      result: result
    });
  })
});

router.get('/raw', (req, res, next) => {
  const date = req.query.date,
        sort = req.query.sort;
  OverallDeathSd.find({}).sort(sort).select(`${date} SD_CD SD_NM SGG_NM SGG_CD`).exec((err, results) => {
    if (err) return next(err);
    if (results.length == 0) return console.log("results 0");
    
    res.json({
      success: true,
      results
    });
  });
});

module.exports = router;