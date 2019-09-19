db.districts.find().forEach(function(d){
  db.cerebral_blood_vessel_overalldeathsggs.update({SD_NM: d.SD_NM, SGG_NM: d.SGG_NM}, {$set: {SD_CD: d.SD_CD, SGG_CD: d.SGG_CD}})  
})



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

// 행정구역 코드 삽입 (몽고쉘에서)
codeToSD.forEach(function(cd){
  db.cerebral_blood_vessel_overalldeathsggs.aggregate([
    {$match: {SD_CD: cd.SD_CD}},
    {
      $group: {
        "_id": {SD_CD: "$SD_CD"},
        "SD_NM": {$first: "$SD_NM"},
        "SGG_NM": {$first: cd.SD_NM},
        "SGG_CD": {$first: cd.SD_CD + '000'},
        "SD_CD": {$first: "$SD_CD"},
        "beta": {$avg: "$beta"},
        "beta_L": {$avg: "$beta_L"},
        "beta_U": {$avg: "$beta_U"},
        "2012_1": {$sum: "$2012_1"},
        "2012_2": {$sum: "$2012_2"},
        "2012_3": {$sum: "$2012_3"},
        "2012_4": {$sum: "$2012_4"},
        "2012_5": {$sum: "$2012_5"},
        "2012_6": {$sum: "$2012_6"},
        "2012_7": {$sum: "$2012_7"},
        "2012_8": {$sum: "$2012_8"},
        "2012_9": {$sum: "$2012_9"},
        "2012_10": {$sum: "$2012_10"},
        "2012_11": {$sum: "$2012_11"},
        "2012_12": {$sum: "$2012_12"},
        "2013_1": {$sum: "$2013_1"},
        "2013_2": {$sum: "$2013_2"},
        "2013_3": {$sum: "$2013_3"},
        "2013_4": {$sum: "$2013_4"},
        "2013_5": {$sum: "$2013_5"},
        "2013_6": {$sum: "$2013_6"},
        "2013_7": {$sum: "$2013_7"},
        "2013_8": {$sum: "$2013_8"},
        "2013_9": {$sum: "$2013_9"},
        "2013_10": {$sum: "$2013_10"},
        "2013_11": {$sum: "$2013_11"},
        "2013_12": {$sum: "$2013_12"},
        "2014_1": {$sum: "$2014_1"},
        "2014_2": {$sum: "$2014_2"},
        "2014_3": {$sum: "$2014_3"},
        "2014_4": {$sum: "$2014_4"},
        "2014_5": {$sum: "$2014_5"},
        "2014_6": {$sum: "$2014_6"},
        "2014_7": {$sum: "$2014_7"},
        "2014_8": {$sum: "$2014_8"},
        "2014_9": {$sum: "$2014_9"},
        "2014_10": {$sum: "$2014_10"},
        "2014_11": {$sum: "$2014_11"},
        "2014_12": {$sum: "$2014_12"},
        "2015_1": {$sum: "$2015_1"},
        "2015_2": {$sum: "$2015_2"},
        "2015_3": {$sum: "$2015_3"},
        "2015_4": {$sum: "$2015_4"},
        "2015_5": {$sum: "$2015_5"},
        "2015_6": {$sum: "$2015_6"},
        "2015_7": {$sum: "$2015_7"},
        "2015_8": {$sum: "$2015_8"},
        "2015_9": {$sum: "$2015_9"},
        "2015_10": {$sum: "$2015_10"},
        "2015_11": {$sum: "$2015_11"},
        "2015_12": {$sum: "$2015_12"},
        "1mth_avg": {$sum: "$1mth_avg"},
        "2mth_avg": {$sum: "$2mth_avg"},
        "3mth_avg": {$sum: "$3mth_avg"},
        "4mth_avg": {$sum: "$4mth_avg"},
        "5mth_avg": {$sum: "$5mth_avg"},
        "6mth_avg": {$sum: "$6mth_avg"},
        "7mth_avg": {$sum: "$7mth_avg"},
        "8mth_avg": {$sum: "$8mth_avg"},
        "9mth_avg": {$sum: "$9mth_avg"},
        "10mth_avg": {$sum: "$10mth_avg"},
        "11mth_avg": {$sum: "$11mth_avg"},
        "12mth_avg": {$sum: "$12mth_avg"}
      }
    }, 
    {"$out": cd.SD_CD + "cerebral_blood_vessel_overalldeathsds"}
  ])
})


