var fs = require('fs');
// require('es6-promise/auto');
var turf = require('@turf/turf');

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


var output = [];

fs.readFile('./bnd_sigungu_00_2012_0_5_zoom_5.json', 'utf8', function(err, data){
  if (err) return console.log(err);
  var bnd_sigungu_00_2012_0_5_zoom_5_object = JSON.parse(data); //now it an object
  var GROUP_NMs = ["수원시","성남시","안양시","부천시","안산시","고양시","용인시"]
  return new Promise((resolve, reject) => {
    bnd_sigungu_00_2012_0_5_zoom_5_object.map(object => {
      // console.log("object.SD_CD : ", object.SD_CD)
      if(GROUP_NMs.includes(object.GROUP_NM)) {
        // console.log("object.GROUP_NM : ", object.GROUP_NM )
        var sggObject = {
          "year": object.base_year,
          "abstract_point": "0.5",
          "type" : "Feature",
          "properties": {
            "sido_cd": object.SD_CD, 
            "sigungu_cds": object.SGG_CDs,
            "sido_nm": object.SD_NM,
            "group_nm": object.GROUP_NM,
            "group": true,
          },
          "geometry" : {
            "type": null,
            "coordinates": []
          }
        }
        var polygons;
        
        if(object.GROUP_NM == "안산시") { 
          polygons = [object.features[0].geometry.coordinates, object.features[1].geometry.coordinates[0], object.features[1].geometry.coordinates[1]] // MultiPolygon이라서 2개로 나눠서 해야함
        } else polygons = object.features.map(f => {return f.geometry.coordinates})

        // console.log("polygons.length : ", polygons.length)
        
        var turfFeatureCollection = polygons.map(p => {
          // console.log("p : ",p)
          return turf.polygon(p, {combine: 'yes'})
        })
        // console.log("turfFeatureCollection : ", turfFeatureCollection)
        // console.log("turfFeatureCollection.length : ", turfFeatureCollection.length)
        var features = turf.featureCollection(turfFeatureCollection);
        // console.log("features : ", features)
        var dissolved = turf.dissolve(features, {propertyName: 'combine'});
        // console.log("dissolved : ", dissolved)

        // sggObject.geometry.coordinates.push(dissolved.features[0].geometry.coordinates)
        if(dissolved.features[0].geometry.coordinates.length>1) {
          sggObject.geometry.coordinates = [dissolved.features[0].geometry.coordinates[0]];
        } else sggObject.geometry.coordinates = dissolved.features[0].geometry.coordinates;
        // if(dissolved.features[0].geometry.coordinates.length>1) sggObject.geometry.type = "MultiPolygon"
        // else sggObject.geometry.type = "Polygon"
        sggObject.geometry.type = "Polygon";
        output.push(sggObject)
      }
    });
    resolve()
  }).then(()=> {
    var json = JSON.stringify(output); //convert it back to json
    fs.writeFile('bnd_sigungu_00_2012_0_5_zoom_5_dissolved.json', json, 'utf8'); // write it back 
  })
});






