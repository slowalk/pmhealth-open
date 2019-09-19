<template lang="pug">
  div
    #legend
      .inline-block
        .m2_0.box
        p 좋음(0∼600명)
      .inline-block
        .m2_1.box
        p 보통(601∼1200명)
      .inline-block
        .m2_2.box
        p 나쁨(1201∼1800명)
      .inline-block
        .m2_3.box
        p 매우나쁨(1801명 이상)
  
    #map
</template>

<script>
const mapData = require("../../../../seed/bnd_sido_00_2016_topo.json")
const testData = require("../../../../seed/surveyData.json")
const mapFunc = require("../../../../models/mapFunc.js")
import person from "../../../../assets/person.png"

export default {
  data() {
    return {
      centered: null,
      centroid: null,
      // currentSd: mapFunc.getUrlVars().sd,
      currentSd: this.$store.getters.getSd,
      features: topojson.feature(mapData, mapData.objects["bnd_sido_00_2016_geo"]).features,
      currentSdObject: null
    }
  },
  methods: {
    // 클릭시 지역확대
    magnifyMap(width, height, path, d, g1, ac, control) {
      const sd = d.properties.SIDO_CD;
      let x, y, k;
    
      if (this.centered && this.centered.properties.SIDO_CD === d.properties.SIDO_CD) {
        d3.select("#mapLabel").attr({"display": "inherit"});
        this.$emit('sggDeHovered', d);
        d3.select("#PM2_5_" + d.properties.SIDO_CD).classed("selected", false);
        //원상태 복귀
        x = width / 2;
        y = height / 2;
        k = 1;

        this.centered = null;
        g1.transition()
          .duration(ac)
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      } else {
        d3.select("#mapLabel").attr({"display": "none"});
        this.$emit('sggHovered', d);
        d3.select("#PM2_5_" + d.properties.SIDO_CD).classed("selected", true);
        this.centroid = path.centroid(d);
        
        x = this.centroid[0];
        y = this.centroid[1];
        // 서울,부산,울산은 시군구 크기가 작아서 더 크게 확대
        if (["11", "21", "26"].includes(sd)) k = 5;
        else if (["29", "24", "22", "25"].includes(sd)) k = 10;
        else k = 2;
        
        this.centered = d;
        g1.transition()
          .duration(ac)
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      }
      // // 지도 확대
      // if(g1) {
      //   g1.transition()
      //     .duration(ac)
      //     .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      //     .style("stroke-width", 1.5 / k + "px");
      // }

    }
  },
  created() {
    this.currentSdObject = this.features.filter(item => {
      return item.properties.SIDO_CD == this.currentSd
    })[0];
  },
  mounted() {
    const v = this;
    const width = document.getElementById('map').offsetWidth;
    const height = width + 200;
    const svg = d3.select("#map").append("svg")
      .attr("width", width)
      .attr("height", height);
    const svg_group = svg.append("g").attr("class", "svg_group")
    const projection = d3.geo.mercator()
      .center([127.5, 36])
      .scale(width * 10)
      .translate([width/2, height/2]);

    const path = d3.geo.path()
      .projection(projection);
    
    let clickedBefore;    

    const partRange = {
      good: [0, 600],
      notBad: [601,1200],
      bad: [1201,1800],
      veryBad: [1801,2400]
    }

    const assessRange = ["좋음", "보통", "나쁨", "매우나쁨"];

    const quantize = d3.scale.quantize()
      .domain(assessRange)
      .range(d3.range(4).map(function(i) { 
          if (i != undefined) {return "m2_" + i; }
      }));

    const features = topojson.feature(mapData, mapData.objects["bnd_sido_00_2016_geo"]).features;

    svg_group
      .selectAll("g")
        .data(features)
        .enter()
      .append("g")
        .attr("class", d => {
          return "pathWrapper " + d.properties.SIDO_CD
        })
      .append("path")
        .attr("class", d => { 
          let result = testData.filter((item) => {
            return String(item["SD_CD"]) === String(d.properties.SIDO_CD);
          })[0]
          if (result.burden <= partRange.good[1] && result.burden >= partRange.good[0]) {return "municipality m2_0"; }
          if (result.burden <= partRange.notBad[1] && result.burden >= partRange.notBad[0]) {return "municipality m2_1"; }
          if (result.burden <= partRange.bad[1] && result.burden >= partRange.bad[0]) {return "municipality m2_2"; }
          if (result.burden <= partRange.veryBad[1] && result.burden >= partRange.veryBad[0]) {return "municipality m2_3"; }
        })
        .attr("id", d => { return "PM2_5_" + d.properties.SIDO_CD; })
        .attr("d", path)
        .on('mouseover', function(d) {
          // d.positionX = path.centroid(d)[0];
          // d.positionY = d3.mouse(this)[1] + 40;
          // v.$emit('sggHovered', d)
          this.classList.add("hover");
          d3.select("#PM2_5_labelRect_" + d.properties.SIDO_CD).classed("rectHover", true);
        })
        .on('mouseout', function(d) {
          // v.$emit('sggDeHovered', undefined)
          this.classList.remove("hover");
          d3.select("#PM2_5_labelRect_" + d.properties.SIDO_CD).classed("rectHover", false);
        })
        .on('click', d =>{
          // if(pm2_5) {
          //   pm2_5.classList.toggle("hover");
          // }
          // pm2_5 = document.getElementById("PM2_5_" + d.properties.SIDO_CD);
          // pm2_5.classList.toggle("hover");

          // pm2_5.classList.toggle("hover");
          new Promise((resolve, reject) => {
            clickedBefore.classed("selected", false)
            resolve()
          }).then(res => {
            clickedBefore = d3.select("#PM2_5_" + d.properties.SIDO_CD)
          })
          this.magnifyMap(width, height, path, d, svg_group, 750);
        });



    // legend
    const legend_pd = 3,
          legend_mg = 6,
          fillBlank = 55;
    const legend = d3.legend.color()
        .useClass(true)
        .scale(quantize);
    
    // legendQuant.call(legend); 
    const legendQuant = d3.select("#legend")
    const legendInfo = svg.node().getBoundingClientRect();
    // console.log(legendInfo)
    legendQuant.style({
          "background-color": "white",
          "pointer-events": "none",
          // "width": "170px",
          // "height": (legendInfo.height + legend_pd*2),
          "right": 0
        })
    // const legend = d3.legend.color()
    //     .useClass(true)
    //     .scale(quantize);

    // const legendQuant1 = svg_group.append("g")
    //     .attr("id", "legendQuant")

    // const legendQuantBackgroundRect = legendQuant1.append("rect")
    //     .attr("fill", "white")
    //     .attr("fill-opacity","0.7")
    //     .style("pointer-events", "none");

    // const legend_pd = 3;
    // const legend_mg = 6;
    // const fillBlank = 50;
    
    // legendQuant1.call(legend); 

    // const legendInfo = legendQuant1.node().getBoundingClientRect();
    
    // legendQuantBackgroundRect
    //     .attr("width", legendInfo.width + legend_pd*2 + fillBlank)
    //     .attr("height", legendInfo.height + legend_pd*2)
    // legendQuant1.attr("transform", "translate(" + (width - legendInfo.width - legend_mg - fillBlank) + "," + 0 + ")")                
    // legendQuant1.select(".legendCells")
    //     .attr("transform", "translate(" + legend_pd + "," + legend_pd + ")")
    //     .style("pointer-events", "none");
    // legendQuant1.select(".legendCells").select("g:nth-child(1)").select("text").text("좋음(0∼600명)")
    // legendQuant1.select(".legendCells").select("g:nth-child(2)").select("text").text("보통(601∼1200명)")
    // legendQuant1.select(".legendCells").select("g:nth-child(3)").select("text").text("나쁨(1201∼1800명)")
    // legendQuant1.select(".legendCells").select("g:nth-child(4)").select("text").text("매우나쁨(1801명 이상)")

    //label
    const label_padding_width = 5;
    const label_padding_height = 4;
    const imgSize = 20;
    const fontSize = 13;
    const textCenter= 7;
    const numCenter= -1;
    const kyunggi = {x: 30, y: 20}, 
        seoul = 40, 
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
    
    const label_g = svg_group.append("g").attr("id", "mapLabel").selectAll("div")
      .data(features)
      .enter().append("g")
      .attr("id", function(d){
        return "PM2_5_labelRect_" + d.properties.SIDO_CD
      })
    // label_g.append("line")
    label_g.append("rect")
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
    //   .attr("class", "personImg")
    //   .style({
    //     // "height" : imgSize,
    //     "pointer-events" : "none"
    //   })
    //   .attr("xlink:href", person);
    label_g.append("text")
      .text(d => {
        const result = testData.filter((item) => {
          return String(item["SD_CD"]) === String(d.properties.SIDO_CD);
        })[0]
        return  Math.round(result.burden) + "명"
        // return "(" + (Math.floor(result.burden / 600) + 1) + "명)"
      })
      .attr("dy", ".35em")
      .attr("class", "dataNum")
      .style({
        "font-size": fontSize + "px",
        "pointer-events": "none"
      });

      
    label_g.selectAll("rect")
      .attr("x", function(d) { 
        if("서울특별시" == d.properties.SIDO_NM) return path.bounds(d)[0][0]
        // if("광주광역시" == d.properties.SIDO_NM) return path.bounds(d)[0][0] - 100
        if("충청남도" == d.properties.SIDO_NM) return path.bounds(d)[0][0] + 70
        // if("전라북도" == d.properties.SIDO_NM) return path.centroid(d)[0] - 10
        // if("충청북도" == d.properties.SIDO_NM) return path.bounds(d)[0][0] + 140
        // if("경상남도" == d.properties.SIDO_NM) return path.bounds(d)[1][0] - 70
        if("울산광역시" == d.properties.SIDO_NM) return path.bounds(d)[1][0] - 1
        // if("대구광역시" == d.properties.SIDO_NM) return path.bounds(d)[1][0] + 100
        if("세종특별자치시" == d.properties.SIDO_NM) return path.bounds(d)[0][0] - 30
        if("광주광역시" == d.properties.SIDO_NM) return path.bounds(d)[0][0] - 30
        if("인천광역시" == d.properties.SIDO_NM) return path.centroid(d)[0] - 30
        // if("대전광역시" == d.properties.SIDO_NM) return path.bounds(d)[1][0]
        // if("제주특별자치도" == d.properties.SIDO_NM) return path.bounds(d)[1][0] + 20 + label_padding_width
        if(["강원도", "경상북도", "전라북도", "경상남도", "제주특별자치도", "충청북도"].includes(d.properties.SIDO_NM)) return path.centroid(d)[0] - 20
        if("대전광역시" == d.properties.SIDO_NM) return path.centroid(d)[0]
        return path.centroid(d)[0]
      })
      .attr("y", function(d) { 
        if("서울특별시" == d.properties.SIDO_NM) return path.bounds(d)[0][1] - 40
        if("경기도" == d.properties.SIDO_NM) return path.centroid(d)[1] + 15
        // if("충청북도" == d.properties.SIDO_NM) return path.bounds(d)[0][1]
        if("세종특별자치시" == d.properties.SIDO_NM) return path.bounds(d)[0][1] - 20
        if("경상북도" == d.properties.SIDO_NM) return path.centroid(d)[1] - 50
        if("대구광역시" == d.properties.SIDO_NM) return path.centroid(d)[1] - 30
        if("울산광역시" == d.properties.SIDO_NM) return path.bounds(d)[0][1]
        // if(["부산광역시", "경상남도", "전라남도"].includes(d.properties.SIDO_NM)) return path.bounds(d)[1][1] 
        if(["강원도", "전라북도", "경상남도", "제주특별자치도", "충청북도"].includes(d.properties.SIDO_NM)) return path.centroid(d)[1] - 20
        // if("제주특별자치도" == d.properties.SIDO_NM) return path.centroid(d)[1] - 30
        // else return path.bounds(d)[0][1]
        return path.centroid(d)[1]
      })
      // .attr("width", function(d) { return d.properties.bb.width + label_padding_width})
      .attr("width", function(d) { 
        const result = testData.filter((item) => {
          return String(item["SD_CD"]) === String(d.properties.SIDO_CD);
        })[0];
        return (label_padding_width * 2 + 8 * (String(Math.round(result.burden)).length + 1))
      })
      .attr("height", function(d) { return 33})  
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
        // d.positionX = path.centroid(d)[0];
        // d.positionY = d3.mouse(this)[1] + 40;
        // v.$emit('sggHovered', d)
        this.closest("g").classList.add("rectHover");
        d3.select("#PM2_5_" + d.properties.SIDO_CD).classed("hover", true)
      })
      .on('mouseout', function(d) {
        // v.$emit('sggDeHovered', undefined)
        this.closest("g").classList.remove("rectHover");
        d3.select("#PM2_5_" + d.properties.SIDO_CD).classed("hover", false)
      })
      .on('click', (d)=> {
        // if(pm2_5) {
        //   pm2_5.classList.toggle("hover");
        // }
        // pm2_5 = document.getElementById("PM2_5_" + d.properties.SIDO_CD);
        // pm2_5.classList.toggle("hover");
        new Promise((resolve, reject) => {
            clickedBefore.classed("selected", false)
            resolve()
          }).then(res => {
            clickedBefore = d3.select("#PM2_5_" + d.properties.SIDO_CD)
          })
        this.magnifyMap(width, height, path, d, svg_group, 750);
        // v.$emit('sggHovered', d)
      });

    label_g.selectAll("text.SD_NM")
      .attr("x", function(d) { 
        if("서울특별시" == d.properties.SIDO_NM) return path.bounds(d)[0][0] + label_padding_width + textCenter
        else if("인천광역시" == d.properties.SIDO_NM) return path.centroid(d)[0] + label_padding_width + textCenter - 32
        // if("광주광역시" == d.properties.SIDO_NM) return path.bounds(d)[0][0] - 100 + label_padding_width
        else if("충청남도" == d.properties.SIDO_NM) return path.bounds(d)[0][0] + label_padding_width + textCenter + 67
        // if("전라북도" == d.properties.SIDO_NM) return path.centroid(d)[0]+ label_padding_width + textCenter - 10
        // if("충청북도" == d.properties.SIDO_NM) return path.bounds(d)[0][0] + 140 + label_padding_width
        
        else if("부산광역시" == d.properties.SIDO_NM) return (path.centroid(d)[0] + label_padding_width + 5);
        else if("제주특별자치도" == d.properties.SIDO_NM) return (path.centroid(d)[0] - 15);
        
        // else if("부산광역시" == d.properties.SIDO_NM) return path.bounds(d)[1][0] + label_padding_width + textCenter - 30
        else if("울산광역시" == d.properties.SIDO_NM) return path.bounds(d)[1][0] + label_padding_width + textCenter - 4
        // if("대구광역시" == d.properties.SIDO_NM) return path.bounds(d)[1][0] + 100 + label_padding_width
        else if("세종특별자치시" == d.properties.SIDO_NM) return path.bounds(d)[0][0] - 37 + label_padding_width + textCenter
        // else if("제주특별자치도" == d.properties.SIDO_NM) return path.bounds(d)[0][0] + label_padding_width + textCenter + 19
        else if("광주광역시" == d.properties.SIDO_NM) return path.bounds(d)[0][0] - 35 + label_padding_width + textCenter + 2
        else if("전라남도" == d.properties.SIDO_NM) return path.centroid(d)[0] + label_padding_width + textCenter - 2
        // if("대전광역시" == d.properties.SIDO_NM) return path.bounds(d)[1][0] + label_padding_width
        // if("제주특별자치도" == d.properties.SIDO_NM) return path.bounds(d)[1][0] + 20 + label_padding_width
        // if(["강원도", "경상북도", "부산광역시"].includes(d.properties.SIDO_NM)) return path.bounds(d)[1][0]  + label_padding_width
        else if(["강원도", "경상북도", "전라북도", "경상남도", "제주특별자치도", "충청북도"].includes(d.properties.SIDO_NM)) return path.centroid(d)[0]+ label_padding_width + textCenter - 22
        
        else if(["대전광역시", "대구광역시"].includes(d.properties.SIDO_NM)) return path.centroid(d)[0] + label_padding_width + textCenter - 3
        return path.centroid(d)[0] + label_padding_width + textCenter

      })
      .attr("y", function(d) { 
        if("서울특별시" == d.properties.SIDO_NM) return path.bounds(d)[0][1] - 40 + fontSize/2 + label_padding_height
        if("경기도" == d.properties.SIDO_NM) return path.centroid(d)[1] + 15 + fontSize/2 + label_padding_height
        // if("충청북도" == d.properties.SIDO_NM) return path.bounds(d)[0][1] + fontSize/2 + label_padding_height
        if("세종특별자치시" == d.properties.SIDO_NM) return path.bounds(d)[0][1] + fontSize/2 + label_padding_height - 20
        if("경상북도" == d.properties.SIDO_NM) return path.centroid(d)[1] - 50 + fontSize/2 + label_padding_height
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
    //     // if("경기도" == d.properties.SIDO_NM) return path.bounds(d)[0][1] - 50 + fontSize + label_padding_height* 2
    //     if("충청북도" == d.properties.SIDO_NM) return path.bounds(d)[0][1]  + fontSize + label_padding_height* 2
    //     if("세종특별자치시" == d.properties.SIDO_NM) return path.bounds(d)[0][1] + fontSize + label_padding_height* 2
    //     if("경상북도" == d.properties.SIDO_NM) return path.centroid(d)[1] - 50 + fontSize + label_padding_height*2
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
        // if("전라북도" == d.properties.SIDO_NM) return path.centroid(d)[0]+ label_padding_width + numCenter - 10
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
        if("서울특별시" == d.properties.SIDO_NM) return path.bounds(d)[0][1] - 40 + fontSize + label_padding_height*3
        if("경기도" == d.properties.SIDO_NM) return path.centroid(d)[1] + 15 + fontSize + label_padding_height*3
        // if("충청북도" == d.properties.SIDO_NM) return path.bounds(d)[0][1] + fontSize + label_padding_height*3
        if("세종특별자치시" == d.properties.SIDO_NM) return path.bounds(d)[0][1] + fontSize + label_padding_height*3 - 20
        if("경상북도" == d.properties.SIDO_NM) return path.centroid(d)[1] - 50 + fontSize + label_padding_height*3
        if("대구광역시" == d.properties.SIDO_NM) return path.centroid(d)[1] - 30+ fontSize + label_padding_height*3
        if("울산광역시" == d.properties.SIDO_NM) return path.bounds(d)[0][1] + fontSize + label_padding_height*3
        // if(["부산광역시", "경상남도", "전라남도"].includes(d.properties.SIDO_NM)) return path.bounds(d)[1][1]  + fontSize/2 + label_padding_height
        if(["강원도", "전라북도", "경상남도", "제주특별자치도", "충청북도"].includes(d.properties.SIDO_NM)) return path.centroid(d)[1] + fontSize + label_padding_height*3 - 20
        // if("제주특별자치도" == d.properties.SIDO_NM) return path.centroid(d)[1] - 30 + fontSize/2 + label_padding_height
        // else return path.bounds(d)[0][1] + fontSize/2 + label_padding_height
        return path.centroid(d)[1] + fontSize + label_padding_height*3
      });




    // label_g.selectAll("rect")
    //   .attr("x", function(d) { 
    //     if("서울특별시" == d.properties.SIDO_NM) return path.bounds(d)[0][0] - 90
    //     if("광주광역시" == d.properties.SIDO_NM) return path.bounds(d)[0][0] - 100
    //     if("충청남도" == d.properties.SIDO_NM) return path.bounds(d)[0][0] - 70
    //     if("전라북도" == d.properties.SIDO_NM) return path.bounds(d)[0][0] - 90
    //     if("충청북도" == d.properties.SIDO_NM) return path.bounds(d)[0][0] + 140
    //     if("경상남도" == d.properties.SIDO_NM) return path.bounds(d)[1][0] - 70
    //     if("울산광역시" == d.properties.SIDO_NM) return path.bounds(d)[1][0] + 50
    //     if("대구광역시" == d.properties.SIDO_NM) return path.bounds(d)[1][0] + 100
    //     if("세종특별자치시" == d.properties.SIDO_NM) return path.bounds(d)[1][0] + 150
    //     if("대전광역시" == d.properties.SIDO_NM) return path.bounds(d)[0][0] - 110 + label_padding_width
    //     if("경기도" == d.properties.SIDO_NM) return path.bounds(d)[0][0] + 30
    //     if("제주특별자치도" == d.properties.SIDO_NM) return path.bounds(d)[1][0] + 20 + label_padding_width
    //     if(["강원도", "경상북도", "부산광역시"].includes(d.properties.SIDO_NM)) return path.bounds(d)[1][0] 
    //     else return path.bounds(d)[0][0]
    //   })
    //   .attr("y", function(d) { 
    //     if("서울특별시" == d.properties.SIDO_NM) return path.bounds(d)[0][1] - 70
    //     if("경기도" == d.properties.SIDO_NM) return path.bounds(d)[0][1] - 50
    //     if("충청북도" == d.properties.SIDO_NM) return path.bounds(d)[0][1] - 50
    //     if("울산광역시" == d.properties.SIDO_NM) return path.bounds(d)[0][1] + 50
    //     if(["부산광역시", "경상남도", "전라남도"].includes(d.properties.SIDO_NM)) return path.bounds(d)[1][1] 
    //     if("제주특별자치도" == d.properties.SIDO_NM) return path.centroid(d)[1] - 30
    //     else return path.bounds(d)[0][1]
    //   })
    //   .attr("width", function(d) { 
    //     var result = testData.filter((item) => {
    //       return String(item["SD_CD"]) === String(d.properties.SIDO_CD);
    //     })[0]
    //     // return ((Math.floor(result.burden / 100) == 0) ? 1 : Math.floor(result.burden / 100)-1)/6 *10
    //     var v = Math.floor(result.burden / 100);
    //     if(v == 0) return 1 * 25 + "px"
    //     var k = Math.floor(v % 5) == 0 ? Math.floor(v / 5) : Math.floor(v / 5) + 1
    //     return k * 22 + label_padding_width + "px"
    //   })
    //   // .attr("width", function(d) { return 48})
    //   .attr("height", function(d) { return d.properties.bb.height * 1 + label_padding_height * 2 + imgSize})  
    //   // .attr("fill-opacity","0.8")
    //   .style({
    //     "fill": "white",
    //     "pointer-events": "none",
    //     "filter": "drop-shadow( -5px -5px 5px #000 )"
    //   });
    // label_g.selectAll("text.SD_NM")
    //   .attr("x", function(d) { 
    //     if("서울특별시" == d.properties.SIDO_NM) return path.bounds(d)[0][0] - 90 + label_padding_width
    //     if("광주광역시" == d.properties.SIDO_NM) return path.bounds(d)[0][0] - 100 + label_padding_width
    //     if("충청남도" == d.properties.SIDO_NM) return path.bounds(d)[0][0] - 70 + label_padding_width
    //     if("전라북도" == d.properties.SIDO_NM) return path.bounds(d)[0][0] - 90 + label_padding_width
    //     if("충청북도" == d.properties.SIDO_NM) return path.bounds(d)[0][0] + 140 + label_padding_width
    //     if("경상남도" == d.properties.SIDO_NM) return path.bounds(d)[1][0] - 70 + label_padding_width
    //     if("울산광역시" == d.properties.SIDO_NM) return path.bounds(d)[1][0] + 50 + label_padding_width
    //     if("대구광역시" == d.properties.SIDO_NM) return path.bounds(d)[1][0] + 100 + label_padding_width
    //     if("세종특별자치시" == d.properties.SIDO_NM) return path.bounds(d)[1][0] + 150 + label_padding_width
    //     if("대전광역시" == d.properties.SIDO_NM) return path.bounds(d)[0][0] - 110 + label_padding_width
    //     if("경기도" == d.properties.SIDO_NM) return path.bounds(d)[0][0] + 30 + label_padding_width
    //     if("제주특별자치도" == d.properties.SIDO_NM) return path.bounds(d)[1][0] + 20 + label_padding_width
    //     if(["강원도", "경상북도", "부산광역시"].includes(d.properties.SIDO_NM)) return path.bounds(d)[1][0]  + label_padding_width
    //     else return path.bounds(d)[0][0] + label_padding_width
    //   })
    //   .attr("y", function(d) { 
    //     if("서울특별시" == d.properties.SIDO_NM) return path.bounds(d)[0][1] - 70 + fontSize/2 + label_padding_height
    //     if("경기도" == d.properties.SIDO_NM) return path.bounds(d)[0][1] - 50 + fontSize/2 + label_padding_height
    //     if("충청북도" == d.properties.SIDO_NM) return path.bounds(d)[0][1] - 50 + fontSize/2 + label_padding_height
    //     if("울산광역시" == d.properties.SIDO_NM) return path.bounds(d)[0][1] + 50 + fontSize/2 + label_padding_height
    //     if(["부산광역시", "경상남도", "전라남도"].includes(d.properties.SIDO_NM)) return path.bounds(d)[1][1]  + fontSize/2 + label_padding_height
    //     if("제주특별자치도" == d.properties.SIDO_NM) return path.centroid(d)[1] - 30 + fontSize/2 + label_padding_height
    //     else return path.bounds(d)[0][1] + fontSize/2 + label_padding_height
    //   });

    // label_g.selectAll("image")
    //   .attr("x", function(d) {
    //     if("서울특별시" == d.properties.SIDO_NM) return path.bounds(d)[0][0] - 90   + 1
    //     if("광주광역시" == d.properties.SIDO_NM) return path.bounds(d)[0][0] - 100  + 1
    //     if("충청남도" == d.properties.SIDO_NM) return path.bounds(d)[0][0] - 70  + 1
    //     if("전라북도" == d.properties.SIDO_NM) return path.bounds(d)[0][0] - 90  + 1
    //     if("충청북도" == d.properties.SIDO_NM) return path.bounds(d)[0][0] + 140  + 1
    //     if("경상남도" == d.properties.SIDO_NM) return path.bounds(d)[1][0] - 70  + 1
    //     if("울산광역시" == d.properties.SIDO_NM) return path.bounds(d)[1][0] + 50  + 1
    //     if("대구광역시" == d.properties.SIDO_NM) return path.bounds(d)[1][0] + 100  + 1
    //     if("세종특별자치시" == d.properties.SIDO_NM) return path.bounds(d)[1][0] + 150  + 1
    //     if("대전광역시" == d.properties.SIDO_NM) return path.bounds(d)[0][0] - 110 + label_padding_width  + 1
    //     if("경기도" == d.properties.SIDO_NM) return path.bounds(d)[0][0] + 30  + 1
    //     if("제주특별자치도" == d.properties.SIDO_NM) return path.bounds(d)[1][0] + 20 + label_padding_width
    //     if(["강원도", "경상북도", "부산광역시"].includes(d.properties.SIDO_NM)) return path.bounds(d)[1][0]   + 1
    //     else return path.bounds(d)[0][0]  + 1
    //   })
    //   .attr("y", function(d) { 
    //     if("서울특별시" == d.properties.SIDO_NM) return path.bounds(d)[0][1] - 70 + fontSize + label_padding_height* 2
    //     if("경기도" == d.properties.SIDO_NM) return path.bounds(d)[0][1] - 50 + fontSize + label_padding_height* 2
    //     if("충청북도" == d.properties.SIDO_NM) return path.bounds(d)[0][1] - 50 + fontSize + label_padding_height* 2
    //     if("울산광역시" == d.properties.SIDO_NM) return path.bounds(d)[0][1] + 50 + fontSize + label_padding_height* 2
    //     if(["부산광역시", "경상남도", "전라남도"].includes(d.properties.SIDO_NM)) return path.bounds(d)[1][1] + fontSize + label_padding_height* 2
    //     if("제주특별자치도" == d.properties.SIDO_NM) return path.centroid(d)[1] - 30 + fontSize + label_padding_height* 2
    //     else return path.bounds(d)[0][1] + fontSize + label_padding_height* 2
    //   })
    // const pointerCenter = {x: 20, y: 20};
    // label_g.selectAll("line")
    //   .append("line")
    //     .style("stroke", "black")   
    //     .attr("class","pointer")
    //     .attr("x1", d=> {
    //       if("경기도" == d.properties.SIDO_NM) return path.centroid(d)[0] + 15
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
    //       if("대전광역시" == d.properties.SIDO_NM) return path.bounds(d)[0][0] - 110 + label_padding_width + pointerCenter.x
    //       if("경기도" == d.properties.SIDO_NM) return path.bounds(d)[0][0] + 30 + 5 + pointerCenter.x
    //       if("제주특별자치도" == d.properties.SIDO_NM) return path.bounds(d)[1][0] + 20 + label_padding_width
    //       if(["강원도", "경상북도", "부산광역시"].includes(d.properties.SIDO_NM)) return path.bounds(d)[1][0] + pointerCenter.x
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
    //     });
    clickedBefore = d3.select("#PM2_5_" + this.currentSd);
    this.magnifyMap(width, height, path, this.currentSdObject, svg_group, 750);
    // v.$emit('sggHovered', this.currentSdObject)
  }
}
</script>

