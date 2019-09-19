<template lang="pug">
  #map
</template>

<script>
const mapData = require("../../../../seed/bnd_sido_00_2016_topo.json")
const testData = require("../../../../seed/surveyData.json")

export default {
  data() {
    return {
    }
  },
  mounted() {
    const v = this;
    const width = document.getElementById('map').offsetWidth;
    const height = width + 200;
    const svg = d3.select("#map").append("svg")
      .attr("width", width)
      .attr("height", height);
    const svg_group = svg.append("g")
    const projection = d3.geo.mercator()
      .center([127.5, 36])
      .scale(width * 10)
      .translate([width/2, height/2]);

    const path = d3.geo.path()
      .projection(projection);
    
    let pm2_5;    

    const partRange = {
      good: [0, 15],
      notBad: [16,35],
      bad: [36,75],
      veryBad: [76,200]
    }

    const assessRange = ["좋음", "보통", "나쁨", "매우나쁨"];

    const quantize = d3.scale.quantize()
      .domain(assessRange)
      .range(d3.range(4).map(function(i) { 
          if (i != undefined) {return "m2_" + i; }
      }));

    const features = topojson.feature(mapData, mapData.objects["bnd_sido_00_2016_geo"]).features;

    // svg_group.selectAll("path")
    svg_group.selectAll("g")
      .data(features)
      .enter()
    .append("path")
      // .attr("class", d => { 
      //   let result = testData.filter((item) => {
      //     return String(item["SD_CD"]) === String(d.properties.SIDO_CD);
      //   })[0]
      //   if (result.today_PM2_5 <= partRange.good[1] && result.today_PM2_5 >= partRange.good[0]) {return "municipality m2_0"; }
      //   if (result.today_PM2_5 <= partRange.notBad[1] && result.today_PM2_5 >= partRange.notBad[0]) {return "municipality m2_1"; }
      //   if (result.today_PM2_5 <= partRange.bad[1] && result.today_PM2_5 >= partRange.bad[0]) {return "municipality m2_2"; }
      //   if (result.today_PM2_5 <= partRange.veryBad[1] && result.today_PM2_5 >= partRange.veryBad[0]) {return "municipality m2_3"; }
      // })
      .attr("fill", d=> {
        let result = testData.filter((item) => {
          return String(item["SD_CD"]) === String(d.properties.SIDO_CD);
        })[0]
        if (result.today_PM2_5 <= partRange.good[1] && result.today_PM2_5 >= partRange.good[0]) {return "rgb(89,136,222)"; }
        if (result.today_PM2_5 <= partRange.notBad[1] && result.today_PM2_5 >= partRange.notBad[0]) {return "rgb(97,207,37)"; }
        if (result.today_PM2_5 <= partRange.bad[1] && result.today_PM2_5 >= partRange.bad[0]) {return "#fe9929"; }
        if (result.today_PM2_5 <= partRange.veryBad[1] && result.today_PM2_5 >= partRange.veryBad[0]) {return "#cc4c02"; }
      })
      .style({
        "stroke-width": "0.24px",
        "stroke": "black" 
      })



      .attr("id", d => { return "PM2_5_" + d.properties.SIDO_CD; })
      .attr("d", path)
      .on('mouseover', function(d) {
        d.positionX = path.centroid(d)[0];
        d.positionY = d3.mouse(this)[1] + 40;
        v.$emit('sggHovered', d)
        this.classList.add("hover");
        d3.select("#PM2_5_labelRect_" + d.properties.SIDO_CD).classed("rectHover", true);
      })
      .on('mouseout', function(d) {
        v.$emit('sggDeHovered', undefined);
        this.classList.remove("hover");
        d3.select("#PM2_5_labelRect_" + d.properties.SIDO_CD).classed("rectHover", false);
      })
      .on('click', d =>{
        // if(pm2_5) {
        //   pm2_5.classList.toggle("hover");
        // }
        // pm2_5 = document.getElementById("PM2_5_" + d.properties.SIDO_CD);
        // pm2_5.classList.toggle("hover");

        // magnifyMap(d, svg_group, 750);
      });

    const legend = d3.legend.color()
        .useClass(true)
        .scale(quantize);

    const legendQuant1 = svg_group.append("g")
        .attr("id", "legendQuant")

    const legendQuantBackgroundRect = legendQuant1.append("rect")
        .attr("fill", "white")
        .style("pointer-events", "none");
    const legend_pd = 3;
    const legend_mg = 6;
    const fillBlank = 50;
    
    legendQuant1.call(legend); 

    const legendInfo = legendQuant1.node().getBoundingClientRect();
    
    legendQuantBackgroundRect
        .attr("width", legendInfo.width + legend_pd*2 + fillBlank + 10)
        .attr("height", legendInfo.height + legend_pd*2)
    legendQuant1.attr("transform", "translate(" + (width - legendInfo.width - legend_mg - fillBlank - 10) + "," + 0 + ")")                
    legendQuant1.select(".legendCells")
        .attr("transform", "translate(" + legend_pd + "," + legend_pd + ")")
        .style("pointer-events", "none");
    legendQuant1.select(".legendCells").select("g:nth-child(1)").select("text").text("좋음(0∼15㎍/㎥)")
    legendQuant1.select(".legendCells").select("g:nth-child(2)").select("text").text("보통(16∼35㎍/㎥)")
    legendQuant1.select(".legendCells").select("g:nth-child(3)").select("text").text("나쁨(36∼75㎍/㎥)")
    legendQuant1.select(".legendCells").select("g:nth-child(4)").select("text").text("매우나쁨(76㎍/㎥ 이상)")

    //label
    const label_padding_width = 5;
    const label_padding_height = 2;
    const imgSize = 30;
    const fontSize = 13;
    const textCenter= 12;
    const numCenter= 0;
    const kyunggi = {x: 30, y: 20}, 
        seoul = {x: 0, y:50}, 
        inchun = 35,
        chungbuk = {x: 40,y: 40}, 
        busan = 10, 
        sejong = {x: 20, y: 20},
        all_margin = 10,
        daejeon = {x: 35, y:0},
        jeollabu = {x: 60, y: 0},
        hungnam = {x: 0, y: 0},
        chungnam = {x: 50, y: 30},
        gwangju = {x: 40, y: 0},
        jeollana = {x: 0, y: 20},
        ulsan = {x: 10, y:0},
        gangwon = {x: 30, y: 30};
    const label_g = svg_group.append("g").attr("id", "airMapLabel").selectAll("div")
      .data(features)
      .enter().append("g")
      .attr("id", function(d){
        return "PM2_5_labelRect_" + d.properties.SIDO_CD
      })
    // label_g.append("line")
    label_g.append("rect")
      .style({
        // "pointer-events": "none"
      })
    label_g.append("text")
      .attr("dy", ".35em")
      .attr("class", "SD_NM")
      .style({
        "font-size": fontSize + "px",
        "pointer-events": "none"
      })
      .text(function(e) { 
        const result = testData.filter((item) => {
          return String(item["SD_CD"]) === String(e.properties.SIDO_CD);
        })[0]
        return result.kor_cities_provinces; 
      });
    // label_g.append("svg:image")
    //   .attr("class", "cigarImg")
    //   .style({
    //     "width" : imgSize,
    //     "pointer-events" : "none"
    //   })
    //   .attr("xlink:href", cigar)
    label_g.append("text")
      .text(d => {
        const result = testData.filter((item) => {
          return String(item["SD_CD"]) === String(d.properties.SIDO_CD);
        })[0]
        // return "(" + (Math.floor(result.today_PM2_5 / 22) + 1) + ")"
        return result.today_PM2_5 + " ㎍/㎥"
      })
      .attr("dy", ".35em")
      .attr("class", "dataNum")
      .style({
        "font-size": fontSize + "px",
        "pointer-events": "none"
      });

    // label_g.selectAll("image.cigarImg").each(function(d) {
    //   d.properties.bb = this.getBBox(); 
    // });



    label_g.selectAll("rect")
      .attr("x", function(d) { 
        if("서울특별시" == d.properties.SIDO_NM) return path.bounds(d)[0][0]
        if("인천광역시" == d.properties.SIDO_NM) return path.centroid(d)[0] - 30
        // if("광주광역시" == d.properties.SIDO_NM) return path.bounds(d)[0][0] - 100
        if("충청남도" == d.properties.SIDO_NM) return path.bounds(d)[0][0] + 70
        // if("전라북도" == d.properties.SIDO_NM) return path.bounds(d)[0][0] - 90
        // if("충청북도" == d.properties.SIDO_NM) return path.bounds(d)[0][0] + 140
        // if("경상남도" == d.properties.SIDO_NM) return path.bounds(d)[1][0] - 70
        if("울산광역시" == d.properties.SIDO_NM) return path.bounds(d)[1][0]
        // if("대구광역시" == d.properties.SIDO_NM) return path.bounds(d)[1][0] + 100
        if("세종특별자치시" == d.properties.SIDO_NM) return path.bounds(d)[0][0] - 30
        if("광주광역시" == d.properties.SIDO_NM) return path.bounds(d)[0][0] - 30
        // if("대전광역시" == d.properties.SIDO_NM) return path.bounds(d)[1][0]
        // if("제주특별자치도" == d.properties.SIDO_NM) return path.bounds(d)[1][0] + 20 + label_padding_width
        // if(["강원도", "경상북도", "부산광역시"].includes(d.properties.SIDO_NM)) return path.bounds(d)[1][0] 
        if(["강원도", "경상북도", "전라북도", "경상남도", "제주특별자치도", "충청북도"].includes(d.properties.SIDO_NM)) return path.centroid(d)[0] - 20
        // else return path.bounds(d)[0][0]
        if("대전광역시" == d.properties.SIDO_NM) return path.centroid(d)[0]
        return path.centroid(d)[0]
      })
      .attr("y", function(d) { 
        if("서울특별시" == d.properties.SIDO_NM) return path.bounds(d)[0][1] - 30
        if("경기도" == d.properties.SIDO_NM) return path.centroid(d)[1] + 15
        // if("충청북도" == d.properties.SIDO_NM) return path.bounds(d)[0][1]
        if("세종특별자치시" == d.properties.SIDO_NM) return path.bounds(d)[0][1] - 20
        if("경상북도" == d.properties.SIDO_NM) return path.centroid(d)[1] - 20
        if("대구광역시" == d.properties.SIDO_NM) return path.centroid(d)[1] - 30
        if("울산광역시" == d.properties.SIDO_NM) return path.bounds(d)[0][1]
        // if(["부산광역시", "경상남도", "전라남도"].includes(d.properties.SIDO_NM)) return path.bounds(d)[1][1] 
        if(["강원도", "전라북도", "경상남도", "제주특별자치도", "충청북도"].includes(d.properties.SIDO_NM)) return path.centroid(d)[1] - 20
        // if("제주특별자치도" == d.properties.SIDO_NM) return path.centroid(d)[1] - 30
        // else return path.bounds(d)[0][1]
        return path.centroid(d)[1]
      })
      // .attr("width", function(d) { return d.properties.bb.width + label_padding_width})
      .attr("width", function(d) { return "57px"})
      .attr("height", function(d) { return "33px"})  
      // .attr("fill-opacity","0.8")
      .attr("rx", "5")
      .attr("ry", "5")
      .style({
        // "filter": "drop-shadow( -5px -5px 5px #000 )",
        // "pointer-events" : "none",
        "cursor": "pointer",
        "stroke": "rgb(16,108,214)",
        "stroke-width" :" 2",
        "fill": "white",
      })
      .on('mouseover', function(d) {
        d.positionX = path.centroid(d)[0];
        d.positionY = d3.mouse(this)[1] + 40;
        v.$emit('sggHovered', d)
        this.closest("g").classList.add("rectHover");
        d3.select("#PM2_5_" + d.properties.SIDO_CD).classed("hover", true)
      })
      .on('mouseout', function(d) {
        v.$emit('sggDeHovered', undefined)
        this.closest("g").classList.remove("rectHover");
        d3.select("#PM2_5_" + d.properties.SIDO_CD).classed("hover", false)
      });
    label_g.selectAll("text.SD_NM")
      .attr("x", function(d) { 
        if("서울특별시" == d.properties.SIDO_NM) return path.bounds(d)[0][0] + label_padding_width + textCenter
        if("인천광역시" == d.properties.SIDO_NM) return path.centroid(d)[0] + label_padding_width + textCenter - 30
        // if("광주광역시" == d.properties.SIDO_NM) return path.bounds(d)[0][0] - 100 + label_padding_width
        if("충청남도" == d.properties.SIDO_NM) return path.bounds(d)[0][0] + label_padding_width + textCenter + 70
        // if("전라북도" == d.properties.SIDO_NM) return path.bounds(d)[0][0] - 90 + label_padding_width
        // if("충청북도" == d.properties.SIDO_NM) return path.bounds(d)[0][0] + 140 + label_padding_width
        // if("경상남도" == d.properties.SIDO_NM) return path.bounds(d)[1][0] - 70 + label_padding_width
        if("울산광역시" == d.properties.SIDO_NM) return path.bounds(d)[1][0] + label_padding_width + textCenter
        // if("대구광역시" == d.properties.SIDO_NM) return path.bounds(d)[1][0] + 100 + label_padding_width
        if("세종특별자치시" == d.properties.SIDO_NM) return path.bounds(d)[0][0] - 30 + label_padding_width + textCenter
        if("광주광역시" == d.properties.SIDO_NM) return path.bounds(d)[0][0] - 30 + label_padding_width + textCenter
        // if("대전광역시" == d.properties.SIDO_NM) return path.bounds(d)[1][0] + label_padding_width
        // if("제주특별자치도" == d.properties.SIDO_NM) return path.bounds(d)[1][0] + 20 + label_padding_width
        // if(["강원도", "경상북도", "부산광역시"].includes(d.properties.SIDO_NM)) return path.bounds(d)[1][0]  + label_padding_width
        if(["강원도", "경상북도", "전라북도", "경상남도", "제주특별자치도", "충청북도"].includes(d.properties.SIDO_NM)) return path.centroid(d)[0]+ label_padding_width + textCenter - 20
        // else return path.bounds(d)[0][0] + label_padding_width
        if("대전광역시" == d.properties.SIDO_NM) return path.centroid(d)[0] + label_padding_width + textCenter
        return path.centroid(d)[0]+ label_padding_width + textCenter

      })
      .attr("y", function(d) { 
        if("서울특별시" == d.properties.SIDO_NM) return path.bounds(d)[0][1] - 30 + fontSize/2 + label_padding_height
        if("경기도" == d.properties.SIDO_NM) return path.centroid(d)[1] + 15 + fontSize/2 + label_padding_height
        // if("충청북도" == d.properties.SIDO_NM) return path.bounds(d)[0][1] + fontSize/2 + label_padding_height
        if("세종특별자치시" == d.properties.SIDO_NM) return path.bounds(d)[0][1] + fontSize/2 + label_padding_height - 20
        if("경상북도" == d.properties.SIDO_NM) return path.centroid(d)[1] - 20 + fontSize/2 + label_padding_height
        if("대구광역시" == d.properties.SIDO_NM) return path.centroid(d)[1] - 30+ fontSize/2 + label_padding_height
        if("울산광역시" == d.properties.SIDO_NM) return path.bounds(d)[0][1] + fontSize/2 + label_padding_height
        // if(["부산광역시", "경상남도", "전라남도"].includes(d.properties.SIDO_NM)) return path.bounds(d)[1][1]  + fontSize/2 + label_padding_height
        if(["강원도", "전라북도", "경상남도", "제주특별자치도", "충청북도"].includes(d.properties.SIDO_NM)) return path.centroid(d)[1] + fontSize/2 + label_padding_height - 20
        // if("제주특별자치도" == d.properties.SIDO_NM) return path.centroid(d)[1] - 30 + fontSize/2 + label_padding_height
        // else return path.bounds(d)[0][1] + fontSize/2 + label_padding_height
        return path.centroid(d)[1] + fontSize/2 + label_padding_height
      });

    // label_g.selectAll("image")
    //   .attr("x", function(d) {
    //     if("서울특별시" == d.properties.SIDO_NM) return path.bounds(d)[0][0]  + label_padding_width
    //     // if("광주광역시" == d.properties.SIDO_NM) return path.bounds(d)[0][0] - 100 + label_padding_width
    //     if("충청남도" == d.properties.SIDO_NM) return path.bounds(d)[0][0] + label_padding_width
    //     // if("전라북도" == d.properties.SIDO_NM) return path.bounds(d)[0][0] - 90 + label_padding_width
    //     // if("충청북도" == d.properties.SIDO_NM) return path.bounds(d)[0][0] + 140 + label_padding_width
    //     // if("경상남도" == d.properties.SIDO_NM) return path.bounds(d)[1][0] - 70 + label_padding_width
    //     if("울산광역시" == d.properties.SIDO_NM) return path.bounds(d)[1][0] + label_padding_width
    //     // if("대구광역시" == d.properties.SIDO_NM) return path.bounds(d)[1][0] + 100 + label_padding_width
    //     if("세종특별자치시" == d.properties.SIDO_NM) return path.bounds(d)[0][0] - 30 + label_padding_width
    //     if("광주광역시" == d.properties.SIDO_NM) return path.bounds(d)[0][0] - 30 + label_padding_width
    //     // if("대전광역시" == d.properties.SIDO_NM) return path.bounds(d)[1][0] + label_padding_width
    //     // if("제주특별자치도" == d.properties.SIDO_NM) return path.bounds(d)[1][0] + 20 + label_padding_width
    //     // if(["강원도", "경상북도", "부산광역시"].includes(d.properties.SIDO_NM)) return path.bounds(d)[1][0]  + label_padding_width
    //     // else return path.bounds(d)[0][0] + label_padding_width
    //     if("대전광역시" == d.properties.SIDO_NM) return path.centroid(d)[0] + label_padding_width
    //     return path.centroid(d)[0] + label_padding_width
    //   })
    //   .attr("y", function(d) { 
    //     if("서울특별시" == d.properties.SIDO_NM) return path.bounds(d)[0][1] - 40 + fontSize + label_padding_height* 2
    //     // if("경기도" == d.properties.SIDO_NM) return path.bounds(d)[0][1] - 20 + fontSize + label_padding_height* 2
    //     if("충청북도" == d.properties.SIDO_NM) return path.bounds(d)[0][1]  + fontSize + label_padding_height* 2
    //     if("세종특별자치시" == d.properties.SIDO_NM) return path.bounds(d)[0][1] + fontSize + label_padding_height* 2
    //     if("경상북도" == d.properties.SIDO_NM) return path.centroid(d)[1] - 20 + fontSize + label_padding_height*2
    //     if("대구광역시" == d.properties.SIDO_NM) return path.centroid(d)[1] - 30 + fontSize + label_padding_height*2
    //     if("울산광역시" == d.properties.SIDO_NM) return path.bounds(d)[0][1] + fontSize + label_padding_height* 2
    //     // if(["부산광역시", "경상남도", "전라남도"].includes(d.properties.SIDO_NM)) return path.bounds(d)[1][1] + fontSize + label_padding_height* 2
    //     // if("제주특별자치도" == d.properties.SIDO_NM) return path.centroid(d)[1] - 30 + fontSize + label_padding_height* 2
    //     // else return path.bounds(d)[0][1] + fontSize + label_padding_height* 2
    //     return path.centroid(d)[1] + fontSize + label_padding_height*2
    //   })

    label_g.selectAll("text.dataNum")
      .attr("x", function(d) { 
        if("서울특별시" == d.properties.SIDO_NM) return path.bounds(d)[0][0] + label_padding_width + numCenter
        if("인천광역시" == d.properties.SIDO_NM) return path.centroid(d)[0] + label_padding_width + numCenter - 30
        // if("광주광역시" == d.properties.SIDO_NM) return path.bounds(d)[0][0] - 100 + label_padding_width
        if("충청남도" == d.properties.SIDO_NM) return path.bounds(d)[0][0] + label_padding_width + numCenter + 70
        // if("전라북도" == d.properties.SIDO_NM) return path.bounds(d)[0][0] - 90 + label_padding_width
        // if("충청북도" == d.properties.SIDO_NM) return path.bounds(d)[0][0] + 140 + label_padding_width
        // if("경상남도" == d.properties.SIDO_NM) return path.bounds(d)[1][0] - 70 + label_padding_width
        if("울산광역시" == d.properties.SIDO_NM) return path.bounds(d)[1][0] + label_padding_width + numCenter
        // if("대구광역시" == d.properties.SIDO_NM) return path.bounds(d)[1][0] + 100 + label_padding_width
        if("세종특별자치시" == d.properties.SIDO_NM) return path.bounds(d)[0][0] - 30 + label_padding_width + numCenter
        if("광주광역시" == d.properties.SIDO_NM) return path.bounds(d)[0][0] - 30 + label_padding_width + numCenter
        // if("대전광역시" == d.properties.SIDO_NM) return path.bounds(d)[1][0] + label_padding_width
        // if("제주특별자치도" == d.properties.SIDO_NM) return path.bounds(d)[1][0] + 20 + label_padding_width
        // if(["강원도", "경상북도", "부산광역시"].includes(d.properties.SIDO_NM)) return path.bounds(d)[1][0]  + label_padding_width
        if(["강원도", "경상북도", "전라북도", "경상남도", "제주특별자치도", "충청북도"].includes(d.properties.SIDO_NM)) return path.centroid(d)[0]+ label_padding_width + numCenter - 20
        // else return path.bounds(d)[0][0] + label_padding_width
        if("대전광역시" == d.properties.SIDO_NM) return path.centroid(d)[0] + label_padding_width + numCenter
        return path.centroid(d)[0]+ label_padding_width + numCenter

      })
      .attr("y", function(d) { 
        if("서울특별시" == d.properties.SIDO_NM) return path.bounds(d)[0][1] - 30 + fontSize + label_padding_height*5
        if("경기도" == d.properties.SIDO_NM) return path.centroid(d)[1] + 15 + fontSize + label_padding_height*5
        // if("충청북도" == d.properties.SIDO_NM) return path.bounds(d)[0][1] + fontSize + label_padding_height*5
        if("세종특별자치시" == d.properties.SIDO_NM) return path.bounds(d)[0][1] + fontSize + label_padding_height*5 - 20
        if("경상북도" == d.properties.SIDO_NM) return path.centroid(d)[1] - 20 + fontSize + label_padding_height*5
        if("대구광역시" == d.properties.SIDO_NM) return path.centroid(d)[1] - 30+ fontSize + label_padding_height*5
        if("울산광역시" == d.properties.SIDO_NM) return path.bounds(d)[0][1] + fontSize + label_padding_height*5
        // if(["부산광역시", "경상남도", "전라남도"].includes(d.properties.SIDO_NM)) return path.bounds(d)[1][1]  + fontSize/2 + label_padding_height
        if(["강원도", "전라북도", "경상남도", "제주특별자치도", "충청북도"].includes(d.properties.SIDO_NM)) return path.centroid(d)[1] + fontSize + label_padding_height*5 - 20
        // if("제주특별자치도" == d.properties.SIDO_NM) return path.centroid(d)[1] - 30 + fontSize/2 + label_padding_height
        // else return path.bounds(d)[0][1] + fontSize/2 + label_padding_height
        return path.centroid(d)[1] + fontSize + label_padding_height*5
      });

    // const pointerCenter = {x: 20, y: 20};
    // label_g.selectAll("line")
    //   // .append("line")
    //     .style("stroke", "black")   
    //     .attr("class","pointer")
    //     .attr("x1", d=> {
    //       return path.centroid(d)[0]
    //     })
    //     .attr("y1", d=> {
    //       return path.centroid(d)[1]
    //     })
    //     .attr("x2", d=> {
    //       if("서울특별시" == d.properties.SIDO_NM) return path.bounds(d)[0][0] - 90 + pointerCenter.x
    //       if("광주광역시" == d.properties.SIDO_NM) return path.bounds(d)[0][0] - 100 + pointerCenter.x
    //       if("충청남도" == d.properties.SIDO_NM) return path.bounds(d)[0][0] - 70 + pointerCenter.x
    //       if("전라북도" == d.properties.SIDO_NM) return path.bounds(d)[0][0] - 90 + pointerCenter.x
    //       if("충청북도" == d.properties.SIDO_NM) return path.bounds(d)[0][0] + 140 + pointerCenter.x
    //       if("경상남도" == d.properties.SIDO_NM) return path.bounds(d)[1][0] - 70 + pointerCenter.x
    //       if("울산광역시" == d.properties.SIDO_NM) return path.bounds(d)[1][0] + 50 + pointerCenter.x
    //       if("대구광역시" == d.properties.SIDO_NM) return path.bounds(d)[1][0] + 100 + pointerCenter.x
    //       if("세종특별자치시" == d.properties.SIDO_NM) return path.bounds(d)[1][0] + 150 + pointerCenter.x
    //       if("대전광역시" == d.properties.SIDO_NM) return path.bounds(d)[1][0] - 120 + pointerCenter.x
    //       if("제주특별자치도" == d.properties.SIDO_NM) return path.bounds(d)[1][0] + 20 + label_padding_width
    //       if(["강원도", "경상북도", "부산광역시"].includes(d.properties.SIDO_NM)) return path.bounds(d)[1][0]  + pointerCenter.x
    //       else return path.bounds(d)[0][0] + pointerCenter.x
    //     })
    //     .attr("y2", d=> {  
    //       if("서울특별시" == d.properties.SIDO_NM) return path.bounds(d)[0][1] - 70 + pointerCenter.y
    //       if("경기도" == d.properties.SIDO_NM) return path.bounds(d)[0][1] - 50 + pointerCenter.y
    //       if("충청북도" == d.properties.SIDO_NM) return path.bounds(d)[0][1] - 50 + pointerCenter.y
    //       if("울산광역시" == d.properties.SIDO_NM) return path.bounds(d)[0][1] + 50 + pointerCenter.y
    //       if(["부산광역시", "경상남도", "전라남도"].includes(d.properties.SIDO_NM)) return path.bounds(d)[1][1]  + pointerCenter.y
    //       if("제주특별자치도" == d.properties.SIDO_NM) return path.centroid(d)[1] - 30 + pointerCenter.y
    //       else return path.bounds(d)[0][1] + pointerCenter.y
    //     })
    //     .style({
    //       "stroke": "rgb(16,108,214)",
    //       "stroke-width" :" 1"
    //     });

    let centered, centroid;
    // 클릭시 지역확대
    function magnifyMap(d, g1, ac, control) {
      const sd = d.properties.SIDO_CD;
      let x, y, k;
    
      if(control) { 
          centroid = path.centroid(d);
          x = centroid[0];
          y = centroid[1];
          // 서울(11)은 시군구 크기가 작아서 더 크게 확대
          if (["11", "21", "26"].includes(sd))  {
              k = 10;
          } else if (["29", "24", "22", "25"].includes(sd)){
              k = 15;
          } else {
              k = 4;
          }
          centered = d;
      } else if (centered && centered.properties.SIDO_CD === d.properties.SIDO_CD) {
          x = width / 2;
          y = height / 2;
          k = 1;
          centered = null;
      } else {
          centroid = path.centroid(d);
          x = centroid[0];
          y = centroid[1];
          // 서울(11)은 시군구 크기가 작아서 더 크게 확대
          if (["11", "21", "26"].includes(sd))  {
              k = 9;
          } else if (["29", "24", "22", "25"].includes(sd)){
              k = 14;
          } else {
              k = 3;
          }
          centered = d;
      }
      // 지도 확대
      if(g1) {
          g1.transition()
              .duration(ac)
              .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
              .style("stroke-width", 1.5 / k + "px");
      }
    }


  }
}
</script>