fs.readFile('./bnd_sigungu_00_2012_0_5_divided_by_sgg.json', 'utf8', function(err, data){
  if (err) return console.log(err);
  var bnd_sigungu_00_2012_0_5_divided_by_sgg_object = JSON.parse(data); //now it an object

  return new Promise((resolve, reject) => {
    var sggGangNamObject = {
      "year": year,
      "abstract_point": abstract_point,
      "type" : "Feature",
      "properties": {
        "sido_cd": '11',
        "sido_nm": '서울특별시',
        "sigungu_cds": [],
        "group_nm": "강남",
        "group": true,
        "zoom5": true,
      },
      "geometry" : {
        "type": null,
        "coordinates": []
      }
    }
    
    var GangNam = ['서초구', '강남구', '송파구', '강동구','동작구','관악구','영등포구','구로구','강서구','양천구', '금천구'];
    var year = '2012', abstract_point = '0.5', GangNamFeatureCollection = [];

    return new Promise((resolve, reject) => {
      bnd_sigungu_00_2012_0_5_divided_by_sgg_object.map(object => {
        if(GangNam.includes(object.properties.sigungu_nm)) {
          sggGangNamObject.properties.sigungu_cds.push(object.properties.sigungu_cd)
          var polygons = object.geometry.coordinates
          if(polygons.length == 1) GangNamFeatureCollection.push(turf.polygon(polygons, {combine: 'yes'}))
          else { // MultiPolygon 일시에 
            // polygons.map(p => {
            //   GungiNamFeatureCollection.push(turf.polygon(p, {combine: 'yes'}))
            // })
            GangNamFeatureCollection.push(turf.polygon(polygons[0], {combine: 'yes'}));
          }
        }
      });
      resolve()
    })
    .then(()=>{
      var GangNamFeatures = turf.featureCollection(GangNamFeatureCollection);
      // console.log("GangNamFeatures : ", GangNamFeatures)
      var GangNamDissolved = turf.dissolve(GangNamFeatures, {propertyName: 'combine'});
      // console.log("GangNamDissolved : ", GangNamDissolved)
      sggGangNamObject.geometry.coordinates = [GangNamDissolved.features[0].geometry.coordinates[0]];
      // sggGangNamObject.geometry.type = sggGangNamObject.geometry.coordinates.length == 1 ? "Polygon" : "MultiPolygon"
      sggGangNamObject.geometry.type = "Polygon";
      output.push(sggGangNamObject)
    })
  }).then(()=> {
    var json = JSON.stringify(output); //convert it back to json
    fs.writeFile('bnd_sigungu_00_2012_0_5_zoom_5_dissolved.json', json, 'utf8'); // write it back 
  })
});



fs.readFile('./bnd_sigungu_00_2012_0_5_divided_by_sgg.json', 'utf8', function(err, data){
  if (err) return console.log(err);
  var bnd_sigungu_00_2012_0_5_divided_by_sgg_object = JSON.parse(data); //now it an object

  return new Promise((resolve, reject) => {
    var sggGangBuckObject = {
      "year": year,
      "abstract_point": abstract_point,
      "type" : "Feature",
      "properties": {
        "sido_cd": '11',
        "sido_nm": '서울특별시',
        "sigungu_cds": [],
        "group_nm": "강북",
        "group": true,
        "zoom5": true,
      },
      "geometry" : {
        "type": null,
        "coordinates": []
      }
    }
    
    
    var GangBuck = ['은평구', '서대문구', '마포구', '종로구','중구','용산구','도봉구','강북구','성북구','동대문구','성동구','노원구','중랑구','광진구'];
    var year = '2012', abstract_point = '0.5';
    var GangBuckFeatureCollection = [];


    return new Promise((resolve, reject) => {
      var length = bnd_sigungu_00_2012_0_5_divided_by_sgg_object.length
      var i = 1
      bnd_sigungu_00_2012_0_5_divided_by_sgg_object.map(object => {
        if(GangBuck.includes(object.properties.sigungu_nm)) {
          // console.log("object.properties.sigungu_cd : ", object.properties.sigungu_cd)
          sggGangBuckObject.properties.sigungu_cds.push(object.properties.sigungu_cd)
          var polygons = object.geometry.coordinates
          // console.log("polygons : ", polygons)
          if(polygons.length == 1) GangBuckFeatureCollection.push(turf.polygon(polygons, {combine: 'yes'}))
          else { // MultiPolygon 일시에 
            // polygons.map(p => {
            //   GangBuckFeatureCollection.push(turf.polygon(p, {combine: 'yes'}))
            // })
            GangBuckFeatureCollection.push(turf.polygon(polygons[0], {combine: 'yes'}));
          }
        }
      });
      resolve();
    })
    .then(()=>{
      // console.log("GangBuckFeatureCollection : ", GangBuckFeatureCollection)
      var GangBuckFeatures = turf.featureCollection(GangBuckFeatureCollection);
      // console.log("GangBuckFeatures : ", GangBuckFeatures)
      var GangBuckDissolved = turf.dissolve(GangBuckFeatures, {propertyName: 'combine'});
      // console.log("GangBuckDissolved : ", GangBuckDissolved)
      sggGangBuckObject.geometry.coordinates = [GangBuckDissolved.features[0].geometry.coordinates[0]];
      // sggGangBuckObject.geometry.type = sggGangBuckObject.geometry.coordinates.length == 1 ? "Polygon" : "MultiPolygon"
      sggGangBuckObject.geometry.type = "Polygon";
      output.push(sggGangBuckObject)
    })
  }).then(()=> {
    var json = JSON.stringify(output); //convert it back to json
    fs.writeFile('bnd_sigungu_00_2012_0_5_zoom_5_dissolved.json', json, 'utf8'); // write it back 
  })
});


