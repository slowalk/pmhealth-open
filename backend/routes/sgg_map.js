const express = require('express');
const router = express.Router();
// const SggMap = require('../models/sgg_map');
const SggMapGroup = require('../models/sgg_map_group');
// const SggmapsDividedBySgg = require('../models/sggmaps_divided_by_sgg');
const SggMap = require('../models/sgg_map');

router.get('/allInOne', (req, res, next) => {
  const center = req.query.center;
  const distance = req.query.distance;
  const date = req.query.date;

  // SggmapsDividedBySgg.aggregate([
  SggMap.aggregate([
    { 
      "$geoNear": {
        "distanceField": "dist",
        "near": {type: "Point", coordinates: [parseFloat(center[0]), parseFloat(center[1])] },
        "spherical": true,
        "maxDistance": parseFloat(distance)
      }
    },
    {
        $lookup: {
           from: "pm25sggs",
           localField: "properties.sigungu_cd",
           foreignField: "SGG_CD",
           as: "pm25value"
        }
    },
    {
        $lookup: {
           from: "overalldeathsggs",
           localField: "properties.sigungu_cd",
           foreignField: "SGG_CD",
           as: "overalldeathvalue"
        }
    },
    {
        $lookup: {
           from: "male_overalldeathsggs",
           localField: "properties.sigungu_cd",
           foreignField: "SGG_CD",
           as: "male_overalldeathvalue"
        }
    },
    {
        $lookup: {
           from: "female_overalldeathsggs",
           localField: "properties.sigungu_cd",
           foreignField: "SGG_CD",
           as: "female_overalldeathvalue"
        }
    },


    {
      $lookup: {
         from: "cerebral_blood_vessel_overalldeathsggs",
         localField: "properties.sigungu_cd",
         foreignField: "SGG_CD",
         as: "cerebral_blood_vessel_overalldeathvalue"
      }
    },
    {
        $lookup: {
           from: "cerebral_breath_overalldeathsggs",
           localField: "properties.sigungu_cd",
           foreignField: "SGG_CD",
           as: "cerebral_breath_overalldeathvalue"
        }
    },
    {
        $lookup: {
           from: "index_total_PM10sggs",
           localField: "properties.sigungu_cd",
           foreignField: "SGG_CD",
           as: "index_total_PM10"
        }
    },
    {
        $lookup: {
           from: "jeju_overalldeathsggs",
           localField: "properties.sigungu_cd",
           foreignField: "SGG_CD",
           as: "jeju_overalldeath"
        }
    },

    {
        $group: {
            _id: {SD_CD: "$properties.sigungu_cd"},
            pm25value: {$first: "$pm25value"},
            overalldeathvalue: {$first: "$overalldeathvalue"},
            properties: {$first: "$properties"},
            geometry: {$first: "$geometry"},
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
        geometry: "$geometry",
        properties: {
          sigungu_nm: "$properties.sigungu_nm",
          sigungu_cd: "$properties.sigungu_cd",
          PM2_5: "$pm25value." + date,
          OverallDeath: "$overalldeathvalue." + date,
          OverallDeathBeta: "$overalldeathvalue.beta",
          MaleOverallDeath: "$male_overalldeathvalue." + date,
          FemaleOverallDeath: "$female_overalldeathvalue." + date,
          CerebralBloodVesselOverallDeath: "$cerebral_blood_vessel_overalldeathvalue." + date,
          CerebralBreathOverallDeath: "$cerebral_breath_overalldeathvalue." + date,
          Index_total_PM10: "$index_total_PM10." + date,
          Jeju_overalldeath: "$jeju_overalldeath." + date
        }
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

router.get('/', (req, res, next) => {
  const center = req.query.center;
  const distance = req.query.distance;

  SggMap.find({
    "geometry": {
        "$near": {
            "$geometry": {type: "Point", coordinates: [center[0], center[1]] },
            "spherical": true,
            "$maxDistance": distance
        }
    }
  }, ["type", "geometry", "properties"], (err, sggs) => {
    if (err) return console.log(err);
    const geojson = {
      "type": "FeatureCollection",
      "crs" : {
          "type" : "name",
          "properties" : {
              "name" : "urn:ogc:def:crs:OGC:1.3:CRS84"
          }
      }, 
      "features": sggs
    }
    res.json({
      success: true,
      result: geojson
      // result: sggs
    });
  });
});

// zoom 5일때
router.get('/group', (req, res, next) => {
  const center = req.query.center;
  const distance = req.query.distance;
  const date = req.query.date;

  SggMapGroup.aggregate([
    { 
      "$geoNear": {
        "distanceField": "dist",
        "near": {type: "Point", coordinates: [parseFloat(center[0]), parseFloat(center[1])] },
        "maxDistance": parseFloat(distance),
        "spherical": true
      }
    },
    {
      $lookup: {
        from: "pm25sggs",
        localField: "properties.sigungu_cd",
        foreignField: "SGG_CD",
        as: "pm25value"
      }
    },
    {
      $lookup: {
        from: "overalldeathsggs",
        localField: "properties.sigungu_cd",
        foreignField: "SGG_CD",
        as: "overalldeathvalue"
      }
    },
    {
        $lookup: {
           from: "male_overalldeathsggs",
           localField: "properties.sigungu_cd",
           foreignField: "SGG_CD",
           as: "male_overalldeathvalue"
        }
    },
    {
        $lookup: {
           from: "female_overalldeathsggs",
           localField: "properties.sigungu_cd",
           foreignField: "SGG_CD",
           as: "female_overalldeathvalue"
        }
    },


    {
      $lookup: {
         from: "cerebral_blood_vessel_overalldeathsggs",
         localField: "properties.sigungu_cd",
         foreignField: "SGG_CD",
         as: "cerebral_blood_vessel_overalldeathvalue"
      }
    },
    {
        $lookup: {
           from: "cerebral_breath_overalldeathsggs",
           localField: "properties.sigungu_cd",
           foreignField: "SGG_CD",
           as: "cerebral_breath_overalldeathvalue"
        }
    },
    {
        $lookup: {
           from: "index_total_PM10sggs",
           localField: "properties.sigungu_cd",
           foreignField: "SGG_CD",
           as: "index_total_PM10"
        }
    },

    {$unwind: "$pm25value"},
    {$unwind: "$overalldeathvalue"},
    {$unwind: "$male_overalldeathvalue"},
    {$unwind: "$female_overalldeathvalue"},
    {$unwind: "$cerebral_blood_vessel_overalldeathvalue"},
    {$unwind: "$cerebral_breath_overalldeathvalue"},
    {$unwind: "$index_total_PM10"},
    {$project: 
      {
        type: "Feature",
        geometry: "$geometry",
        properties: {
          sigungu_nm: "$properties.sigungu_nm",
          sigungu_cd: "$properties.sigungu_cd",
          group: "$properties.group",
          PM2_5: "$pm25value." + date,
          OverallDeath: "$overalldeathvalue." + date,
          OverallDeathBeta: "$overalldeathvalue.beta",
          MaleOverallDeath: "$male_overalldeathvalue." + date,
          FemaleOverallDeath: "$female_overalldeathvalue." + date,
          CerebralBloodVesselOverallDeath: "$cerebral_blood_vessel_overalldeathvalue." + date,
          CerebralBreathOverallDeath: "$cerebral_breath_overalldeathvalue." + date,
          Index_total_PM10: "$index_total_PM10." + date
        }
      }
    }
  ]).exec((err, results) => {
    if (err) return next(err);
    res.json({
      success: true,
      results: results
    });
  })
});


module.exports = router;