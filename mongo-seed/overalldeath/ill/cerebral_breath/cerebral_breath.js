// 행정구역 코드 삽입 (몽고쉘에서)
db.districts.find().forEach(function(d){
  db.cerebral_breath_overalldeathsggs.update({SD_NM: d.SD_NM, SGG_NM: d.SGG_NM}, {$set: {SD_CD: d.SD_CD, SGG_CD: d.SGG_CD}})  
})


codeToSD.forEach(function(cd){
  db.cerebral_breath_overalldeathsggs.aggregate([
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
    { $out : cd.SD_CD + "cerebral_breath_overalldeathsds" }
  ])
})

// mongoexport -d pmhealth -c 11cerebral_breath_overalldeathds --out 11cerebral_breath_overalldeathsds.json
// mongoexport -d pmhealth -c 21cerebral_breath_overalldeathds --out 21cerebral_breath_overalldeathsds.json
// mongoexport -d pmhealth -c 22cerebral_breath_overalldeathds --out 22cerebral_breath_overalldeathsds.json
// mongoexport -d pmhealth -c 23cerebral_breath_overalldeathds --out 23cerebral_breath_overalldeathsds.json
// mongoexport -d pmhealth -c 24cerebral_breath_overalldeathds --out 24cerebral_breath_overalldeathsds.json
// mongoexport -d pmhealth -c 25cerebral_breath_overalldeathds --out 25cerebral_breath_overalldeathsds.json
// mongoexport -d pmhealth -c 26cerebral_breath_overalldeathds --out 26cerebral_breath_overalldeathsds.json
// mongoexport -d pmhealth -c 29cerebral_breath_overalldeathds --out 29cerebral_breath_overalldeathsds.json
// mongoexport -d pmhealth -c 31cerebral_breath_overalldeathds --out 31cerebral_breath_overalldeathsds.json
// mongoexport -d pmhealth -c 32cerebral_breath_overalldeathds --out 32cerebral_breath_overalldeathsds.json
// mongoexport -d pmhealth -c 33cerebral_breath_overalldeathds --out 33cerebral_breath_overalldeathsds.json
// mongoexport -d pmhealth -c 34cerebral_breath_overalldeathds --out 34cerebral_breath_overalldeathsds.json
// mongoexport -d pmhealth -c 35cerebral_breath_overalldeathds --out 35cerebral_breath_overalldeathsds.json
// mongoexport -d pmhealth -c 36cerebral_breath_overalldeathds --out 36cerebral_breath_overalldeathsds.json
// mongoexport -d pmhealth -c 37cerebral_breath_overalldeathds --out 37cerebral_breath_overalldeathsds.json
// mongoexport -d pmhealth -c 38cerebral_breath_overalldeathds --out 38cerebral_breath_overalldeathsds.json
// mongoexport -d pmhealth -c 39cerebral_breath_overalldeathds --out 39cerebral_breath_overalldeathsds.json

// mongoimport -d pmhealth -c cerebral_breath_overalldeathsds --file 11cerebral_breath_overalldeathsds.json
// mongoimport -d pmhealth -c cerebral_breath_overalldeathsds --file 21cerebral_breath_overalldeathsds.json
// mongoimport -d pmhealth -c cerebral_breath_overalldeathsds --file 22cerebral_breath_overalldeathsds.json
// mongoimport -d pmhealth -c cerebral_breath_overalldeathsds --file 23cerebral_breath_overalldeathsds.json
// mongoimport -d pmhealth -c cerebral_breath_overalldeathsds --file 24cerebral_breath_overalldeathsds.json
// mongoimport -d pmhealth -c cerebral_breath_overalldeathsds --file 25cerebral_breath_overalldeathsds.json
// mongoimport -d pmhealth -c cerebral_breath_overalldeathsds --file 26cerebral_breath_overalldeathsds.json
// mongoimport -d pmhealth -c cerebral_breath_overalldeathsds --file 29cerebral_breath_overalldeathsds.json
// mongoimport -d pmhealth -c cerebral_breath_overalldeathsds --file 31cerebral_breath_overalldeathsds.json
// mongoimport -d pmhealth -c cerebral_breath_overalldeathsds --file 32cerebral_breath_overalldeathsds.json
// mongoimport -d pmhealth -c cerebral_breath_overalldeathsds --file 33cerebral_breath_overalldeathsds.json
// mongoimport -d pmhealth -c cerebral_breath_overalldeathsds --file 34cerebral_breath_overalldeathsds.json
// mongoimport -d pmhealth -c cerebral_breath_overalldeathsds --file 35cerebral_breath_overalldeathsds.json
// mongoimport -d pmhealth -c cerebral_breath_overalldeathsds --file 36cerebral_breath_overalldeathsds.json
// mongoimport -d pmhealth -c cerebral_breath_overalldeathsds --file 37cerebral_breath_overalldeathsds.json
// mongoimport -d pmhealth -c cerebral_breath_overalldeathsds --file 38cerebral_breath_overalldeathsds.json
// mongoimport -d pmhealth -c cerebral_breath_overalldeathsds --file 39cerebral_breath_overalldeathsds.json