fs.readFile('./bnd_sigungu_00_2012_0_5_divided_by_sgg.json', 'utf8', function(err, data){
  if (err) return console.log(err);
  var bnd_sigungu_00_2012_0_5_divided_by_sgg_object = JSON.parse(data); //now it an object

  return new Promise((resolve, reject) => {
    var sggGungiNamObject = {
      "year": year,
      "abstract_point": abstract_point,
      "type" : "Feature",
      "properties": {
        "sido_cd": '31',
        "sido_nm": '경기도',
        "sigungu_cds": [],
        "group_nm": "경기남부",
        "group": true,
        "zoom5": true,
      },
      "geometry" : {
        "type": null,
        "coordinates": []
      }
    }
    
    
    var GungiNam = [
      "과천시","광명시","광주시","군포시","김포시",
      "수원시장안구", "수원시팔달구", "수원시권선구", "수원시영통구",
      "성남시수정구","성남시중원구","성남시분당구",
      "안양시만안구","안양시동안구",
      "부천시원미구","부천시소사구","부천시오정구",
      "안산시상록구","안산시단원구",
      "용인시수지구","용인시기흥구","용인시처인구",
      "시흥시","안성시","여주시","오산시","의왕시","이천시","평택시","하남시","화성시"];
    var year = '2012', abstract_point = '0.5';
    var GungiNamFeatureCollection = [];


    return new Promise((resolve, reject) => {
      bnd_sigungu_00_2012_0_5_divided_by_sgg_object.map(object => {
        if(GungiNam.includes(object.properties.sigungu_nm)) {
          // console.log("object.properties.sigungu_cd : ", object.properties.sigungu_cd)
          sggGungiNamObject.properties.sigungu_cds.push(object.properties.sigungu_cd)
          var polygons = object.geometry.coordinates
          // console.log("polygons : ", polygons)
          if(polygons.length == 1) GungiNamFeatureCollection.push(turf.polygon(polygons, {combine: 'yes'}))
          else { // MultiPolygon 일시에 
            // polygons.map(p => {
            //   GungiNamFeatureCollection.push(turf.polygon(p, {combine: 'yes'}))
            // })
            GungiNamFeatureCollection.push(turf.polygon(polygons[0], {combine: 'yes'}));
          }
        }
      });
      resolve();
    })
    .then(()=>{
      console.log("GungiNamFeatureCollection : ", GungiNamFeatureCollection)
      var GungiNamFeatures = turf.featureCollection(GungiNamFeatureCollection);
      // console.log("GungiNamFeatures : ", GungiNamFeatures)
      var GungiNamDissolved = turf.dissolve(GungiNamFeatures, {propertyName: 'combine'});
      // console.log("GungiNamDissolved : ", GungiNamDissolved)
      sggGungiNamObject.geometry.coordinates = [GungiNamDissolved.features[0].geometry.coordinates[0]];
      // sggGungiNamObject.geometry.type = sggGungiNamObject.geometry.coordinates.length == 1 ? "Polygon" : "MultiPolygon"
      sggGungiNamObject.geometry.type = "Polygon";
      output.push(sggGungiNamObject)
    })
  }).then(()=> {
    var json = JSON.stringify(output); //convert it back to json
    fs.writeFile('bnd_sigungu_00_2012_0_5_zoom_5_dissolved.json', json, 'utf8'); // write it back 
  })
});



