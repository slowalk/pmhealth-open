const express = require('express');
const router = express.Router();
const IndexTotalPm10Sggs = require('../../models/index_total_pm10/sgg');
const IndexTotalPm10Sds = require('../../models/index_total_pm10/sd');

const SD_NM_TRANS = [
  {long: "서울특별시", short: "서울"},
  {long: "부산광역시", short: "부산"},
  {long: "대구광역시", short: "대구"},
  {long: "인천광역시", short: "인천"},
  {long: "광주광역시", short: "광주"},
  {long: "대전광역시", short: "대전"},
  {long: "울산광역시", short: "울산"},
  {long: "세종특별자치시", short: "세종"},
  {long: "경기도", short: "경기"},
  {long: "강원도", short: "강원"},
  {long: "충청북도", short: "충북"},
  {long: "충청남도", short: "충남"},
  {long: "전라북도", short: "전북"},
  {long: "전라남도", short: "전남"},
  {long: "경상북도", short: "경북"},
  {long: "경상남도", short: "경남"},
  {long: "제주특별자치도", short: "제주"},
]

router.get('/sd', (req, res, next) => {
  const date = req.query.date,
        sort = req.query.sort;
  IndexTotalPm10Sds.find({}).sort(sort).select(`${date} SD_CD SD_NM SGG_NM SGG_CD`).exec((err, results) => {
    if (err) return next(err);
    if (results.length == 0) return console.log("results 0");
    
    res.json({
      success: true,
      results,
      label: results.map(r=>{return SD_NM_TRANS.find(snt => r.SGG_NM == snt.long).short}),
      // value: results.map(r=>r[date])
    });
  });
});

router.get('/sgg', (req, res, next) => {
  const SD_CD = req.query.SD_CD,
        date = req.query.date,
        sort = req.query.sort;
  // IndexTotalPm10Sggs.find({SD_CD}, sort, [`${date}`, "SD_CD", "SD_NM", "SGG_NM", "SGG_CD"], (err, results) => {
  IndexTotalPm10Sggs.find({SD_CD}).sort(sort).select(`${date} SD_CD SD_NM SGG_NM SGG_CD`).exec((err, results) => {
    if (err) return next(err);
    if (results.length == 0) return console.log("results 0");
    res.json({
      success: true,
      results,
      label: results.map(r=>r.SGG_NM),
      // value: results.map(r=>r[date]),
    });
  });
});

module.exports = router;