// mongoexport -d pmhealth -c 11cerebral_blood_vessel_overalldeathsds --out 11cerebral_blood_vessel_overalldeathsds.json
// mongoexport -d pmhealth -c 21cerebral_blood_vessel_overalldeathsds --out 21cerebral_blood_vessel_overalldeathsds.json
// mongoexport -d pmhealth -c 22cerebral_blood_vessel_overalldeathsds --out 22cerebral_blood_vessel_overalldeathsds.json
// mongoexport -d pmhealth -c 23cerebral_blood_vessel_overalldeathsds --out 23cerebral_blood_vessel_overalldeathsds.json
// mongoexport -d pmhealth -c 24cerebral_blood_vessel_overalldeathsds --out 24cerebral_blood_vessel_overalldeathsds.json
// mongoexport -d pmhealth -c 25cerebral_blood_vessel_overalldeathsds --out 25cerebral_blood_vessel_overalldeathsds.json
// mongoexport -d pmhealth -c 26cerebral_blood_vessel_overalldeathsds --out 26cerebral_blood_vessel_overalldeathsds.json
// mongoexport -d pmhealth -c 29cerebral_blood_vessel_overalldeathsds --out 29cerebral_blood_vessel_overalldeathsds.json
// mongoexport -d pmhealth -c 31cerebral_blood_vessel_overalldeathsds --out 31cerebral_blood_vessel_overalldeathsds.json
// mongoexport -d pmhealth -c 32cerebral_blood_vessel_overalldeathsds --out 32cerebral_blood_vessel_overalldeathsds.json
// mongoexport -d pmhealth -c 33cerebral_blood_vessel_overalldeathsds --out 33cerebral_blood_vessel_overalldeathsds.json
// mongoexport -d pmhealth -c 34cerebral_blood_vessel_overalldeathsds --out 34cerebral_blood_vessel_overalldeathsds.json
// mongoexport -d pmhealth -c 35cerebral_blood_vessel_overalldeathsds --out 35cerebral_blood_vessel_overalldeathsds.json
// mongoexport -d pmhealth -c 36cerebral_blood_vessel_overalldeathsds --out 36cerebral_blood_vessel_overalldeathsds.json
// mongoexport -d pmhealth -c 37cerebral_blood_vessel_overalldeathsds --out 37cerebral_blood_vessel_overalldeathsds.json
// mongoexport -d pmhealth -c 38cerebral_blood_vessel_overalldeathsds --out 38cerebral_blood_vessel_overalldeathsds.json
// mongoexport -d pmhealth -c 39cerebral_blood_vessel_overalldeathsds --out 39cerebral_blood_vessel_overalldeathsds.json

// mongoimport -d pmhealth -c cerebral_blood_vessel_overalldeathsds --file 11cerebral_blood_vessel_overalldeathsds.json
// mongoimport -d pmhealth -c cerebral_blood_vessel_overalldeathsds --file 21cerebral_blood_vessel_overalldeathsds.json
// mongoimport -d pmhealth -c cerebral_blood_vessel_overalldeathsds --file 22cerebral_blood_vessel_overalldeathsds.json
// mongoimport -d pmhealth -c cerebral_blood_vessel_overalldeathsds --file 23cerebral_blood_vessel_overalldeathsds.json
// mongoimport -d pmhealth -c cerebral_blood_vessel_overalldeathsds --file 24cerebral_blood_vessel_overalldeathsds.json
// mongoimport -d pmhealth -c cerebral_blood_vessel_overalldeathsds --file 25cerebral_blood_vessel_overalldeathsds.json
// mongoimport -d pmhealth -c cerebral_blood_vessel_overalldeathsds --file 26cerebral_blood_vessel_overalldeathsds.json
// mongoimport -d pmhealth -c cerebral_blood_vessel_overalldeathsds --file 29cerebral_blood_vessel_overalldeathsds.json
// mongoimport -d pmhealth -c cerebral_blood_vessel_overalldeathsds --file 31cerebral_blood_vessel_overalldeathsds.json
// mongoimport -d pmhealth -c cerebral_blood_vessel_overalldeathsds --file 32cerebral_blood_vessel_overalldeathsds.json
// mongoimport -d pmhealth -c cerebral_blood_vessel_overalldeathsds --file 33cerebral_blood_vessel_overalldeathsds.json
// mongoimport -d pmhealth -c cerebral_blood_vessel_overalldeathsds --file 34cerebral_blood_vessel_overalldeathsds.json
// mongoimport -d pmhealth -c cerebral_blood_vessel_overalldeathsds --file 35cerebral_blood_vessel_overalldeathsds.json
// mongoimport -d pmhealth -c cerebral_blood_vessel_overalldeathsds --file 36cerebral_blood_vessel_overalldeathsds.json
// mongoimport -d pmhealth -c cerebral_blood_vessel_overalldeathsds --file 37cerebral_blood_vessel_overalldeathsds.json
// mongoimport -d pmhealth -c cerebral_blood_vessel_overalldeathsds --file 38cerebral_blood_vessel_overalldeathsds.json
// mongoimport -d pmhealth -c cerebral_blood_vessel_overalldeathsds --file 39cerebral_blood_vessel_overalldeathsds.json


