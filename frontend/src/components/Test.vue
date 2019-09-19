<template lang="pug">
  div
    svg#air-health-effect-dot(ref="airHealthEffectDotWidth")
      g
        g.step-1
          rect(fill="rgb(0,198,255)" height="17px" width="9%")
          text(text-anchor="middle" x="4.5%" y="35" :font-weight="Math.ceil(3) == 1 ? 'bold' : 'normal'") 1
        g.step-2
          rect(fill="rgb(0,143,195)" height="17px" width="9%")
          text(text-anchor="middle" x="4.5%" y="35" :font-weight="Math.ceil(3) == 2 ? 'bold' : 'normal'") 2
        g.step-3
          rect(fill="rgb(0,90,142)" height="17px" width="9%")
          text(text-anchor="middle" x="4.5%" y="35" :font-weight="Math.ceil(3) == 3 ? 'bold' : 'normal'") 3
        g.step-4
          rect(fill="rgb(252,255,8)" height="17px" width="9%")
          text(text-anchor="middle" x="4.5%" y="35" :font-weight="Math.ceil(3) == 4 ? 'bold' : 'normal'") 4
        g.step-5
          rect(fill="rgb(255,197,6)" height="17px" width="9%")
          text(text-anchor="middle" x="4.5%" y="35" :font-weight="Math.ceil(3) == 5 ? 'bold' : 'normal'") 5
        g.step-6
          rect(fill="rgb(255,144,47)" height="17px" width="9%")
          text(text-anchor="middle" x="4.5%" y="35" :font-weight="Math.ceil(3) == 6 ? 'bold' : 'normal'") 6
        g.step-7
          rect(fill="rgb(255,91,93)" height="17px" width="9%")
          text(text-anchor="middle" x="4.5%" y="35" :font-weight="Math.ceil(3) == 7 ? 'bold' : 'normal'") 7
        g.step-8
          rect(fill="rgb(253,0,7)" height="17px" width="9%")
          text(text-anchor="middle" x="4.5%" y="35" :font-weight="Math.ceil(3) == 8 ? 'bold' : 'normal'") 8
        g.step-9
          rect(fill="rgb(197,0,8)" height="17px" width="9%")
          text(text-anchor="middle" x="4.5%" y="35" :font-weight="Math.ceil(3) == 9 ? 'bold' : 'normal'") 9
        g.step-10
          rect(fill="rgb(143,0,2)" height="17px" width="9%")
          text(text-anchor="middle" x="4.5%" y="35" :font-weight="Math.ceil(3) == 10 ? 'bold' : 'normal'") 10
        g.step-11
          rect(fill="rgb(92,3,1)" height="17px" width="9%")
          text(text-anchor="middle" x="4.5%" y="35" :font-weight="Math.ceil(3) > 10 ? 'bold' : 'normal'") 10+
        g.legend-dot
          path
          line
      
      
      g.legend-range
        //- 낮음
        g.low
          line.vt-line(y1="-12" y2="2" style="stroke:silver;stroke-width:1;")
          line.hr-line-left(y1="-5" y2="-5" style="stroke:silver;stroke-width:1;")
          text.value(text-anchor="middle") 낮음
          line.hr-line-right(y1="-5" y2="-5" style="stroke:silver;stroke-width:1;")
        
        //- 보통
        g.normal
          line.vt-line(y1="-12" y2="2" style="stroke:silver;stroke-width:1;")
          line.hr-line-left( y1="-5" y2="-5" style="stroke:silver;stroke-width:1;")
          text.value(text-anchor="middle") 보통
          line.hr-line-right( y1="-5" y2="-5" style="stroke:silver;stroke-width:1;")
        
        //- 높음
        g.high
          line.vt-line(y1="-12" y2="2" style="stroke:silver;stroke-width:1;")
          line.hr-line-left( y1="-5" y2="-5" style="stroke:silver;stroke-width:1;")
          text.value(text-anchor="middle") 높음
          line.hr-line-right( y1="-5" y2="-5" style="stroke:silver;stroke-width:1;")
        
        //- 매우 높음
        g.very-high
          line.vt-line(y1="-12" y2="2" style="stroke:silver;stroke-width:1;")
          line.hr-line-left( y1="-5" y2="-5" style="stroke:silver;stroke-width:1;")
          text.value(text-anchor="middle") 매우 높음
          line.hr-line-right( y1="-5" y2="-5" style="stroke:silver;stroke-width:1;")
        
        //- 심각
        g.severe
          line.vt-line-left(y1="-12" y2="2" style="stroke:silver;stroke-width:1;")
          line.hr-line-left( y1="-5" y2="-5" style="stroke:silver;stroke-width:1;")
          text.value(text-anchor="middle") 심각
          line.hr-line-right( y1="-5" y2="-5" style="stroke:silver;stroke-width:1;")
          line.vt-line-right(y1="-12" y2="2" style="stroke:silver;stroke-width:1;")

    #month-dust-average-graph

    svg.donut(width='300', height='300', viewBox='0 0 42 42')
      circle.donut-hole(cx='21', cy='21', r='18', fill='#fff')
      circle.donut-ring(cx='21', cy='21', r='18', fill='transparent', stroke='#d2d3d4', stroke-width='1.5')
      circle.donut-segment(cx="21" cy="21" r="18" fill="transparent" stroke="rgb(0,198,255)" stroke-width="1.5" stroke-dasharray="9 102" stroke-dashoffset="-85")
      circle.donut-segment(cx="21" cy="21" r="18" fill="transparent" stroke="rgb(0,143,195)" stroke-width="1.5" stroke-dasharray="9 102" stroke-dashoffset="-95")
      circle.donut-segment(cx="21" cy="21" r="18" fill="transparent" stroke="rgb(0,90,142)" stroke-width="1.5" stroke-dasharray="9 102" stroke-dashoffset="-105")
      circle.donut-segment(cx="21" cy="21" r="18" fill="transparent" stroke="rgb(252,255,8)" stroke-width="1.5" stroke-dasharray="9 102" stroke-dashoffset="-115")
      circle.donut-segment(cx="21" cy="21" r="18" fill="transparent" stroke="rgb(255,197,6)" stroke-width="1.5" stroke-dasharray="9 102" stroke-dashoffset="-125")
      circle.donut-segment(cx="21" cy="21" r="18" fill="transparent" stroke="rgb(255,144,47)" stroke-width="1.5" stroke-dasharray="9 102" stroke-dashoffset="-135")
      circle.donut-segment(cx="21" cy="21" r="18" fill="transparent" stroke="rgb(255,91,93)" stroke-width="1.5" stroke-dasharray="9 102" stroke-dashoffset="-145")
      circle.donut-segment(cx="21" cy="21" r="18" fill="transparent" stroke="rgb(253,0,7)" stroke-width="1.5" stroke-dasharray="9 102" stroke-dashoffset="-155")
      circle.donut-segment(cx="21" cy="21" r="18" fill="transparent" stroke="rgb(197,0,8)" stroke-width="1.5" stroke-dasharray="9 102" stroke-dashoffset="-165")
      circle.donut-segment(cx="21" cy="21" r="18" fill="transparent" stroke="rgb(143,0,2)" stroke-width="1.5" stroke-dasharray="10 102" stroke-dashoffset="-176")
      circle.donut-segment(cx="21" cy="21" r="18" fill="transparent" stroke="rgb(92,3,1)" stroke-width="1.5" stroke-dasharray="9 103" stroke-dashoffset="-187")


      //- circle.donut-segment(cx='21', cy='21', r='20', fill='transparent', stroke='rgb(0,198,255)', stroke-width='1', stroke-dasharray='9 91', stroke-dashoffset='-69')
      //- circle.donut-segment(cx='21', cy='21', r='20', fill='transparent', stroke='rgb(0,143,195)', stroke-width='1', stroke-dasharray='9 91', stroke-dashoffset='-78')
      //- circle.donut-segment(cx='21', cy='21', r='20', fill='transparent', stroke='rgb(0,90,142)', stroke-width='1', stroke-dasharray='9 91', stroke-dashoffset='-87')
      //- circle.donut-segment(cx='21', cy='21', r='20', fill='transparent', stroke='rgb(252,255,8)', stroke-width='1', stroke-dasharray='9 91', stroke-dashoffset='0')
      //- circle.donut-segment(cx='21', cy='21', r='20', fill='transparent', stroke='rgb(255,197,6)', stroke-width='1', stroke-dasharray='9 91', stroke-dashoffset='-9')
      //- circle.donut-segment(cx='21', cy='21', r='20', fill='transparent', stroke='rgb(255,144,47)', stroke-width='1', stroke-dasharray='9 91', stroke-dashoffset='-18')
      //- circle.donut-segment(cx='21', cy='21', r='20', fill='transparent', stroke='rgb(255,91,93)', stroke-width='1', stroke-dasharray='9 91', stroke-dashoffset='-27')
      //- circle.donut-segment(cx='21', cy='21', r='20', fill='transparent', stroke='rgb(253,0,7)', stroke-width='1', stroke-dasharray='9 91', stroke-dashoffset='-36')
      //- circle.donut-segment(cx='21', cy='21', r='20', fill='transparent', stroke='rgb(197,0,8)', stroke-width='1', stroke-dasharray='9 91', stroke-dashoffset='-45')
      //- circle.donut-segment(cx='21', cy='21', r='20', fill='transparent', stroke='rgb(143,0,2)', stroke-width='1', stroke-dasharray='9 91', stroke-dashoffset='-54')
      //- circle.donut-segment(cx='21', cy='21', r='20', fill='transparent', stroke='rgb(92,3,1)', stroke-width='1', stroke-dasharray='9 91', stroke-dashoffset='-60')


      //- circle.donut-segment(cx='21', cy='21', r='15', fill='transparent', stroke='rgb(0,198,255)', stroke-width='1', stroke-dasharray='9 91', stroke-dashoffset='9')
      //- circle.donut-segment(cx='21', cy='21', r='15', fill='transparent', stroke='rgb(0,143,195)', stroke-width='1', stroke-dasharray='9 91', stroke-dashoffset='18')
      //- circle.donut-segment(cx='21', cy='21', r='15', fill='transparent', stroke='rgb(0,90,142)', stroke-width='1', stroke-dasharray='9 91', stroke-dashoffset='-87')
      //- circle.donut-segment(cx='21', cy='21', r='15', fill='transparent', stroke='rgb(252,255,8)', stroke-width='1', stroke-dasharray='9 91', stroke-dashoffset='-96')
      //- circle.donut-segment(cx='21', cy='21', r='15', fill='transparent', stroke='rgb(255,197,6)', stroke-width='1', stroke-dasharray='9 91', stroke-dashoffset='-105')
      //- circle.donut-segment(cx='21', cy='21', r='15', fill='transparent', stroke='rgb(255,144,47)', stroke-width='1', stroke-dasharray='9 91', stroke-dashoffset='-114')
      //- circle.donut-segment(cx='21', cy='21', r='15', fill='transparent', stroke='rgb(255,91,93)', stroke-width='1', stroke-dasharray='9 91', stroke-dashoffset='-123')
      //- circle.donut-segment(cx='21', cy='21', r='15', fill='transparent', stroke='rgb(253,0,7)', stroke-width='1', stroke-dasharray='9 91', stroke-dashoffset='-132')
      //- circle.donut-segment(cx='21', cy='21', r='15', fill='transparent', stroke='rgb(197,0,8)', stroke-width='1', stroke-dasharray='9 91', stroke-dashoffset='-141')
      //- circle.donut-segment(cx='21', cy='21', r='15', fill='transparent', stroke='rgb(143,0,2)', stroke-width='1', stroke-dasharray='9 91', stroke-dashoffset='-150')
      //- circle.donut-segment(cx='21', cy='21', r='15', fill='transparent', stroke='rgb(92,3,1)', stroke-width='1', stroke-dasharray='9 91', stroke-dashoffset='-159')


      //- <circle class="donut-segment" cx="21" cy="21" r="18" fill="transparent" stroke="rgb(0,198,255)" stroke-width="1.5" stroke-dasharray="9 91" stroke-dashoffset="0"></circle>
      //-           <circle class="donut-segment" cx="21" cy="21" r="18" fill="transparent" stroke="rgb(0,143,195)" stroke-width="1.5" stroke-dasharray="9 91" stroke-dashoffset="9"></circle>
      //-           <circle class="donut-segment" cx="21" cy="21" r="18" fill="transparent" stroke="rgb(0,90,142)" stroke-width="1.5" stroke-dasharray="9 91" stroke-dashoffset="18"></circle>
      //-           <circle class="donut-segment" cx="21" cy="21" r="18" fill="transparent" stroke="rgb(252,255,8)" stroke-width="1.5" stroke-dasharray="9 91" stroke-dashoffset="27"></circle>
      //-           <circle class="donut-segment" cx="21" cy="21" r="18" fill="transparent" stroke="rgb(255,197,6)" stroke-width="1.5" stroke-dasharray="9 91" stroke-dashoffset="36"></circle>
      //-           <circle class="donut-segment" cx="21" cy="21" r="18" fill="transparent" stroke="rgb(255,144,47)" stroke-width="1.5" stroke-dasharray="9 91" stroke-dashoffset="45"></circle>
      //-           <circle class="donut-segment" cx="21" cy="21" r="18" fill="transparent" stroke="rgb(255,91,93)" stroke-width="1.5" stroke-dasharray="9 91" stroke-dashoffset="54"></circle>
      //-           <circle class="donut-segment" cx="21" cy="21" r="18" fill="transparent" stroke="rgb(253,0,7)" stroke-width="1.5" stroke-dasharray="9 91" stroke-dashoffset="63"></circle>
      //-           <circle class="donut-segment" cx="21" cy="21" r="18" fill="transparent" stroke="rgb(197,0,8)" stroke-width="1.5" stroke-dasharray="9 91" stroke-dashoffset="72"></circle>
      //-           <circle class="donut-segment" cx="21" cy="21" r="18" fill="transparent" stroke="rgb(143,0,2)" stroke-width="1.5" stroke-dasharray="9 91" stroke-dashoffset="81"></circle>
      //-           <circle class="donut-segment" cx="21" cy="21" r="18" fill="transparent" stroke="rgb(92,3,1)" stroke-width="1.5" stroke-dasharray="9 91" stroke-dashoffset="90"></circle>


      //- // unused 10%
      //- g.chart-text(style="font-size: 5px;")
        text.chart-number(x='50%', y='50%')
          | 10
        text.chart-label(x='50%', y='50%')
          | Beers

    .mapMarkerlabelWrapper.text-center
      p.label.top-label.sd_nm  서울특별시 
    .mapMarkerWrapperOver(style='background-color: white; margin: auto;')
      p.inCurcle
        span.title 대기건강지수
        br
        span.overdeath_value  9 
        br
    .mapMarkerlabelWrapper.text-center
      p.label.bottom-label.sd_nm  10㎍/㎥ 

