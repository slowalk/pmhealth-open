var fs = require('fs');
require('@turf/turf');

var sggToExclude = [
  // {"SD_CD": "31", "SD_NM": "경기도"}
  {"SD_CD": "23", "SD_NM": "인천광역시"},
  {"SD_CD": "25", "SD_NM": "대전광역시"},
  {"SD_CD": "29", "SD_NM": "세종시"},
  {"SD_CD": "32", "SD_NM": "강원도"},
  {"SD_CD": "33", "SD_NM": "충청북도"},
  {"SD_CD": "34", "SD_NM": "충청남도"},
  {"SD_CD": "35", "SD_NM": "전라북도"},
  {"SD_CD": "36", "SD_NM": "전라남도"},
  {"SD_CD": "37", "SD_NM": "경상북도"},
  {"SD_CD": "38", "SD_NM": "경상남도"},
  {"SD_CD": "39", "SD_NM": "제주특별자치도"}
]

var SDToInclude = [
  {"SD_CD": "11", "SD_NM": "서울특별시"},
  {"SD_CD": "21", "SD_NM": "부산광역시"},
  {"SD_CD": "22", "SD_NM": "대구광역시"},
  {"SD_CD": "24", "SD_NM": "광주광역시"},
  {"SD_CD": "26", "SD_NM": "울산광역시"},
  // {"SD_CD": "31", "SD_NM": "경기도"}
]

// var SDToInclude = ["11","21","22","24","26","31"]

var sggToGroup = [
  // {SD_CD: "31", "GROUP_NM": "경기남부", SGG_CDs: [
  {"SD_CD": "31", "GROUP_NM": "수원시", "SGG_CDs": ["31011", "31012", "31013", "31014"]},
  {"SD_CD": "31", "GROUP_NM": "성남시", "SGG_CDs": ["31021","31022","31023"]},
  {"SD_CD": "31", "GROUP_NM": "안양시", "SGG_CDs": ["31041","31042"]},
  {"SD_CD": "31", "GROUP_NM": "부천시", "SGG_CDs": ["31051","31052","31053"]},
  {"SD_CD": "31", "GROUP_NM": "안산시", "SGG_CDs": ["31091","31092"]},
  {"SD_CD": "31", "GROUP_NM": "고양시", "SGG_CDs": ["31101","31103","31104"]},
  {"SD_CD": "31", "GROUP_NM": "용인시", "SGG_CDs": ["31191","31192","31193"]}
  // ]},  
];

var gungiToExcludeSgg = [
  "31011", "31012", "31013", "31014", "31021",
  "31022", "31023", "31041", "31042", "31051",
  "31052", "31053", "31091", "31092", "31101",
  "31103", "31104", "31191", "31192", "31193"
]


// var bnd_sido_00_2016_1_object, bnd_sigungu_00_2012_0_5_object;

// function getSdData() {
//   fs.readFile('./bnd_sido_00_2016_1.json', 'utf8', function(err, data){
//     if (err) return console.log(err);
//     bnd_sido_00_2016_1_object = JSON.parse(data); //now it an objec
//   })  
// }
// function getSggData() {
//   fs.readFile('./bnd_sigungu_00_2012_0_5.json', 'utf8', function readFileCallback(err, data){
//     if (error) return console.log(err);
//     bnd_sigungu_00_2012_0_5_object = JSON.parse(data); //now it an object
//   })
// }