// mongoexport -d pmhealth -c cerebral_blood_vessel_overalldeathsds --out cerebral_blood_vessel_overalldeathsds.json
// mongoexport -d pmhealth -c cerebral_blood_vessel_overalldeathsggs --out cerebral_blood_vessel_overalldeathsggs.json

// docker run --rm --link 0e31d8d9074f:mongo --net pmhealthmevn_default -v /home/dave/app/pmhealth-mevn/mongo-seed:/data/add mongo bash -c 'mongoimport -d pmhealth -c cerebral_blood_vessel_overalldeathsggs --file /data/add/overalldeath/ill/cerebral_blood_vessel_overalldeathsggs.json --host mongo:27017'
// docker run --rm --link 0e31d8d9074f:mongo --net pmhealthmevn_default -v /home/dave/app/pmhealth-mevn/mongo-seed:/data/add mongo bash -c 'mongoimport -d pmhealth -c cerebral_blood_vessel_overalldeathsds --file /data/add/overalldeath/ill/cerebral_blood_vessel_overalldeathsds.json --host mongo:27017'





//// 경기남부 ,북부, 강남, 강북, 대구, 부산, 인천
//몽고 쉘에서 데이터 생성 -->  mongoexport --> mongoimport

// const Pm2_5Sgg = require('../../models/pm2_5/sgg');

////////////////////////////////////////////////////////////////////////////////////
var seoulSouth = [
  "11150", "11160", "11170", "11180", "11190",
  "11200", "11210", "11220", "11230", "11240",
  "11250"
]