fs.readFile('./bnd_sigungu_00_2012_0_5_divided_by_sgg.json', 'utf8', function(err, data){
  if (err) return console.log(err);
  var bnd_sigungu_00_2012_0_5_divided_by_sgg_object = JSON.parse(data); //now it an object

  return new Promise((resolve, reject) => {
    var sggGungiBuckObject = {
      "year": year,
      "abstract_point": abstract_point,
      "type" : "Feature",
      "properties": {
        "sido_cd": '31',
        "sido_nm": '경기도',
        "sigungu_cds": [],
        "group_nm": "경기북부",
        "group": true,
        "zoom5": true,
      },
      "geometry" : {
        "type": null,
        "coordinates": []
      }
    }
    
    
    var GungiBuck = ["의정부시",
    "고양시덕양구","고양시일산서구","고양시일산동구",
    , "구리시", "남양주시", "동두천시", "양주시", "파주시", "포천시", "연천군", "가평군"]
    var year = '2012', abstract_point = '0.5';
    var GungiBuckFeatureCollection = [];

    return new Promise((resolve, reject) => {
      bnd_sigungu_00_2012_0_5_divided_by_sgg_object.map(object => {
        if(GungiBuck.includes(object.properties.sigungu_nm)) {
          console.log('=======GungiBuck=====')
          console.log("object.properties.sigungu_nm : ", object.properties.sigungu_nm)
          sggGungiBuckObject.properties.sigungu_cds.push(object.properties.sigungu_cd)
          var polygons = object.geometry.coordinates
          // console.log("polygons : ", polygons)
          if(polygons.length == 1) GungiBuckFeatureCollection.push(turf.polygon(polygons, {combine: 'yes'}))
          else { // MultiPolygon 일시에 
            // polygons.map(p => {
            //   GungiBuckFeatureCollection.push(turf.polygon(p, {combine: 'yes'}))
            // })
            GungiBuckFeatureCollection.push(turf.polygon(polygons[0], {combine: 'yes'}));
          }
        }
      });
      resolve();
    })
    .then(()=>{
      console.log("GungiBuckFeatureCollection : ", GungiBuckFeatureCollection)
      var GungiBuckFeatures = turf.featureCollection(GungiBuckFeatureCollection);
      // console.log("GungiBuckFeatures : ", GungiBuckFeatures)
      var GungiBuckDissolved = turf.dissolve(GungiBuckFeatures, {propertyName: 'combine'});
      // console.log("GungiBuckDissolved : ", GungiBuckDissolved)
      sggGungiBuckObject.geometry.coordinates = GungiBuckDissolved.features[0].geometry.coordinates;
      // sggGungiBuckObject.geometry.type = sggGungiBuckObject.geometry.coordinates.length == 1 ? "Polygon" : "MultiPolygon"
      sggGungiBuckObject.geometry.type =  "Polygon";
      output.push(sggGungiBuckObject)
    })
  }).then(()=> {
    var json = JSON.stringify(output); //convert it back to json
    fs.writeFile('bnd_sigungu_00_2012_0_5_zoom_5_dissolved.json', json, 'utf8'); // write it back 
  })
});

// // mongoimport -d pmhealth -c sggmaps_sgg_sd --type json --file bnd_sigungu_00_2012_0_5_divided_by_sido.json --jsonArray