fs.readFile('./bnd_sido_00_2016_1.json', 'utf8', function(err, data){
  if (err) return console.log(err);
  var bnd_sido_00_2016_1_object = JSON.parse(data); //now it an object

  fs.readFile('./bnd_sigungu_00_2012_0_5.json', 'utf8', function readFileCallback(error, data2){
    if (error) return console.log(error);
    var bnd_sigungu_00_2012_0_5_object = JSON.parse(data2); //now it an object
    var output = [];
    // 시도로 추가할 경우
    return new Promise((reso, reject) => {
      SDToInclude.forEach(function(stsI) {
        var sdObjects = {
          "SD_CD": stsI.SD_CD, 
          "SD_NM": stsI.SD_NM,
          "base_year": "2012",
          "type" : "FeatureCollection",
          "crs" : {
              "type" : "name",
              "properties" : {
                  "name" : "urn:ogc:def:crs:OGC:1.3:CRS84"
              }
          },
          "features" : []
        }
        return new Promise((resolve, reject) => {
          bnd_sido_00_2016_1_object.features.map(f => {
            if(stsI.SD_CD == f.properties.SIDO_CD) {
              // console.log("---------") 
              // console.log("stsI.SD_CD : ", stsI.SD_CD)
              // console.log("f.properties.SIDO_CD : ", f.properties.SIDO_CD.substring(0,2))
              // console.log("=========") 
              sdObjects.features.push(
                {
                  "type": "Feature",
                  "properties": {
                    "sido_cd" : f.properties.SIDO_CD,
                    "sido_nm" : f.properties.SIDO_NM
                  },
                  "geometry": f.geometry
                }
              )
            }
          })
          resolve()
        })
        .then((res) => {
          output.push(sdObjects)
        })
        .catch(err => {
          console.log("err in sd : ", err)
        })    
      })
      reso()
    })
    .then((res) => {
      // json = JSON.stringify(output); //convert it back to json
      // fs.writeFile('bnd_sigungu_00_2012_0_5_zoom_5.json', json, 'utf8'); // write it back 
    }).catch(err => {
      console.log("err : ", err)
    })
    

    .then((res) => {
      // 시군구로 추가할 경우
      return new Promise((reso, reject) => {
        sggToExclude.forEach(function(sts){
          var sggObject = {
            "SD_CD": sts.SD_CD, 
            "SD_NM": sts.CD_NM,
            "base_year": "2012",
            "type" : "FeatureCollection",
            "crs" : {
                "type" : "name",
                "properties" : {
                    "name" : "urn:ogc:def:crs:OGC:1.3:CRS84"
                }
            },
            "features" : []
          }
          return new Promise((resolve, reject) => {
            bnd_sigungu_00_2012_0_5_object.features.map(f => {
              if(sts.SD_CD == f.properties.sigungu_cd.substring(0,2)) {
                // console.log("---------") 
                // console.log("sts.SD_CD : ", sts.SD_CD)
                // console.log("f.properties.sigungu_cd.substring(0,2) : ", f.properties.sigungu_cd.substring(0,2))
                // console.log("=========") 
                sggObject.features.push(
                  {
                    "type": "Feature",
                    "properties": {
                      "sigungu_cd" : f.properties.sigungu_cd,
                      "sigungu_nm" : f.properties.sigungu_nm
                    },
                    "geometry": f.geometry
                  }
                )
              }
            })
            resolve()
          })
          .then(() => {
            output.push(sggObject)
          })
          .catch(err => {
            console.log("err : ", err)
          })
        })
        reso()
      }).then((res) => {
        // json = JSON.stringify(output); //convert it back to json
        // fs.writeFile('bnd_sigungu_00_2012_0_5_zoom_5.json', json, 'utf8'); // write it back 
      }).catch(err => {
        console.log("err : ", err)
      })
    })


    .then(()=> {
      // 경기도 중 그룹만 묶기
      return new Promise((reso, reject) => {
        sggToGroup.forEach(function(stg){
          var sggObject = {
            "SGG_CDs": stg.SGG_CDs, 
            "SD_CD": stg.SD_CD, 
            "GROUP_NM": stg.GROUP_NM,
            "Group": true,
            "base_year": "2012",
            "type" : "FeatureCollection",
            "crs" : {
                "type" : "name",
                "properties" : {
                    "name" : "urn:ogc:def:crs:OGC:1.3:CRS84"
                }
            },
            "features" : []
          }
          return new Promise((resolve, reject) => {
            bnd_sigungu_00_2012_0_5_object.features.map(f => {
              if( stg.SGG_CDs.includes(f.properties.sigungu_cd) ) {
                console.log("---------") 
                console.log("stg.SD_CD : ", stg.SD_CD)
                console.log("stg.SGG_CDs : ", stg.SGG_CDs)
                console.log("f.properties.sigungu_cd : ", f.properties.sigungu_cd)
                console.log("=========") 
                sggObject.features.push(
                  {
                    "type": "Feature",
                    "properties": {
                      "sigungu_cd" : f.properties.sigungu_cd,
                      "sigungu_nm" : f.properties.sigungu_nm,
                      "group_nm" : stg.GROUP_NM
                    },
                    "geometry": f.geometry
                  }
                )
              }
            })
            resolve()
          })
          .then(() => {
            output.push(sggObject)
          })
          .catch(err => {
            console.log("err : ", err)
          })
        })
        reso()
      }).then((res) => {
        json = JSON.stringify(output); //convert it back to json
        fs.writeFile('bnd_sigungu_00_2012_0_5_zoom_5.json', json, 'utf8'); // write it back 
      }).catch(err => {
        console.log("err : ", err)
      })
    })
    .catch(err => {
      console.log("경기도 중 그룹만 묶기 ---- err : ", err)
    })


    .then(()=> {
      // 경기도 중 그룹이외의 시군구
      return new Promise((reso, reject) => {
        var sggObject = {
          "SD_CD": "31", 
          "SD_NM": "경기도",
          "Group": false,
          "base_year": "2012",
          "type" : "FeatureCollection",
          "crs" : {
              "type" : "name",
              "properties" : {
                  "name" : "urn:ogc:def:crs:OGC:1.3:CRS84"
              }
          },
          "features" : []
        }
        return new Promise((resolve, reject) => {
          bnd_sigungu_00_2012_0_5_object.features.map(f => {
            if( gungiToExcludeSgg.includes(f.properties.sigungu_cd) ) {
              // console.log("---------") 
              // console.log("gungiToExcludeSgg")
              // console.log("f.properties.sigungu_cd : ", f.properties.sigungu_cd)
              // console.log("=========") 
              sggObject.features.push(
                {
                  "type": "Feature",
                  "properties": {
                    "sigungu_cd" : f.properties.sigungu_cd,
                    "sigungu_nm" : f.properties.sigungu_nm
                  },
                  "geometry": f.geometry
                }
              )
            }
          })
          resolve()
        })
        .then(() => {
          output.push(sggObject)
        })
        .catch(err => {
          console.log("err : ", err)
        })
        reso()
      }).then((res) => {
        var json = JSON.stringify(output); //convert it back to json
        fs.writeFile('bnd_sigungu_00_2012_0_5_zoom_5.json', json, 'utf8'); // write it back 
      }).catch(err => {
        console.log("err : ", err)
      })
    })
    .catch(err => {
      console.log("경기도 중 그룹이외의 시군구 ---- err : ", err)
    })
  });
});

// // mongoimport -d pmhealth -c sggmaps_sgg_sd --type json --file bnd_sigungu_00_2012_0_5_divided_by_sido.json --jsonArray
