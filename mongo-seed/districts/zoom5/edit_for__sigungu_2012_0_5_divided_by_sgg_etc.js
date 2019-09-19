var fs = require('fs');
// require('es6-promise/auto');
var path = require('path');

fs.readFile(path.join(__dirname) + '/../bnd_sigungu_00_2012_0_5.json', 'utf8', function readFileCallback(err, data){
  if (err){
      console.log(err);
  } else {
  
  var objData = JSON.parse(data); //now it an object
  var output = [];

  return new Promise((resolve, reject) => {
    objData.features.map(f => {
      
      if(f.properties.sigungu_cd.substring(0,2) == "11" 
        || f.properties.sigungu_cd.substring(0,2) == "21" //부산
        || f.properties.sigungu_cd.substring(0,2) == "22" // 대구
        || f.properties.sigungu_cd.substring(0,2) == "23" //인천
        || f.properties.sigungu_cd.substring(0,2) == "31") {
        return null
      } else {
        output.push(
          {
            "year": "2012",
            "abstract_point": "0.5",
            "type": "Feature",
            "properties": {
              "sigungu_cd" : f.properties.sigungu_cd,
              "sigungu_nm" : f.properties.sigungu_nm
            },
            "geometry": f.geometry
          }
        )
      };
    })
    resolve()
  })
  .then(() => {
    json = JSON.stringify(output); //convert it back to json
    fs.writeFile(path.join(__dirname) + '/bnd_sigungu_00_2012_0_5_divided_by_sgg_etc.json', json, 'utf8', function(err) {
      console.log("err : ", err)
    }); // write it back 
  })
  .catch(err => {
    console.log("err : ", err)
  });
}});