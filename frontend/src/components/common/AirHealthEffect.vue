<template lang="pug">
  div
    svg(:ref="targetId" :id="targetId")
      g(v-if="targetLocation")
        g.step-1
          rect(fill="rgb(0,198,255)" height="17px" width="9%")
          text(text-anchor="middle" x="4.5%" y="35" :font-weight="onDot && Math.ceil(targetLocation.Index_total_PM10) == 1 ? 'bold' : 'normal'") 1
        g.step-2
          rect(fill="rgb(0,143,195)" height="17px" width="9%")
          text(text-anchor="middle" x="4.5%" y="35" :font-weight="onDot && Math.ceil(targetLocation.Index_total_PM10) == 2 ? 'bold' : 'normal'") 2
        g.step-3
          rect(fill="rgb(0,90,142)" height="17px" width="9%")
          text(text-anchor="middle" x="4.5%" y="35" :font-weight="onDot && Math.ceil(targetLocation.Index_total_PM10) == 3 ? 'bold' : 'normal'") 3
        g.step-4
          rect(fill="rgb(252,255,8)" height="17px" width="9%")
          text(text-anchor="middle" x="4.5%" y="35" :font-weight="onDot && Math.ceil(targetLocation.Index_total_PM10) == 4 ? 'bold' : 'normal'") 4
        g.step-5
          rect(fill="rgb(255,197,6)" height="17px" width="9%")
          text(text-anchor="middle" x="4.5%" y="35" :font-weight="onDot && Math.ceil(targetLocation.Index_total_PM10) == 5 ? 'bold' : 'normal'") 5
        g.step-6
          rect(fill="rgb(255,144,47)" height="17px" width="9%")
          text(text-anchor="middle" x="4.5%" y="35" :font-weight="onDot && Math.ceil(targetLocation.Index_total_PM10) == 6 ? 'bold' : 'normal'") 6
        g.step-7
          rect(fill="rgb(255,91,93)" height="17px" width="9%")
          text(text-anchor="middle" x="4.5%" y="35" :font-weight="onDot && Math.ceil(targetLocation.Index_total_PM10) == 7 ? 'bold' : 'normal'") 7
        g.step-8
          rect(fill="rgb(253,0,7)" height="17px" width="9%")
          text(text-anchor="middle" x="4.5%" y="35" :font-weight="onDot && Math.ceil(targetLocation.Index_total_PM10) == 8 ? 'bold' : 'normal'") 8
        g.step-9
          rect(fill="rgb(197,0,8)" height="17px" width="9%")
          text(text-anchor="middle" x="4.5%" y="35" :font-weight="onDot && Math.ceil(targetLocation.Index_total_PM10) == 9 ? 'bold' : 'normal'") 9
        g.step-10
          rect(fill="rgb(143,0,2)" height="17px" width="9%")
          text(text-anchor="middle" x="4.5%" y="35" :font-weight="onDot && Math.ceil(targetLocation.Index_total_PM10) == 10 ? 'bold' : 'normal'") 10
        g.step-11
          rect(fill="rgb(92,3,1)" height="17px" width="9%")
          text(text-anchor="middle" x="4.5%" y="35" :font-weight="onDot && Math.ceil(targetLocation.Index_total_PM10) > 10 ? 'bold' : 'normal'") 10+
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
</template>

<style lang="scss" scoped>
  svg {
    height: 80px;
    width: 100%;
  }
</style>


<script>
  export default {
    props: ["targetLocation", "targetId", "onDot"],
    methods: {
      setAirHealthEffect(value) {
        let arc = d3.svg.symbol().type('triangle-down').size(40);
        this.$nextTick(()=>{
          const airHealthEffectDotWidth = this.$refs[this.targetId].clientWidth;
          
          for(let i=0;i <= Array(10).length; i++) {
            d3.select(`#${this.targetId} g.step-${i+1}`)
              .attr("transform", `translate(${airHealthEffectDotWidth/11*i-i/2},12)`)
          }

          if(this.onDot) {
            //- dot
            const legendDot = d3.select(`#${this.targetId} .legend-dot`)
              // .attr("transform", `translate(${(value <= 10 ? value : 10.5) / 11 * airHealthEffectDotWidth },5)`)
              .attr("transform", `translate(${(value <= 10 ? Math.floor(value) + 0.5 : 10.5) / 11 * airHealthEffectDotWidth },5)`)
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

          }

          const StringWidth = 10, SpaceWidth = 5,
                group3 = airHealthEffectDotWidth/11*3-3/2,
                group1 = airHealthEffectDotWidth/11*1-1/2,
                LowGroupWidth = group3,
                NormalGroupWidth = group3,
                HighGroupWidth = group1,
                VeryHighGroupWidth = group3,
                SevereGroupWidth = group1;
                
          const legendRange = d3.select(`#${this.targetId} g.legend-range`)
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
      },
    } 
  }
</script>