db.cerebral_blood_vessel_overalldeathsggs.aggregate([
  {
    $match: {
      SGG_CD: {$in: seoulSouth}
    }
  },
  {
    $group: {
        "_id": 1,
        "SD_NM" : {$first: "$SD_NM"},
        "SD_CD" : {$first: "$SD_CD"},
        "SGG_NM" : {$first: "강남"},
        "SGG_CD" : {$first: "11_강남"},
        "beta": {$avg: "$beta"},
        "beta_L": {$avg: "$beta_L"},
        "beta_U": {$avg: "$beta_U"},
        "2012_1" : {$avg: "$2012_1"},
        "2012_2" : {$avg: "$2012_2"},
        "2012_3" : {$avg: "$2012_3"},
        "2012_4" : {$avg: "$2012_4"},
        "2012_5" : {$avg: "$2012_5"},
        "2012_6" : {$avg: "$2012_6"},
        "2012_7" : {$avg: "$2012_7"},
        "2012_8" : {$avg: "$2012_8"},
        "2012_9" : {$avg: "$2012_9"},
        "2012_10" : {$avg: "$2012_10"},
        "2012_11" : {$avg: "$2012_11"},
        "2012_12" : {$avg: "$2012_12"},
        "2013_1" : {$avg: "$2013_1"},
        "2013_2" : {$avg: "$2013_2"},
        "2013_3" : {$avg: "$2013_3"},
        "2013_4" : {$avg: "$2013_4"},
        "2013_5" : {$avg: "$2013_5"},
        "2013_6" : {$avg: "$2013_6"},
        "2013_7" : {$avg: "$2013_7"},
        "2013_8" : {$avg: "$2013_8"},
        "2013_9" : {$avg: "$2013_9"},
        "2013_10" : {$avg: "$2013_10"},
        "2013_11" : {$avg: "$2013_11"},
        "2013_12" : {$avg: "$2013_12"},
        "2014_1" : {$avg: "$2014_1"},
        "2014_2" : {$avg: "$2014_2"},
        "2014_3" : {$avg: "$2014_3"},
        "2014_4" : {$avg: "$2014_4"},
        "2014_5" : {$avg: "$2014_5"},
        "2014_6" : {$avg: "$2014_6"},
        "2014_7" : {$avg: "$2014_7"},
        "2014_8" : {$avg: "$2014_8"},
        "2014_9" : {$avg: "$2014_9"},
        "2014_10" : {$avg: "$2014_10"},
        "2014_11" : {$avg: "$2014_11"},
        "2014_12" : {$avg: "$2014_12"},
        "2015_1" : {$avg: "$2015_1"},
        "2015_2" : {$avg: "$2015_2"},
        "2015_3" : {$avg: "$2015_3"},
        "2015_4" : {$avg: "$2015_4"},
        "2015_5" : {$avg: "$2015_5"},
        "2015_6" : {$avg: "$2015_6"},
        "2015_7" : {$avg: "$2015_7"},
        "2015_8" : {$avg: "$2015_8"},
        "2015_9" : {$avg: "$2015_9"},
        "2015_10" : {$avg: "$2015_10"},
        "2015_11" : {$avg: "$2015_11"},
        "2015_12" : {$avg: "$2015_12"},
        "1mth_avg" : {$avg: "$1mth_avg"},
        "2mth_avg" : {$avg: "$2mth_avg"},
        "3mth_avg" : {$avg: "$3mth_avg"},
        "4mth_avg" : {$avg: "$4mth_avg"},
        "5mth_avg" : {$avg: "$5mth_avg"},
        "6mth_avg" : {$avg: "$6mth_avg"},
        "7mth_avg" : {$avg: "$7mth_avg"},
        "8mth_avg" : {$avg: "$8mth_avg"},
        "9mth_avg" : {$avg: "$9mth_avg"},
        "10mth_avg" : {$avg: "$10mth_avg"},
        "11mth_avg" : {$avg: "$11mth_avg"},
        "12mth_avg" : {$avg: "$12mth_avg"}
    }
  },
  { $out : "cerebral_blood_vessel_overalldeath_seoulSouth" }
])
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

