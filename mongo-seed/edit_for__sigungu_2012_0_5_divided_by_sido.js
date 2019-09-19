var fs = require('fs');

var codeToSD = [
  {"SD_CD": "11", "SD_NM": "서울특별시"},
  {"SD_CD": "21", "SD_NM": "부산광역시"},
  {"SD_CD": "22", "SD_NM": "대구광역시"},
  {"SD_CD": "23", "SD_NM": "인천광역시"},
  {"SD_CD": "24", "SD_NM": "광주광역시"},
  {"SD_CD": "25", "SD_NM": "대전광역시"},
  {"SD_CD": "26", "SD_NM": "울산광역시"},
  {"SD_CD": "29", "SD_NM": "세종특별자치시"},
  {"SD_CD": "31", "SD_NM": "경기도"},
  {"SD_CD": "32", "SD_NM": "강원도"},
  {"SD_CD": "33", "SD_NM": "충청북도"},
  {"SD_CD": "34", "SD_NM": "충청남도"},
  {"SD_CD": "35", "SD_NM": "전라북도"},
  {"SD_CD": "36", "SD_NM": "전라남도"},
  {"SD_CD": "37", "SD_NM": "경상북도"},
  {"SD_CD": "38", "SD_NM": "경상남도"},
  {"SD_CD": "39", "SD_NM": "제주특별자치도"}
]
fs.readFile('./bnd_sigungu_00_2012_0_5.json', 'utf8', function readFileCallback(err, data){
  if (err){
      console.log(err);
  } else {
  var objData = JSON.parse(data); //now it an object
  var output = [];
  
  // objData.table.push({id: 2, square:3}); //add some data
  return new Promise((resolve, reject) => {
    codeToSD.forEach(function(cts){
      var sdObjects = {
        "SD_CD": cts.SD_CD, 
        "SD_NM": cts.CD_NM,
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
        objData.features.map(f => {
          console.log("---------") 
          console.log("cts.SD_CD : ", cts.SD_CD)
          console.log("f.properties.sigungu_cd.substring(0,2) : ", f.properties.sigungu_cd.substring(0,2))
          console.log("=========") 
          if(cts.SD_CD == f.properties.sigungu_cd.substring(0,2)) {
            sdObjects.features.push(
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
      }).then(() => {
        output.push(sdObjects)
      }).catch(err => {
        console.log("err : ", err)
      })
    })
    resolve()
  }).then((res) => {
    json = JSON.stringify(output); //convert it back to json
    fs.writeFile('bnd_sigungu_00_2012_0_5_divided_by_sido.json', json, 'utf8'); // write it back 
  }).catch(err => {
    console.log("err : ", err)
  })
}});

// mongoimport -d pmhealth -c sggmaps_sgg_sd --type json --file bnd_sigungu_00_2012_0_5_divided_by_sido.json --jsonArray


// codeToSD.forEach(function(cts){
//   db.getCollection('sggmaps_copy2').findOne({SD_CD: null}, function(sc){
//       sc.features.forEach(function(s, i){
//           if(cts.SD_CD == s.properties.sigungu_cd.substring(0,2)){
//               db.getCollection('sggmaps_copy2').update(
//                   {
//                       SD_CD: cts.SD_CD
//                   },
//                   {
//                       $addToSet: {                           
//                           features: {
//                               type: s.type,
//                               properties: s.properties,
//                               geometry: s.geometry
//                           }
//                       }
//                   }
//               )           
//           }
//       })
//   })
// })
// // db.getCollection('sggmaps_copy').find({}).forEach(function(sc){
// //     sc.features.forEach(function(s, i){
// //         db.getCollection('sggmaps_copy').insert({
// //             type: sc.type,
// //             crs: sc.crs,
// //             features: [
// //                 {
// //                     type: s.type,
// //                     properties: s.properties,
// //                     geometry: {
// //                         type: s.geometry.type,
// //                         coordinates: s.geometry.coordinates
// //                     }
// //                 }
// //             ]
// //         })
// //     })
// // })