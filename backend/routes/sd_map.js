var express = require('express');
var router = express.Router();
var SdMap = require('../models/sd_map');

router.get('/', (req, res, next) => {
  const date = req.query.date
  SdMap.aggregate([
    {$unwind: "$features"},
    {
        $lookup: {
           from: "pm25sds",
           localField: "features.properties.SIDO_CD",
           foreignField: "SD_CD",
           as: "pm25value"
        }
    },
    {
        $lookup: {
           from: "overalldeathsds",
           localField: "features.properties.SIDO_CD",
           foreignField: "SD_CD",
           as: "overalldeathvalue"
        }
    },
    {
        $lookup: {
           from: "male_overalldeathsds",
           localField: "features.properties.SIDO_CD",
           foreignField: "SD_CD",
           as: "male_overalldeathvalue"
        }
    },
    {
        $lookup: {
           from: "female_overalldeathsds",
           localField: "features.properties.SIDO_CD",
           foreignField: "SD_CD",
           as: "female_overalldeathvalue"
        }
    },
    {
      $lookup: {
         from: "cerebral_blood_vessel_overalldeathsds",
         localField: "features.properties.SIDO_CD",
         foreignField: "SD_CD",
         as: "cerebral_blood_vessel_overalldeathvalue"
      }
    },
    {
        $lookup: {
           from: "cerebral_breath_overalldeathsds",
           localField: "features.properties.SIDO_CD",
           foreignField: "SD_CD",
           as: "cerebral_breath_overalldeathvalue"
        }
    },
    {
        $lookup: {
           from: "index_total_PM10sds",
           localField: "features.properties.SIDO_CD",
           foreignField: "SD_CD",
           as: "index_total_PM10"
        }
    },
    {
        $lookup: {
           from: "jeju_overalldeathsds",
           localField: "features.properties.SIDO_CD",
           foreignField: "SD_CD",
           as: "jeju_overalldeath"
        }
    },
    {
        $group: {
            _id: {SD_CD: "$features.properties.SIDO_CD"},
            SD_CD: {$first: "$features.properties.SIDO_CD"},
            type: {$first: "$features.type"},
            pm25value: {$first: "$pm25value"},
            overalldeathvalue: {$first: "$overalldeathvalue"},
            features: {$first: "$features"},
            male_overalldeathvalue: {$first: "$male_overalldeathvalue"},
            female_overalldeathvalue: {$first: "$female_overalldeathvalue"},
            cerebral_blood_vessel_overalldeathvalue: {$first: "$cerebral_blood_vessel_overalldeathvalue"},
            cerebral_breath_overalldeathvalue: {$first: "$cerebral_breath_overalldeathvalue"},
            index_total_PM10: {$first: "$index_total_PM10"},
            jeju_overalldeath: {$first: "$jeju_overalldeath"}
        }
    },
    {$unwind: "$pm25value"},
    {$unwind: "$overalldeathvalue"},
    {$unwind: "$male_overalldeathvalue"},
    {$unwind: "$female_overalldeathvalue"},
    {$unwind: "$cerebral_blood_vessel_overalldeathvalue"},
    {$unwind: "$cerebral_breath_overalldeathvalue"},
    {$unwind: "$index_total_PM10"},
    {$unwind: "$jeju_overalldeath"},
    {$project: 
      {
        type: "Feature",
        geometry: "$features.geometry",
        properties: {
          SIDO_NM: "$features.properties.SIDO_NM",
          SIDO_CD: "$features.properties.SIDO_CD",
          PM2_5: "$pm25value."+date,
          OverallDeath: "$overalldeathvalue."+date,
          OverallDeathBeta: "$overalldeathvalue.beta",
          MaleOverallDeath: "$male_overalldeathvalue." + date,
          FemaleOverallDeath: "$female_overalldeathvalue." + date,
          CerebralBloodVesselOverallDeath: "$cerebral_blood_vessel_overalldeathvalue." + date,
          CerebralBreathOverallDeath: "$cerebral_breath_overalldeathvalue." + date,
          Index_total_PM10: "$index_total_PM10." + date,
          Jeju_overalldeath: "$jeju_overalldeath." + date
        },
        id: "$features.properties.SIDO_CD",
        _id: 0
      }
    }
  ]).exec((err,result) => {
    if (err) return next(err);
    res.json({
      success: true,
      result: result
    });
  })
});

module.exports = router;