</template>

<script>
import {bb} from 'billboard.js';

export default {
  
  mounted() {
    
    var chart = bb.generate({
      data: {
        x: "x",
        columns: [
          ["x", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          ["PM 2.5", 30, 200, 100, 400, 150, 250, 400, 150, 250, 400, 150, 250],
        ],
        type: "area-spline"
      },
      axis: {
        x: {
          type: "category",
          tick: {
            centered: true,
            // values: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
          }
        }
      },
      size: {
        width: window.innerWidth - 600 - 60
      },
      padding: {
        left: 60,
        right: 20,
        top: 30
      },
      bindto: "#month-dust-average-graph"
    });
    this.setAirHealthEffectDot(3);
  },

  methods: {

    setAirHealthEffectDot(value) {
      let arc = d3.svg.symbol().type('triangle-down').size(40);
      this.$nextTick(function () {
        const airHealthEffectDotWidth = this.$refs.airHealthEffectDotWidth.clientWidth;
        for(let i=0;i <= Array(10).length; i++) {
          d3.select(`#air-health-effect-dot g.step-${i+1}`)
            .attr("transform", `translate(${airHealthEffectDotWidth/11*i-i/2},12)`)
        }

        //- dot
        const legendDot = d3.select("#air-health-effect-dot .legend-dot")
          .attr("transform", `translate(${(value <= 10 ? value : 10.5) / 11 * airHealthEffectDotWidth },5)`)
        legendDot.select("path")
          .attr('d',arc)
          .attr('fill', "rgb(47,48,56)")
          .attr("transform", `translate(0,5)`);
        legendDot.select("line")
          .attr("x1", 0)
          .attr("y1", 28)
          .attr("x2", 0)
          .attr("y2", 5)
          .attr("stroke-width", 1)
          .attr("stroke", "rgb(47,48,56)");

        const StringWidth = 10, SpaceWidth = 5,
              group3 = airHealthEffectDotWidth/11*3-3/2,
              group1 = airHealthEffectDotWidth/11*1-1/2,
              LowGroupWidth = group3,
              NormalGroupWidth = group3,
              HighGroupWidth = group1,
              VeryHighGroupWidth = group3,
              SevereGroupWidth = group1;
              
        const legendRange = d3.select("#air-health-effect-dot g.legend-range")
                              .attr("transform", `translate(0,65)`),
              legendRangeLow = legendRange.select("g.low"),
              legendRangeNormal = legendRange.select("g.normal"),
              legendRangeHigh = legendRange.select("g.high"),
              legendRangeVeryHigh = legendRange.select("g.very-high"),
              legendRangeSevere = legendRange.select("g.severe");


        const LowGroupWidthHalf = LowGroupWidth/2;
        legendRangeLow.select("line.vt-line")
                      .attr("x1", 0)
                      .attr("x2", 0)
        legendRangeLow.select("line.hr-line-left")
                      .attr("x1", 0)
                      .attr("x2", LowGroupWidthHalf - StringWidth - SpaceWidth)
        legendRangeLow.select("text.value")
                      .attr("x", LowGroupWidthHalf)
        legendRangeLow.select("line.hr-line-right")
                      .attr("x1", LowGroupWidthHalf + StringWidth + SpaceWidth)
                      .attr("x2", LowGroupWidth)

        const Low_Normal = LowGroupWidth + NormalGroupWidth,
              Low_NormalGroupWidthHalf = LowGroupWidth + NormalGroupWidth/2;
        legendRangeNormal.select("line.vt-line")
                      .attr("x1", LowGroupWidth)
                      .attr("x2", LowGroupWidth)
        legendRangeNormal.select("line.hr-line-left")
                      .attr("x1", LowGroupWidth)
                      .attr("x2", Low_NormalGroupWidthHalf - StringWidth - SpaceWidth)
        legendRangeNormal.select("text.value")
                      .attr("x", Low_NormalGroupWidthHalf)
        legendRangeNormal.select("line.hr-line-right")
                      .attr("x1", Low_NormalGroupWidthHalf + StringWidth + SpaceWidth)
                      .attr("x2", Low_Normal)
        
        const Low_Normal_High = Low_Normal + HighGroupWidth,
              Low_Normal_HighGroupWidthHalf = Low_Normal + HighGroupWidth/2;
        legendRangeHigh.select("line.vt-line")
                      .attr("x1", Low_Normal)
                      .attr("x2", Low_Normal)
        legendRangeHigh.select("line.hr-line-left")
                      .attr("x1", Low_Normal)
                      .attr("x2", Low_Normal_HighGroupWidthHalf - StringWidth - SpaceWidth)
        legendRangeHigh.select("text.value")
                      .attr("x", Low_Normal_HighGroupWidthHalf)
        legendRangeHigh.select("line.hr-line-right")
                      .attr("x1", Low_Normal_HighGroupWidthHalf + StringWidth + SpaceWidth)
                      .attr("x2", Low_Normal_High)
          
        const Low_Normal_High_VeryHigh = Low_Normal_High + VeryHighGroupWidth,
              Low_Normal_High_VeryHighGroupWidthHalf = LowGroupWidth + NormalGroupWidth + HighGroupWidth + VeryHighGroupWidth/2;
        legendRangeVeryHigh.select("line.vt-line")
                      .attr("x1", Low_Normal_High)
                      .attr("x2", Low_Normal_High)
        legendRangeVeryHigh.select("line.hr-line-left")
                      .attr("x1", Low_Normal_High)
                      .attr("x2", Low_Normal_High_VeryHighGroupWidthHalf - StringWidth * 2 - SpaceWidth * 2)
        legendRangeVeryHigh.select("text.value")
                      .attr("x", Low_Normal_High_VeryHighGroupWidthHalf)
        legendRangeVeryHigh.select("line.hr-line-right")
                      .attr("x1", Low_Normal_High_VeryHighGroupWidthHalf + StringWidth * 2 + SpaceWidth * 2)
                      .attr("x2", Low_Normal_High_VeryHigh)

        const Low_Normal_High_VeryHigh_Severe = Low_Normal_High_VeryHigh + SevereGroupWidth,
              Low_Normal_High_VeryHigh_SevereGroupWidthHalf = LowGroupWidth + NormalGroupWidth + HighGroupWidth + VeryHighGroupWidth + SevereGroupWidth/2;
        legendRangeSevere.select("line.vt-line-left")
                      .attr("x1", Low_Normal_High_VeryHigh)
                      .attr("x2", Low_Normal_High_VeryHigh)
        legendRangeSevere.select("line.hr-line-left")
                      .attr("x1", Low_Normal_High_VeryHigh)
                      .attr("x2", Low_Normal_High_VeryHigh_SevereGroupWidthHalf - StringWidth - SpaceWidth)
        legendRangeSevere.select("text.value")
                      .attr("x", Low_Normal_High_VeryHigh_SevereGroupWidthHalf)
        legendRangeSevere.select("line.hr-line-right")
                      .attr("x1", Low_Normal_High_VeryHigh_SevereGroupWidthHalf + StringWidth + SpaceWidth)
                      .attr("x2", Low_Normal_High_VeryHigh_Severe)
        legendRangeSevere.select("line.vt-line-right")
                      .attr("x1", Low_Normal_High_VeryHigh_Severe)
                      .attr("x2", Low_Normal_High_VeryHigh_Severe)
        
          
      });
    }
  }
}
</script>


<style lang="scss">
  @import 'billboard.js/dist/theme/insight.min.css';

  #air-health-effect-dot {
    height: 80px;
    width: 540px;
    margin: 10px;
  }
  .mapMarkerlabelWrapper { 
    .label {
      font-size: 13px;
      border-radius: 12px;
      display: table;
      padding: 0px 6px;
      margin: 3px auto;
      &.top-label {
        background-color: white;
        color: black;
      }
      &.bottom-label {
        background-color: #3a3b42;
        color: white;
      }
    }
  }
  .mapMarkerWrapper {
    box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 5px 1px;
    border-radius: 50%;
    height: 45px;
    width: 45px;
    text-align: center;
    p {
      line-height: 14px; 
      margin: 0px;
      font-size: 11px;
      padding-top: 7px;
      // color: rgba(255,255,255,0.8);
    }
  }
</style>