// mongoexport -d pmhealth -c cerebral_breath_overalldeathsds --out cerebral_breath_overalldeathsds.json
// mongoexport -d pmhealth -c cerebral_breath_overalldeathsggs --out cerebral_breath_overalldeathsggs.json



// docker run --rm --link 8357bf2a0801:mongo --net pmhealthmevn_default -v /home/dave/app/pmhealth-mevn/mongo-seed:/data/add mongo bash -c 'mongoimport -d pmhealth -c female_overalldeathsggs --file /data/add/overalldeath/female/female_overalldeathsggs.json --host mongo:27017'
// docker run --rm --link 8357bf2a0801:mongo --net pmhealthmevn_default -v /home/dave/app/pmhealth-mevn/mongo-seed:/data/add mongo bash -c 'mongoimport -d pmhealth -c female_overalldeathsds --file /data/add/overalldeath/female/female_overalldeathsds.json --host mongo:27017'
// docker run --rm --link 8357bf2a0801:mongo --net pmhealthmevn_default -v /home/dave/app/pmhealth-mevn/mongo-seed:/data/add mongo bash -c 'mongoimport -d pmhealth -c male_overalldeathsggs --file /data/add/overalldeath/male/male_overalldeathsggs.json --host mongo:27017'
// docker run --rm --link 8357bf2a0801:mongo --net pmhealthmevn_default -v /home/dave/app/pmhealth-mevn/mongo-seed:/data/add mongo bash -c 'mongoimport -d pmhealth -c male_overalldeathsds --file /data/add/overalldeath/male/male_overalldeathsds.json --host mongo:27017'

// docker run --rm --link 0e31d8d9074f:mongo --net pmhealthmevn_default -v /home/dave/app/pmhealth-mevn/mongo-seed:/data/add mongo bash -c 'mongoimport -d pmhealth -c cerebral_breath_overalldeathsds --file /data/add/overalldeath/ill/cerebral_breath_overalldeathsds.json --host mongo:27017'
// docker run --rm --link 0e31d8d9074f:mongo --net pmhealthmevn_default -v /home/dave/app/pmhealth-mevn/mongo-seed:/data/add mongo bash -c 'mongoimport -d pmhealth -c cerebral_breath_overalldeathsggs --file /data/add/overalldeath/ill/cerebral_breath_overalldeathsggs.json --host mongo:27017'



//// 경기남부 ,북부, 강남, 강북, 대구, 부산, 인천
//몽고 쉘에서 데이터 생성 -->  mongoexport --> mongoimport

// const Pm2_5Sgg = require('../../models/pm2_5/sgg');

////////////////////////////////////////////////////////////////////////////////////
var seoulSouth = [
  "11150", "11160", "11170", "11180", "11190",
  "11200", "11210", "11220", "11230", "11240",
  "11250"
]

db.cerebral_breath_overalldeathsggs.aggregate([
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
  { $out : "cerebral_breath_overalldeath_seoulSouth" }
])
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

var seoulNorth = [
  "11010", "11020", "11030", "11040", "11050",
  "11060", "11070", "11080", "11090", "11100",
  "11110", "11120", "11130", "11140"
]
db.cerebral_breath_overalldeathsggs.aggregate([
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
  { $out : "cerebral_breath_overalldeath_seoulNorth" }
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

db.cerebral_breath_overalldeathsggs.aggregate([
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
  { $out : "cerebral_breath_overalldeath_gungiSouth" }
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

db.cerebral_breath_overalldeathsggs.aggregate([
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
  { $out : "cerebral_breath_overalldeath_gungiNorth" }
])

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////


// mongoexport -d pmhealth -c cerebral_breath_overalldeath_seoulSouth --out cerebral_breath_overalldeath_seoulSouth.json
// mongoexport -d pmhealth -c cerebral_breath_overalldeath_seoulNorth --out cerebral_breath_overalldeath_seoulNorth.json
// mongoexport -d pmhealth -c cerebral_breath_overalldeath_gungiSouth --out cerebral_breath_overalldeath_gungiSouth.json
// mongoexport -d pmhealth -c cerebral_breath_overalldeath_gungiNorth --out cerebral_breath_overalldeath_gungiNorth.json
// mongoexport -d pmhealth -c cerebral_breath_overalldeathsds -q '{"SGG_CD": {"$in": ["23000", "22000", "21000"]}}' --out cerebral_breath_overalldeath_extra.json

// mongoimport -d pmhealth -c cerebral_breath_overalldeathsggs --file cerebral_breath_overalldeath_seoulSouth.json
// mongoimport -d pmhealth -c cerebral_breath_overalldeathsggs --file cerebral_breath_overalldeath_seoulNorth.json
// mongoimport -d pmhealth -c cerebral_breath_overalldeathsggs --file cerebral_breath_overalldeath_gungiSouth.json
// mongoimport -d pmhealth -c cerebral_breath_overalldeathsggs --file cerebral_breath_overalldeath_gungiNorth.json
// mongoimport -d pmhealth -c cerebral_breath_overalldeathsggs --file cerebral_breath_overalldeath_extra.json


// mongoexport -d pmhealth -c cerebral_breath_overalldeathsggs --out 20181226_cerebral_breath_overalldeathsggs.json