var seoulNorth = [
  "11010", "11020", "11030", "11040", "11050",
  "11060", "11070", "11080", "11090", "11100",
  "11110", "11120", "11130", "11140"
]
db.cerebral_blood_vessel_overalldeathsggs.aggregate([
  {
    $match: {
      SGG_CD: {$in: seoulNorth}
    }
  },
  {
    $group: {
        "_id": 2,
        "SD_NM" : {$first: "$SD_NM"},
        "SD_CD" : {$first: "$SD_CD"},
        "SGG_NM" : {$first: "강북"},
        "SGG_CD" : {$first: "11_강북"},
        "beta": {$avg: "$beta"},
        "beta_L": {$avg: "$beta_L"},
        "beta_U": {$avg: "$beta_U"},
        "2012_1" : {$avg: "$2012_1"},
        "2012_2" : {$avg: "$2012_2"},
        "2012_3" : {$avg: "$2012_3"},
        "2012_4" : {$avg: "$2012_4"},
        "2012_5" : {$avg: "$2012_5"},
        "2012_6" : {$avg: "$2012_6"},
        "2012_7" : {$avg: "$2012_7"},
        "2012_8" : {$avg: "$2012_8"},
        "2012_9" : {$avg: "$2012_9"},
        "2012_10" : {$avg: "$2012_10"},
        "2012_11" : {$avg: "$2012_11"},
        "2012_12" : {$avg: "$2012_12"},
        "2013_1" : {$avg: "$2013_1"},
        "2013_2" : {$avg: "$2013_2"},
        "2013_3" : {$avg: "$2013_3"},
        "2013_4" : {$avg: "$2013_4"},
        "2013_5" : {$avg: "$2013_5"},
        "2013_6" : {$avg: "$2013_6"},
        "2013_7" : {$avg: "$2013_7"},
        "2013_8" : {$avg: "$2013_8"},
        "2013_9" : {$avg: "$2013_9"},
        "2013_10" : {$avg: "$2013_10"},
        "2013_11" : {$avg: "$2013_11"},
        "2013_12" : {$avg: "$2013_12"},
        "2014_1" : {$avg: "$2014_1"},
        "2014_2" : {$avg: "$2014_2"},
        "2014_3" : {$avg: "$2014_3"},
        "2014_4" : {$avg: "$2014_4"},
        "2014_5" : {$avg: "$2014_5"},
        "2014_6" : {$avg: "$2014_6"},
        "2014_7" : {$avg: "$2014_7"},
        "2014_8" : {$avg: "$2014_8"},
        "2014_9" : {$avg: "$2014_9"},
        "2014_10" : {$avg: "$2014_10"},
        "2014_11" : {$avg: "$2014_11"},
        "2014_12" : {$avg: "$2014_12"},
        "2015_1" : {$avg: "$2015_1"},
        "2015_2" : {$avg: "$2015_2"},
        "2015_3" : {$avg: "$2015_3"},
        "2015_4" : {$avg: "$2015_4"},
        "2015_5" : {$avg: "$2015_5"},
        "2015_6" : {$avg: "$2015_6"},
        "2015_7" : {$avg: "$2015_7"},
        "2015_8" : {$avg: "$2015_8"},
        "2015_9" : {$avg: "$2015_9"},
        "2015_10" : {$avg: "$2015_10"},
        "2015_11" : {$avg: "$2015_11"},
        "2015_12" : {$avg: "$2015_12"},
        "1mth_avg" : {$avg: "$1mth_avg"},
        "2mth_avg" : {$avg: "$2mth_avg"},
        "3mth_avg" : {$avg: "$3mth_avg"},
        "4mth_avg" : {$avg: "$4mth_avg"},
        "5mth_avg" : {$avg: "$5mth_avg"},
        "6mth_avg" : {$avg: "$6mth_avg"},
        "7mth_avg" : {$avg: "$7mth_avg"},
        "8mth_avg" : {$avg: "$8mth_avg"},
        "9mth_avg" : {$avg: "$9mth_avg"},
        "10mth_avg" : {$avg: "$10mth_avg"},
        "11mth_avg" : {$avg: "$11mth_avg"},
        "12mth_avg" : {$avg: "$12mth_avg"}
    }
  },
  { $out : "cerebral_blood_vessel_overalldeath_seoulNorth" }
])

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

var gungiSouth = [
  "31011", "31012", "31013", "31014", "31021",
  "31022", "31023", "31041", "31042", "31051",
  "31052", "31053", "31060", "31070", 
  "31091", "31092", "31110", "31140", "31150", 
  "31160", "31170", "31180", 
  "31191", "31192", "31193",
  "31210", "31220", "31240", "31250",
  "31320",
  "31380"
]

