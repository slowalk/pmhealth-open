const express = require('express');
const router = express.Router();
const axios = require('axios');
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

const FineDustSd = require('../../models/openapi/fine_dust_sd');
const FineDustSgg = require('../../models/openapi/fine_dust_sgg');
const Districts = require('../../models/districts');

const SD_ENM_TRANS = [
  {SD_ENM: "seoul", SD_NM: "서울특별시", SD_CD: "11"},
  {SD_ENM: "busan", SD_NM: "부산광역시", SD_CD: "21"},
  {SD_ENM: "daegu", SD_NM: "대구광역시", SD_CD: "22"},
  {SD_ENM: "incheon", SD_NM: "인천광역시", SD_CD: "23"},
  {SD_ENM: "daejeon", SD_NM: "대전광역시", SD_CD: "25"},
  {SD_ENM: "gwangju", SD_NM: "광주광역시", SD_CD: "24"},
  {SD_ENM: "ulsan", SD_NM: "울산광역시", SD_CD: "26"},
  {SD_ENM: "sejong", SD_NM: "세종특별자치시", SD_CD: "29"},
  {SD_ENM: "gyeonggi", SD_NM: "경기도", SD_CD: "31"},
  {SD_ENM: "gangwon", SD_NM: "강원도", SD_CD: "32"},
  {SD_ENM: "chungbuk", SD_NM: "충청북도", SD_CD: "33"},
  {SD_ENM: "chungnam", SD_NM: "충청남도", SD_CD: "34"},
  {SD_ENM: "jeonbuk", SD_NM: "전라북도", SD_CD: "35"},
  {SD_ENM: "jeonnam", SD_NM: "전라남도", SD_CD: "36"},
  {SD_ENM: "gyeongbuk", SD_NM: "경상북도", SD_CD: "37"},
  {SD_ENM: "gyeongnam", SD_NM: "경상남도", SD_CD: "38"},
  {SD_ENM: "jeju", SD_NM: "제주특별자치도", SD_CD: "39"},
]


router.get('/sd', (req, res, next) => {
  const SD_CD = req.query.SD_CD,
        // dataTime = moment().format('YYYY-MM-DD');
        dataTime = moment().format('HH') == '00' ? moment().subtract(1, 'days').format('YYYY-MM-DD 24:00') : moment().format('YYYY-MM-DD HH:00')
  checkSdFineDustData(SD_CD, dataTime)
    .then(result => {
      if(result.first) {
        // // 결과값이 없을때(처음 생성시)
        initSdFineDustData()
          .then(()=>{
            getSdFineDustData(SD_CD, dataTime)
              .then((r)=>{
                if(!r) return res.json({success: false})
                res.json({
                  success: true,
                  district_nm: r.SD_NM,
                  pm2_5: r.pm2_5,
                  pm10: r.pm10,
                  no2: r.no2
                });
              })
              .catch(err=>console.log("err : ", err));
          })
          .catch(err=>console.log("err : ", err));
      } else if(result.value) {
        // // 과거 데이터의 데이터 시간이 현재 시간과 같거나 차이가 별로 없을때(적절한 값이 있을때)
        res.json({
          success: true,
          district_nm: result.value.SD_NM,
          pm2_5: result.value.pm2_5,
          pm10: result.value.pm10,
          no2: result.value.no2
        });
      } else if(result.update){
        // // 과거 데이터가 있으나 현재 시간보다 1시간 이상 차이날때 - 업데이트가 필요할때
        FineDustSd.remove({}, (err, removed)=>{
          initSdFineDustData()
            .then(()=>{
              getSdFineDustData(SD_CD, dataTime)
                .then((r)=>{
                  if(!r) return res.json({success: false})
                  
                  res.json({
                    success: true,
                    district_nm: r.SD_NM,
                    pm2_5: r.pm2_5,
                    pm10: r.pm10,
                    no2: r.no2
                  });
                })
                .catch(err=>console.log("err : ", err));
            })
            .catch(err=>console.log("err : ", err));
        });
      }
    });
});


function district_nm_filter (t) {
  if (t == "경상북도") return "경북";
  else if (t == "경상남도") return "경남";
  else if (t == "충청북도") return "충북";
  else if (t == "충청남도") return "충남";
  else if (t == "전라남도") return "전남";
  else if (t == "전라북도") return "전북";
  else return t.substring(0,2);
}

