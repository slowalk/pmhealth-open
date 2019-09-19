// 행정구역 코드 삽입 (몽고쉘에서)
db.districts.find().forEach(function(d){
  db.male_overalldeathsggs.update({SD_NM: d.SD_NM, SGG_NM: d.SGG_NM}, {$set: {SD_CD: d.SD_CD, SGG_CD: d.SGG_CD}})  
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

// mongoexport -d pmhealth -c 11male_overalldeathsds --out 11male_overalldeathsds.json
// mongoexport -d pmhealth -c 21male_overalldeathsds --out 21male_overalldeathsds.json
// mongoexport -d pmhealth -c 22male_overalldeathsds --out 22male_overalldeathsds.json
// mongoexport -d pmhealth -c 23male_overalldeathsds --out 23male_overalldeathsds.json
// mongoexport -d pmhealth -c 24male_overalldeathsds --out 24male_overalldeathsds.json
// mongoexport -d pmhealth -c 25male_overalldeathsds --out 25male_overalldeathsds.json
// mongoexport -d pmhealth -c 26male_overalldeathsds --out 26male_overalldeathsds.json
// mongoexport -d pmhealth -c 29male_overalldeathsds --out 29male_overalldeathsds.json
// mongoexport -d pmhealth -c 31male_overalldeathsds --out 31male_overalldeathsds.json
// mongoexport -d pmhealth -c 32male_overalldeathsds --out 32male_overalldeathsds.json
// mongoexport -d pmhealth -c 33male_overalldeathsds --out 33male_overalldeathsds.json
// mongoexport -d pmhealth -c 34male_overalldeathsds --out 34male_overalldeathsds.json
// mongoexport -d pmhealth -c 35male_overalldeathsds --out 35male_overalldeathsds.json
// mongoexport -d pmhealth -c 36male_overalldeathsds --out 36male_overalldeathsds.json
// mongoexport -d pmhealth -c 37male_overalldeathsds --out 37male_overalldeathsds.json
// mongoexport -d pmhealth -c 38male_overalldeathsds --out 38male_overalldeathsds.json
// mongoexport -d pmhealth -c 39male_overalldeathsds --out 39male_overalldeathsds.json

// mongoimport -d pmhealth -c male_overalldeathsds --file 11male_overalldeathsds.json
// mongoimport -d pmhealth -c male_overalldeathsds --file 21male_overalldeathsds.json
// mongoimport -d pmhealth -c male_overalldeathsds --file 22male_overalldeathsds.json
// mongoimport -d pmhealth -c male_overalldeathsds --file 23male_overalldeathsds.json
// mongoimport -d pmhealth -c male_overalldeathsds --file 24male_overalldeathsds.json
// mongoimport -d pmhealth -c male_overalldeathsds --file 25male_overalldeathsds.json
// mongoimport -d pmhealth -c male_overalldeathsds --file 26male_overalldeathsds.json
// mongoimport -d pmhealth -c male_overalldeathsds --file 29male_overalldeathsds.json
// mongoimport -d pmhealth -c male_overalldeathsds --file 31male_overalldeathsds.json
// mongoimport -d pmhealth -c male_overalldeathsds --file 32male_overalldeathsds.json
// mongoimport -d pmhealth -c male_overalldeathsds --file 33male_overalldeathsds.json
// mongoimport -d pmhealth -c male_overalldeathsds --file 34male_overalldeathsds.json
// mongoimport -d pmhealth -c male_overalldeathsds --file 35male_overalldeathsds.json
// mongoimport -d pmhealth -c male_overalldeathsds --file 36male_overalldeathsds.json
// mongoimport -d pmhealth -c male_overalldeathsds --file 37male_overalldeathsds.json
// mongoimport -d pmhealth -c male_overalldeathsds --file 38male_overalldeathsds.json
// mongoimport -d pmhealth -c male_overalldeathsds --file 39male_overalldeathsds.json

// 행정구역 코드 삽입 (몽고쉘에서)
codeToSD.forEach(function(cd){
  db.male_overalldeathsggs.aggregate([
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
    {"$out": cd.SD_CD + "male_overalldeathsds"}
  ])
})

codeToSD.forEach(function(cd){
  db.female_overalldeathsggs.aggregate([
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
    { $out : cd.SD_CD + "female_overalldeathsds" }
  ])
})

// mongoexport -d pmhealth -c 11female_overalldeathsds --out 11female_overalldeathsds.json
// mongoexport -d pmhealth -c 21female_overalldeathsds --out 21female_overalldeathsds.json
// mongoexport -d pmhealth -c 22female_overalldeathsds --out 22female_overalldeathsds.json
// mongoexport -d pmhealth -c 23female_overalldeathsds --out 23female_overalldeathsds.json
// mongoexport -d pmhealth -c 24female_overalldeathsds --out 24female_overalldeathsds.json
// mongoexport -d pmhealth -c 25female_overalldeathsds --out 25female_overalldeathsds.json
// mongoexport -d pmhealth -c 26female_overalldeathsds --out 26female_overalldeathsds.json
// mongoexport -d pmhealth -c 29female_overalldeathsds --out 29female_overalldeathsds.json
// mongoexport -d pmhealth -c 31female_overalldeathsds --out 31female_overalldeathsds.json
// mongoexport -d pmhealth -c 32female_overalldeathsds --out 32female_overalldeathsds.json
// mongoexport -d pmhealth -c 33female_overalldeathsds --out 33female_overalldeathsds.json
// mongoexport -d pmhealth -c 34female_overalldeathsds --out 34female_overalldeathsds.json
// mongoexport -d pmhealth -c 35female_overalldeathsds --out 35female_overalldeathsds.json
// mongoexport -d pmhealth -c 36female_overalldeathsds --out 36female_overalldeathsds.json
// mongoexport -d pmhealth -c 37female_overalldeathsds --out 37female_overalldeathsds.json
// mongoexport -d pmhealth -c 38female_overalldeathsds --out 38female_overalldeathsds.json
// mongoexport -d pmhealth -c 39female_overalldeathsds --out 39female_overalldeathsds.json

// mongoimport -d pmhealth -c female_overalldeathsds --file 11female_overalldeathsds.json
// mongoimport -d pmhealth -c female_overalldeathsds --file 21female_overalldeathsds.json
// mongoimport -d pmhealth -c female_overalldeathsds --file 22female_overalldeathsds.json
// mongoimport -d pmhealth -c female_overalldeathsds --file 23female_overalldeathsds.json
// mongoimport -d pmhealth -c female_overalldeathsds --file 24female_overalldeathsds.json
// mongoimport -d pmhealth -c female_overalldeathsds --file 25female_overalldeathsds.json
// mongoimport -d pmhealth -c female_overalldeathsds --file 26female_overalldeathsds.json
// mongoimport -d pmhealth -c female_overalldeathsds --file 29female_overalldeathsds.json
// mongoimport -d pmhealth -c female_overalldeathsds --file 31female_overalldeathsds.json
// mongoimport -d pmhealth -c female_overalldeathsds --file 32female_overalldeathsds.json
// mongoimport -d pmhealth -c female_overalldeathsds --file 33female_overalldeathsds.json
// mongoimport -d pmhealth -c female_overalldeathsds --file 34female_overalldeathsds.json
// mongoimport -d pmhealth -c female_overalldeathsds --file 35female_overalldeathsds.json
// mongoimport -d pmhealth -c female_overalldeathsds --file 36female_overalldeathsds.json
// mongoimport -d pmhealth -c female_overalldeathsds --file 37female_overalldeathsds.json
// mongoimport -d pmhealth -c female_overalldeathsds --file 38female_overalldeathsds.json
// mongoimport -d pmhealth -c female_overalldeathsds --file 39female_overalldeathsds.json

// mongoexport -d pmhealth -c female_overalldeathsds --out female_overalldeathsds.json
// mongoexport -d pmhealth -c female_overalldeathsggs --out female_overalldeathsggs.json
// mongoexport -d pmhealth -c male_overalldeathsds --out male_overalldeathsds.json
// mongoexport -d pmhealth -c male_overalldeathsggs --out male_overalldeathsggs.json


// 시군구 데이터에서 시도별 데이터 뽑기
// 행정구역 코드 삽입 (몽고쉘에서)

db.overalldeathsggs_dump.find().forEach(function(od){
  db.overalldeathsggs.update(
    {
      SD_NM: od.SD_NM, SGG_NM: od.SGG_NM
    },
    {
      $set: {
        SD_CD: od.SD_CD,
        SGG_CD: od.SGG_CD
      }
    }
  )
})

codeToSD.forEach(function(cd){
  db.overalldeathsggs.aggregate([
    {$match: {SD_NM: cd.SD_NM}},
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
    {"$out": cd.SD_CD + "overalldeathsds"}
  ])
})
// mongoexport -d pmhealth -c 11overalldeathsds --out 11overalldeathsds.json
// mongoexport -d pmhealth -c 21overalldeathsds --out 21overalldeathsds.json
// mongoexport -d pmhealth -c 22overalldeathsds --out 22overalldeathsds.json
// mongoexport -d pmhealth -c 23overalldeathsds --out 23overalldeathsds.json
// mongoexport -d pmhealth -c 24overalldeathsds --out 24overalldeathsds.json
// mongoexport -d pmhealth -c 25overalldeathsds --out 25overalldeathsds.json
// mongoexport -d pmhealth -c 26overalldeathsds --out 26overalldeathsds.json
// mongoexport -d pmhealth -c 29overalldeathsds --out 29overalldeathsds.json
// mongoexport -d pmhealth -c 31overalldeathsds --out 31overalldeathsds.json
// mongoexport -d pmhealth -c 32overalldeathsds --out 32overalldeathsds.json
// mongoexport -d pmhealth -c 33overalldeathsds --out 33overalldeathsds.json
// mongoexport -d pmhealth -c 34overalldeathsds --out 34overalldeathsds.json
// mongoexport -d pmhealth -c 35overalldeathsds --out 35overalldeathsds.json
// mongoexport -d pmhealth -c 36overalldeathsds --out 36overalldeathsds.json
// mongoexport -d pmhealth -c 37overalldeathsds --out 37overalldeathsds.json
// mongoexport -d pmhealth -c 38overalldeathsds --out 38overalldeathsds.json
// mongoexport -d pmhealth -c 39overalldeathsds --out 39overalldeathsds.json

// mongoimport -d pmhealth -c overalldeathsds --file 11overalldeathsds.json
// mongoimport -d pmhealth -c overalldeathsds --file 21overalldeathsds.json
// mongoimport -d pmhealth -c overalldeathsds --file 22overalldeathsds.json
// mongoimport -d pmhealth -c overalldeathsds --file 23overalldeathsds.json
// mongoimport -d pmhealth -c overalldeathsds --file 24overalldeathsds.json
// mongoimport -d pmhealth -c overalldeathsds --file 25overalldeathsds.json
// mongoimport -d pmhealth -c overalldeathsds --file 26overalldeathsds.json
// mongoimport -d pmhealth -c overalldeathsds --file 29overalldeathsds.json
// mongoimport -d pmhealth -c overalldeathsds --file 31overalldeathsds.json
// mongoimport -d pmhealth -c overalldeathsds --file 32overalldeathsds.json
// mongoimport -d pmhealth -c overalldeathsds --file 33overalldeathsds.json
// mongoimport -d pmhealth -c overalldeathsds --file 34overalldeathsds.json
// mongoimport -d pmhealth -c overalldeathsds --file 35overalldeathsds.json
// mongoimport -d pmhealth -c overalldeathsds --file 36overalldeathsds.json
// mongoimport -d pmhealth -c overalldeathsds --file 37overalldeathsds.json
// mongoimport -d pmhealth -c overalldeathsds --file 38overalldeathsds.json
// mongoimport -d pmhealth -c overalldeathsds --file 39overalldeathsds.json

// mongoexport -d pmhealth -c overalldeathsds --out overalldeathsds.json