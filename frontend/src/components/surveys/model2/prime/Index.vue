<template lang="pug">
  div
    pmhealthTooltip(
      v-if="currentSgg"
      :issue="issue"
      :ANNUAL_PM2_5="currentSgg.ANNUAL_PM2_5"
      :benefit="currentSgg.benefit"
      :burden="currentSgg.burden"
      :cities_provinces="currentSgg.cities_provinces"
      :kor_cities_provinces="currentSgg.kor_cities_provinces"
      :today_PM2_5="currentSgg.today_PM2_5"
      :today_assess="currentSgg.today_assess"
      :tooltipStyle="tooltipStyle"
      :mainTitle="mainTitle"
      :pm2_5="pm2_5"
    )
    .container
      .row
        .col-md-12
          step-progress(:currentStep=6)
      .row
        .col-md-2
        .col-md-8.without_side_pd
          .h4.text-center
            b 초과사망자수
          pmhealthMap.main-bg-color.map-border(
            v-on:sggHovered="onSggHovered"
            v-on:sggDeHovered="onSggDeHovered"
          )
        .col-md-2
      .text-center
        //- router-link(to="/survey/model2/question/prime" class="btn btn-primary") 다음으로
        a(href="#" @click.prevent="move()" class="btn btn-primary") 다음으로
</template>
<script>
const testData = require("../../../../seed/surveyData.json");

import Map from "./Map";
import Tooltip from "../common/Tooltip";

export default {
  components: {
    pmhealthMap: Map,
    pmhealthTooltip: Tooltip
  },
  data () {
    return {
      issue: "burden",
      sggData: undefined,
      currentSgg: undefined,
      tooltipStyle: {},
      partRange: {
        good: [0, 600],
        notBad: [601,1200],
        bad: [1201,1800],
        veryBad: [1801,2400]
      },
      mainTitle: null,
      pm2_5: null,
    }
  },
  // mounted() {
  //   history.pushState(null, null, location.href);
  //   window.onpopstate = function () {
  //     history.go(1);
  //   };
  // },
  methods: {
    move() {
      const that = this;
      this.$alertify.confirmWithTitle("경고창", "이 페이지로 되돌아 올 수 없습니다. 계속하시겠습니까?",
        function(){
          that.$router.push('/survey/model' + that.$store.getters.getModel + '/question/prime');
        },
        function(){
          that.$toasted.error('취소하였습니다.');
        });
    },
    onSggHovered(data) {
      this.currentSgg = testData.filter((item) => {
        return String(item["SD_CD"]) === String(data.properties.SIDO_CD);
      })[0];
      this.setTooltipStyle(data)
    },
    onSggDeHovered() {
      this.currentSgg = undefined;
    },
    setTooltipStyle(data) {
      let assess;
      const burden = Math.round(this.currentSgg.burden);
      if (burden <= this.partRange.good[1] && burden >= this.partRange.good[0]) {
        this.tooltipStyle.assessColor = "m2_0"; 
        assess = "좋음";
      }
      if (burden <= this.partRange.notBad[1] && burden >= this.partRange.notBad[0]) {
        this.tooltipStyle.assessColor = "m2_1"; 
        assess = "보통";
      }
      if (burden <= this.partRange.bad[1] && burden >= this.partRange.bad[0]) {
        this.tooltipStyle.assessColor = "m2_2";
        assess = "나쁨";
      }
      if (burden <= this.partRange.veryBad[1] && burden >= this.partRange.veryBad[0]) {
        this.tooltipStyle.assessColor = "m2_3"; 
        assess = "매우나쁨";
      }
      this.tooltipStyle.position = "left:"+ data.positionX +"px;top:"+ data.positionY +"px;";      
      this.mainTitle = "<b>초과사망자수 : " + burden + "명 (" + assess + ")" + "</b>";
      this.pm2_5 = "<b>하루 평균 PM<sub class='underText'>2.5</sub> : " + this.currentSgg.today_PM2_5 + "μg/m<sup>3</sup></b>";
    }
  }
}
</script>