function getSdFineDustData (SD_CD, dataTime) {
  return new Promise((resolve, reject) => {
    FineDustSd.findOne({SD_CD}).exec((err, result)=> {
      
      if (err) return console.log('err : ', err);
      resolve(result);
    })
  })
}

function checkSdFineDustData (SD_CD, dataTime) {
  return new Promise((resolve, reject)=>{
    FineDustSd.findOne({SD_CD}).exec((err, result)=> {
      if (err) return console.log('err : ', err);
      if(result) console.log('result.dataTime : ', result.dataTime)
      let duration, hours;
      if(result) {
        duration = moment.duration(moment(dataTime).diff(moment(result.dataTime)));
        hours = duration.asHours();
      }

      if(!result) {
        // // 결과값이 없을때(처음 생성시)
        resolve({first: true});
      } else if(result && hours <= 1) {
        // // 과거 데이터의 데이터 시간이 현재 시간과 같거나 차이가 별로 없을때(적절한 값이 있을때)
        resolve({value: result});
      } else if(result && hours >= 1) {
        // // 과거 데이터가 있으나 현재 시간보다 1시간 이상 차이날때 - 업데이트가 필요할때
        resolve({update: true});
      }
    })
  })
}

function initSdFineDustData () {
  return new Promise((resolve, reject)=>{

    const date = moment().format('YYYY-MM-DD'),
          url = 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnMesureLIst',
          defaultParams = {
            dataGubun: "HOUR",
            pageNo: 1,
            numOfRows: 100,
            searchCondition: "WEEK",
            _returnType: "json",
            searchDate: date,
            ServiceKey: "uli5s4YKkNamXssKH/D2OiSV4AJrpTxKUybRCPVw8a3a3yxKNo5PZMQVb4HBDqLeaYXLxV1r147EcFhRkPiBLg=="
          }

    const getPm2_5 = axios.get(url, { params: {itemCode: "PM25", ...defaultParams} }),
          getPm10 = axios.get(url, { params: {itemCode: "PM10", ...defaultParams} }),
          getNo2 = axios.get(url, { params: {itemCode: "NO2", ...defaultParams} });

    Promise.all([ getPm2_5, getPm10, getNo2])
        .then(values=>{
          SD_ENM_TRANS.map(s=>{
            new FineDustSd({
              SD_ENM: s.SD_ENM, 
              SD_NM: s.SD_NM,
              SD_CD: s.SD_CD,
              pm2_5: values[0].data.list[0][s.SD_ENM],
              pm10: values[1].data.list[0][s.SD_ENM],
              no2: values[2].data.list[0][s.SD_ENM],
              dataTime: values[0].data.list[0].dataTime
            }).save();
          });
          resolve();
        });
  });
}



router.get('/sgg', (req, res, next) => {
  const query = req.query,
        dataTime = moment().format('HH') == '00' ? moment().subtract(1, 'days').format('YYYY-MM-DD 24:00') : moment().format('YYYY-MM-DD HH:00')
  checkSggFineDustData(query, dataTime)
    .then(result => {
      if(result.first) { // 아예 해당 시도지역 데이터가 없을때
        initSggFineDustData(query, dataTime)
          .then(()=>{
            getSggFineDustData(query, dataTime)
              .then((r)=>{
                if(!r) return res.json({success: false})
                const district_nm = r.SD_NM + " " + query.SGG_NM;
                
                res.json({
                  success: true,
                  district_nm,
                  pm2_5: r.pm2_5,
                  pm10: r.pm10,
                  no2: r.no2
                });
              })
          })
          .catch(err=>console.log("err : ", err));
        
      } else if(result.value == null && !result.update) { // 해당 지역값이 없을 때
        res.json({
          success: true,
          district_nm: "-",
          pm2_5: "-",
          pm10: "-",
          no2: "-"
        });
      } else if(result.value) { // 과거 데이터의 데이터 시간이 현재 시간과 같거나 차이가 별로 없을때(적절한 값이 있을때)
        res.json({
          success: true,
          district_nm: result.value.SD_NM + " " + result.value.SGG_NM,
          pm2_5: result.value.pm2_5,
          pm10: result.value.pm10,
          no2: result.value.no2
        });
      } else if (result.update == true){ // 데이터 업데이트가 필요할때
        FineDustSgg.remove({SD_CD: query.SD_CD}, (err,removed)=> {
          if(err) return console.log('err : ', err);
          initSggFineDustData(query, dataTime)
            .then(()=>{
              getSggFineDustData(query, dataTime)
                .then((r)=>{
                  // console.log("r : ", r)
                  if(!r) return res.json({success: false})
                  const district_nm = r.SD_NM + " " + query.SGG_NM;
                  
                  res.json({
                    success: true,
                    district_nm,
                    pm2_5: r.pm2_5,
                    pm10: r.pm10,
                    no2: r.no2
                  });
                }).catch(err=>console.log("err : ", err));
            })
            .catch(err=>console.log("err : ", err));
        });
      }
    });
});

