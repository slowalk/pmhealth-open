const express = require('express');
const router = express.Router();
const Districts = require('../models/districts');
var SdMapsDivided = require('../models/sd_maps_divided');
// var Sggmap = require('../models/sggmaps_divided_by_sgg');
var Sggmap = require('../models/sgg_map');

router.get('/certain', (req, res, next) => {
  const SD_NM = req.query.SD_NM;
  const SGG_NM = req.query.SGG_NM;
  const date = req.query.date;
  
  Districts.aggregate([
    { 
      $match: {
        "SD_NM": SD_NM, 
        "SGG_NM": SGG_NM
      }
    },
    {
      $lookup: {
        from: "pm25sggs",
        localField: "SGG_CD",
        foreignField: "SGG_CD",
        as: "pm25value"
      }
    },
    {
      $lookup: {
          from: "overalldeathsggs",
          localField: "SGG_CD",
          foreignField: "SGG_CD",
          as: "overalldeathvalue"
      }
    },

    {
      $lookup: {
         from: "male_overalldeathsggs",
         localField: "SGG_CD",
         foreignField: "SGG_CD",
         as: "male_overalldeathvalue"
      }
    },
    {
        $lookup: {
          from: "female_overalldeathsggs",
          localField: "SGG_CD",
          foreignField: "SGG_CD",
          as: "female_overalldeathvalue"
        }
    },
    {
      $lookup: {
        from: "cerebral_blood_vessel_overalldeathsggs",
        localField: "SGG_CD",
        foreignField: "SGG_CD",
        as: "cerebral_blood_vessel_overalldeathvalue"
      }
    },
    {
        $lookup: {
          from: "cerebral_breath_overalldeathsggs",
          localField: "SGG_CD",
          foreignField: "SGG_CD",
          as: "cerebral_breath_overalldeathvalue"
        }
    },
    {
        $lookup: {
           from: "index_total_PM10sggs",
           localField: "SGG_CD",
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
        SGG_NM: "$SGG_NM",
        SGG_CD: "$SGG_CD",
        SD_NM: "$SD_NM",
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
  ]).exec((err, result) => {
    if (err) return next(err);
    res.json({
      success: true,
      result: result[0]
    });
  })
})

router.get('/', (req, res, next) => {
  const searchQuery = req.query.searchQuery;
  Districts.find( { "SGG_NM": { "$regex": searchQuery} } , ["SD_NM", "SGG_CD", "SGG_NM"], (err, result) => {
    if (err) return next(err);
    res.json({
      success: true,
      result: result,
    });
  });
});

router.get('/go/sd', (req, res, next) => {
  const code = req.query.code;
  const date = req.query.date;
  SdMapsDivided.aggregate([
    {
      $match: {"properties.SIDO_CD": code}
    },
    {
      $lookup: {
        from: "pm25sds",
        localField: "properties.SIDO_CD",
        foreignField: "SD_CD",
        as: "pm25value"
      }
    },
    {
        $lookup: {
            from: "overalldeathsds",
            localField: "properties.SIDO_CD",
            foreignField: "SD_CD",
            as: "overalldeathvalue"
        }
    },
    {
        $lookup: {
            from: "index_total_PM10sds",
            localField: "properties.SIDO_CD",
            foreignField: "SD_CD",
            as: "index_total_PM10"
        }
    },
    {
        $group: {
            _id: {SD_CD: "$properties.SIDO_CD"},
            pm25value: {$first: "$pm25value"},
            overalldeathvalue: {$first: "$overalldeathvalue"},
            index_total_PM10: {$first: "$index_total_PM10"},
            properties: {$first: "$properties"},
            geometry: {$first: "$geometry"},
        }
    },
    {$unwind: "$pm25value"},
    {$unwind: "$overalldeathvalue"},
    {$unwind: "$index_total_PM10"},
    {$project: 
      {
        type: "Feature",
        geometry: "$geometry",
        properties: {
          SIDO_NM: "$properties.SIDO_NM",
          SIDO_CD: "$properties.SIDO_CD",
          PM2_5: "$pm25value." + date,
          OverallDeath: "$overalldeathvalue." + date,
          Index_total_PM10: "$index_total_PM10." + date,
        }
      }
    }
  ]).exec((err, result) => {
    if (err) return next(err);
    res.json({
      success: true,
      result: result[0]
    });
  })
});

router.get('/go/sgg', (req, res, next) => {
  const code = req.query.code;
  const date = req.query.date;
  Sggmap.aggregate([
    {
      $match: {"properties.sigungu_cd": code}
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
            from: "index_total_PM10sggs",
            localField: "properties.sigungu_cd",
            foreignField: "SGG_CD",
            as: "index_total_PM10"
        }
    },

    {
        $group: {
            _id: {SD_CD: "$properties.sigungu_cd"},
            pm25value: {$first: "$pm25value"},
            overalldeathvalue: {$first: "$overalldeathvalue"},
            index_total_PM10: {$first: "$index_total_PM10"},
            properties: {$first: "$properties"},
            geometry: {$first: "$geometry"},
        }
    },
    {$unwind: "$pm25value"},
    {$unwind: "$overalldeathvalue"},
    {$unwind: "$index_total_PM10"},
    {$project: 
      {
        type: "Feature",
        geometry: "$geometry",
        properties: {
          sigungu_nm: "$properties.sigungu_nm",
          sigungu_cd: "$properties.sigungu_cd",
          PM2_5: "$pm25value." + date,
          OverallDeath: "$overalldeathvalue." + date,
          Index_total_PM10: "$index_total_PM10." + date,
        }
      }
    }
  ]).exec((err, result) => {
    if (err) return next(err);
    res.json({
      success: true,
      result: result[0]
    });
  })
});

router.get('/list', (req, res, next) => {
  const SD_CD = req.query.SD_CD;
  
  Districts.find( { SD_CD, SGG_CD: {$ne: SD_CD + "000"} } , ["SGG_NM", "SGG_CD"], (err, result) => {
    if (err) return next(err);
    res.json({
      success: true,
      result: result,
    });
  });
});

router.get('/sgg/search', (req, res, next) => {
  const query = req.query;
  
  Districts.findOne(query, ["SGG_NM", "SGG_CD"], (err, result) => {
    if (err) return next(err);
    res.json({
      success: true,
      result: result,
    });
  });
});

module.exports = router;