db.cerebral_blood_vessel_overalldeathsggs.aggregate([
  {
    $match: {
      SGG_CD: {$in: gungiSouth}
    }
  },
  {
    $group: {
        "_id": 3,
        "SD_NM" : {$first: "$SD_NM"},
        "SD_CD" : {$first: "$SD_CD"},
        "SGG_NM" : {$first: "경기남부"},
        "SGG_CD" : {$first: "31_경기남부"},
        "beta": {$avg: "$beta"},
        "beta_L": {$avg: "$beta_L"},
        "beta_U": {$avg: "$beta_U"},
        "2012_1" : {$avg: "$2012_1"},
        "2012_2" : {$avg: "$2012_2"},
        "2012_3" : {$avg: "$2012_3"},
        "2012_4" : {$avg: "$2012_4"},
        "2012_5" : {$avg: "$2012_5"},
        "2012_6" : {$avg: "$2012_6"},
        "2012_7" : {$avg: "$2012_7"},
        "2012_8" : {$avg: "$2012_8"},
        "2012_9" : {$avg: "$2012_9"},
        "2012_10" : {$avg: "$2012_10"},
        "2012_11" : {$avg: "$2012_11"},
        "2012_12" : {$avg: "$2012_12"},
        "2013_1" : {$avg: "$2013_1"},
        "2013_2" : {$avg: "$2013_2"},
        "2013_3" : {$avg: "$2013_3"},
        "2013_4" : {$avg: "$2013_4"},
        "2013_5" : {$avg: "$2013_5"},
        "2013_6" : {$avg: "$2013_6"},
        "2013_7" : {$avg: "$2013_7"},
        "2013_8" : {$avg: "$2013_8"},
        "2013_9" : {$avg: "$2013_9"},
        "2013_10" : {$avg: "$2013_10"},
        "2013_11" : {$avg: "$2013_11"},
        "2013_12" : {$avg: "$2013_12"},
        "2014_1" : {$avg: "$2014_1"},
        "2014_2" : {$avg: "$2014_2"},
        "2014_3" : {$avg: "$2014_3"},
        "2014_4" : {$avg: "$2014_4"},
        "2014_5" : {$avg: "$2014_5"},
        "2014_6" : {$avg: "$2014_6"},
        "2014_7" : {$avg: "$2014_7"},
        "2014_8" : {$avg: "$2014_8"},
        "2014_9" : {$avg: "$2014_9"},
        "2014_10" : {$avg: "$2014_10"},
        "2014_11" : {$avg: "$2014_11"},
        "2014_12" : {$avg: "$2014_12"},
        "2015_1" : {$avg: "$2015_1"},
        "2015_2" : {$avg: "$2015_2"},
        "2015_3" : {$avg: "$2015_3"},
        "2015_4" : {$avg: "$2015_4"},
        "2015_5" : {$avg: "$2015_5"},
        "2015_6" : {$avg: "$2015_6"},
        "2015_7" : {$avg: "$2015_7"},
        "2015_8" : {$avg: "$2015_8"},
        "2015_9" : {$avg: "$2015_9"},
        "2015_10" : {$avg: "$2015_10"},
        "2015_11" : {$avg: "$2015_11"},
        "2015_12" : {$avg: "$2015_12"},
        "1mth_avg" : {$avg: "$1mth_avg"},
        "2mth_avg" : {$avg: "$2mth_avg"},
        "3mth_avg" : {$avg: "$3mth_avg"},
        "4mth_avg" : {$avg: "$4mth_avg"},
        "5mth_avg" : {$avg: "$5mth_avg"},
        "6mth_avg" : {$avg: "$6mth_avg"},
        "7mth_avg" : {$avg: "$7mth_avg"},
        "8mth_avg" : {$avg: "$8mth_avg"},
        "9mth_avg" : {$avg: "$9mth_avg"},
        "10mth_avg" : {$avg: "$10mth_avg"},
        "11mth_avg" : {$avg: "$11mth_avg"},
        "12mth_avg" : {$avg: "$12mth_avg"}
    }
  },
  { $out : "cerebral_blood_vessel_overalldeath_gungiSouth" }
])

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

var gungiNorth = [
  "31030",
  "31080",
  "31101", "31103", "31104",
  "31130",
  "31200",
  "31260", "31270", 
  "31350", "31370",
]