function getSggFineDustData (query, dataTime) {
  return new Promise((resolve, reject) => {
    Districts.findOne({
      // SGG_NM: { $regex: query.SGG_NM}, 
      SGG_CD: query.SGG_CD
    }).exec((er, district) => {
      if (!district) return reject(console.log('district none'));
      if (er) return reject(console.log('er : ', er));
      FineDustSgg.findOne({SGG_NM: checkSggNameFilter(district.SGG_NM), SD_CD: query.SD_CD}).exec((err, result)=> {
        if (err) return reject(console.log('err : ', err));
        // console.log("getSggFineDustData result : ", result)
        resolve(result);
      });
    })
  })
}

function checkSggFineDustData (query, dataTime) {
  return new Promise((resolve, reject)=>{
    FineDustSgg.findOne({SD_CD: query.SD_CD}).exec((er, results)=>{
      if(er) return console.log('er : ', er);
      if(!results) {
        // // 결과값이 없을때(처음 생성시)
        resolve({first: true});
      } else {
        FineDustSgg.findOne({SGG_NM: checkSggNameFilter(query.SGG_NM), SD_CD: query.SD_CD}).exec((err, result)=> {
          if(err) return console.log('err : ', err);
          if(result) console.log('result.dataTime : ', result.dataTime)

          let duration, hours;
          if(result) {
            duration = moment.duration(moment(dataTime).diff(moment(result.dataTime)));
            hours = duration.asHours();
          }

          if(!result) {
            // // 해당 시도에 값이 없을때(시군구 중 없는곳도 있음)
            resolve({value: null});
          } else if (hours <= 1) {
            // // 과거 데이터의 데이터 시간이 현재 시간과 같거나 차이가 별로 없을때(적절한 값이 있을때)
            resolve({value: result});
          } else if (hours >= 1) {
            // // 과거 데이터가 있으나 현재 시간보다 1시간 이상 차이날때 - 업데이트가 필요할때
            resolve({update: true});
          }
        });
      }
    })
  });
}

function initSggFineDustData (query, dataTime) {
  return new Promise((resolve, reject)=>{
    const url = 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnMesureSidoLIst',
          defaultParams = {
            pageNo: 1,
            numOfRows: 100,
            searchCondition: "HOUR",
            _returnType: "json",
            ServiceKey: "uli5s4YKkNamXssKH/D2OiSV4AJrpTxKUybRCPVw8a3a3yxKNo5PZMQVb4HBDqLeaYXLxV1r147EcFhRkPiBLg=="
          },
          short_SD_NM = district_nm_filter(query.SD_NM);
    
    axios.get(url, { params: {sidoName: short_SD_NM, ...defaultParams} })
          .then(res=>{
            const results = res.data.list,
                  fixedTime = results[0].dataTime
            
            results.map(r=>{
              if(fixedTime != r.dataTime) return null
              new FineDustSgg({
                SGG_ENM: r.cityNameEng,
                SGG_NM: r.cityName,
                // SGG_CD: r.SGG_CD,
                short_SD_NM,
                SD_NM: query.SD_NM,
                SD_CD: query.SD_CD,
                pm2_5: r.pm25Value,
                pm10: r.pm10Value,
                no2: r.no2Value,
                dataTime: r.dataTime
              }).save();
            });
            resolve();
          })
          .catch(err => {
            reject(console.log("err : ", err))
          });
  });
}

function checkSggNameFilter (name) {
  if(name.includes("천안시")) return "천안시";
  else if(name.includes("수원시")) return "수원시";
  else if(name.includes("성남시")) return "성남시";
  else if(name.includes("안양시")) return "안양시";
  else if(name.includes("부천시")) return "부천시";
  else if(name.includes("안산시")) return "안산시";
  else if(name.includes("고양시")) return "고양시";
  else if(name.includes("용인시")) return "용인시";
  else if(name.includes("청주시")) return "청주시";
  else if(name.includes("포항시")) return "포항시";
  else if(name.includes("창원시")) return "창원시";
  else if(name.includes("전주시")) return "전주시";
  else return name
}

module.exports = router;