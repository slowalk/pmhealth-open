var fs = require('fs');
// require('es6-promise/auto');

var suwon = ["31011", "31012", "31013", "31014"];
var sungnam = ["31021","31022","31023"];
var anyang = ["31041","31042"];
var buchun = ["31051","31052","31053"];
var ansan = ["31091","31092"];
var goyang = ["31101","31103","31104"];
var yongin = ["31191","31192","31193"];

fs.readFile('./bnd_sigungu_00_2012_0_5.json', 'utf8', function readFileCallback(err, data){
  if (err){
      console.log(err);
  } else {
  
  var objData = JSON.parse(data); //now it an object
  var output = [];

  return new Promise((resolve, reject) => {
    objData.features.map(f => {
      var group = null;
      if(suwon.includes(f.properties.sigungu_cd)) group = "수원시"
      if(sungnam.includes(f.properties.sigungu_cd)) group = "성남시"
      if(anyang.includes(f.properties.sigungu_cd)) group = "안양시"
      if(buchun.includes(f.properties.sigungu_cd)) group = "부천시"
      if(ansan.includes(f.properties.sigungu_cd)) group = "안산시"
      if(goyang.includes(f.properties.sigungu_cd)) group = "고양시"
      if(yongin.includes(f.properties.sigungu_cd)) group = "용인시"
      output.push(
        {
          "year": "2012",
          "abstract_point": "0.5",
          "type": "Feature",
          "properties": {
            "sigungu_cd" : f.properties.sigungu_cd,
            "sigungu_nm" : f.properties.sigungu_nm,
            "group": group
          },
          "geometry": f.geometry
        }
      )
    })
    resolve()
  })
  .then(() => {
    json = JSON.stringify(output); //convert it back to json
    fs.writeFile('bnd_sigungu_00_2012_0_5_divided_by_sgg.json', json, 'utf8'); // write it back 
  })
  .catch(err => {
    console.log("err : ", err)
  });
}});