db.cerebral_blood_vessel_overalldeathsggs.aggregate([
  {
    $match: {
      SGG_CD: {$in: gungiNorth}
    }
  },
  {
    $group: {
        "_id": 4,
        "SD_NM" : {$first: "$SD_NM"},
        "SD_CD" : {$first: "$SD_CD"},
        "SGG_NM" : {$first: "경기북부"},
        "SGG_CD" : {$first: "31_경기북부"},
        "beta": {$avg: "$beta"},
        "beta_L": {$avg: "$beta_L"},
        "beta_U": {$avg: "$beta_U"},
        "2012_1" : {$avg: "$2012_1"},
        "2012_2" : {$avg: "$2012_2"},
        "2012_3" : {$avg: "$2012_3"},
        "2012_4" : {$avg: "$2012_4"},
        "2012_5" : {$avg: "$2012_5"},
        "2012_6" : {$avg: "$2012_6"},
        "2012_7" : {$avg: "$2012_7"},
        "2012_8" : {$avg: "$2012_8"},
        "2012_9" : {$avg: "$2012_9"},
        "2012_10" : {$avg: "$2012_10"},
        "2012_11" : {$avg: "$2012_11"},
        "2012_12" : {$avg: "$2012_12"},
        "2013_1" : {$avg: "$2013_1"},
        "2013_2" : {$avg: "$2013_2"},
        "2013_3" : {$avg: "$2013_3"},
        "2013_4" : {$avg: "$2013_4"},
        "2013_5" : {$avg: "$2013_5"},
        "2013_6" : {$avg: "$2013_6"},
        "2013_7" : {$avg: "$2013_7"},
        "2013_8" : {$avg: "$2013_8"},
        "2013_9" : {$avg: "$2013_9"},
        "2013_10" : {$avg: "$2013_10"},
        "2013_11" : {$avg: "$2013_11"},
        "2013_12" : {$avg: "$2013_12"},
        "2014_1" : {$avg: "$2014_1"},
        "2014_2" : {$avg: "$2014_2"},
        "2014_3" : {$avg: "$2014_3"},
        "2014_4" : {$avg: "$2014_4"},
        "2014_5" : {$avg: "$2014_5"},
        "2014_6" : {$avg: "$2014_6"},
        "2014_7" : {$avg: "$2014_7"},
        "2014_8" : {$avg: "$2014_8"},
        "2014_9" : {$avg: "$2014_9"},
        "2014_10" : {$avg: "$2014_10"},
        "2014_11" : {$avg: "$2014_11"},
        "2014_12" : {$avg: "$2014_12"},
        "2015_1" : {$avg: "$2015_1"},
        "2015_2" : {$avg: "$2015_2"},
        "2015_3" : {$avg: "$2015_3"},
        "2015_4" : {$avg: "$2015_4"},
        "2015_5" : {$avg: "$2015_5"},
        "2015_6" : {$avg: "$2015_6"},
        "2015_7" : {$avg: "$2015_7"},
        "2015_8" : {$avg: "$2015_8"},
        "2015_9" : {$avg: "$2015_9"},
        "2015_10" : {$avg: "$2015_10"},
        "2015_11" : {$avg: "$2015_11"},
        "2015_12" : {$avg: "$2015_12"},
        "1mth_avg" : {$avg: "$1mth_avg"},
        "2mth_avg" : {$avg: "$2mth_avg"},
        "3mth_avg" : {$avg: "$3mth_avg"},
        "4mth_avg" : {$avg: "$4mth_avg"},
        "5mth_avg" : {$avg: "$5mth_avg"},
        "6mth_avg" : {$avg: "$6mth_avg"},
        "7mth_avg" : {$avg: "$7mth_avg"},
        "8mth_avg" : {$avg: "$8mth_avg"},
        "9mth_avg" : {$avg: "$9mth_avg"},
        "10mth_avg" : {$avg: "$10mth_avg"},
        "11mth_avg" : {$avg: "$11mth_avg"},
        "12mth_avg" : {$avg: "$12mth_avg"}
    }
  },
  { $out : "cerebral_blood_vessel_overalldeath_gungiNorth" }
])

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////


// mongoexport -d pmhealth -c cerebral_blood_vessel_overalldeath_seoulSouth --out cerebral_blood_vessel_overalldeath_seoulSouth.json
// mongoexport -d pmhealth -c cerebral_blood_vessel_overalldeath_seoulNorth --out cerebral_blood_vessel_overalldeath_seoulNorth.json
// mongoexport -d pmhealth -c cerebral_blood_vessel_overalldeath_gungiSouth --out cerebral_blood_vessel_overalldeath_gungiSouth.json
// mongoexport -d pmhealth -c cerebral_blood_vessel_overalldeath_gungiNorth --out cerebral_blood_vessel_overalldeath_gungiNorth.json
// mongoexport -d pmhealth -c cerebral_blood_vessel_overalldeathsds -q '{"SGG_CD": {"$in": ["23000", "22000", "21000"]}}' --out cerebral_blood_vessel_overalldeath_extra.json

// mongoimport -d pmhealth -c cerebral_blood_vessel_overalldeathsggs --file cerebral_blood_vessel_overalldeath_seoulSouth.json
// mongoimport -d pmhealth -c cerebral_blood_vessel_overalldeathsggs --file cerebral_blood_vessel_overalldeath_seoulNorth.json
// mongoimport -d pmhealth -c cerebral_blood_vessel_overalldeathsggs --file cerebral_blood_vessel_overalldeath_gungiSouth.json
// mongoimport -d pmhealth -c cerebral_blood_vessel_overalldeathsggs --file cerebral_blood_vessel_overalldeath_gungiNorth.json
// mongoimport -d pmhealth -c cerebral_blood_vessel_overalldeathsggs --file cerebral_blood_vessel_overalldeath_extra.json


// mongoexport -d pmhealth -c cerebral_blood_vessel_overalldeathsggs --out 20181226_cerebral_blood_vessel_overalldeathsggs.json