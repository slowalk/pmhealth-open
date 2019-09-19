const express = require('express');
const router = express.Router();
const OverallDeathSgg = require('../models/overall_death/sgg');
const OverallDeathSd = require('../models/overall_death/sd');
const Pm2_5Sgg = require('../models/pm2_5/sgg');
const Pm2_5Sd = require('../models/pm2_5/sd');

router.get('/sd', (req, res, next) => {
  const SGG_CD = req.query.SGG_CD;
  const needs = ["1mth_avg","2mth_avg","3mth_avg","4mth_avg","5mth_avg","6mth_avg","7mth_avg","8mth_avg","9mth_avg","10mth_avg","11mth_avg","12mth_avg"]
  Pm2_5Sd.findOne({SGG_CD}, needs, (pmerr, pm25) => {
    if (pmerr) return next(err);
    OverallDeathSd.findOne({SGG_CD}, needs, (err, od) => {
      if (err) return next(err);
      const pm25Result = needs.map(n => {return pm25[n]})
      const odResult = needs.map(n => {return od[n]})
      res.json({
        success: true,
        result: {
          pm25: pm25Result,
          od: odResult
        }
      });
    });
  });
});

router.get('/sgg', (req, res, next) => {
  const SGG_CD = req.query.SGG_CD;
  const needs = ["1mth_avg","2mth_avg","3mth_avg","4mth_avg","5mth_avg","6mth_avg","7mth_avg","8mth_avg","9mth_avg","10mth_avg","11mth_avg","12mth_avg"]
  Pm2_5Sgg.findOne({SGG_CD}, needs, (pmerr, pm25) => {
    if (pmerr) return next(err);
    OverallDeathSgg.findOne({SGG_CD}, needs, (err, od) => {
      if (err) return next(err);
      const pm25Result = needs.map(n => {return pm25[n]})
      const odResult = needs.map(n => {return od[n]})
      res.json({
        success: true,
        result: {
          pm25: pm25Result,
          od: odResult
        }
      });
    });
  });
});

module.exports = router;