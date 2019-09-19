const express = require('express');
const router = express.Router();
const FemaleOverallDeathSgg = require('../../models/overall_death/sgg_female');
const MaleOverallDeathSgg = require('../../models/overall_death/sgg_male');
const FemaleOverallDeathSd = require('../../models/overall_death/sd_female');
const MaleOverallDeathSd = require('../../models/overall_death/sd_male');

router.get('/sd', (req, res, next) => {
  const date = req.query.date;
  const SGG_CD = req.query.SGG_CD;
  FemaleOverallDeathSd.findOne({SGG_CD}, [`${date}`, "SD_NM", "SD_CD", "SGG_NM", "SGG_CD"], (ferr, f) => {
    if (ferr) return next(ferr);
    MaleOverallDeathSd.findOne({SGG_CD}, [`${date}`, "SD_NM", "SD_CD", "SGG_NM", "SGG_CD"], (merr, m) => {
      if (merr) return next(merr);
      res.json({
        success: true,
        result: {
          male: m,
          female: f
        }
      });
    })
  })
});

router.get('/sgg', (req, res, next) => {
  const date = req.query.date;
  const SGG_CD = req.query.SGG_CD;
  FemaleOverallDeathSgg.findOne({SGG_CD}, [`${date}`, "SD_NM", "SD_CD", "SGG_NM", "SGG_CD"], (ferr, f) => {
    if (ferr) return next(ferr);
    MaleOverallDeathSgg.findOne({SGG_CD}, [`${date}`, "SD_NM", "SD_CD", "SGG_NM", "SGG_CD"], (merr, m) => {
      if (merr) return next(merr);
      res.json({
        success: true,
        result: {
          male: m,
          female: f
        }
      });
    })
  })
});

module.exports = router;