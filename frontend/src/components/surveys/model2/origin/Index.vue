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
    )
    .container
      .row
        .col-md-12
          step-progress(:currentStep=3)
      .row
        .col-md-2
        .col-md-8.without_side_pd
          .h4.text-center
            b
              | 오늘의 지역별 하루 평균 PM
              sub.underText 2.5
          p.text-center.md-1.mt-1 일부 브라우저의 경우 부분적 깨짐이 발생할 수 있습니다.
          pmhealthMap.main-bg-color.map-border(
            v-on:sggHovered="onSggHovered"
            v-on:sggDeHovered="onSggDeHovered"
          )
        .col-md-2
      .text-center
        //- router-link(to="/survey/model2/question" class="btn btn-primary") 다음으로
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
      issue: "today_PM2_5",
      sggData: undefined,
      currentSgg: undefined,
      tooltipStyle: {},
      partRange: {
        good: [0, 15],
        notBad: [16,35],
        bad: [36,75],
        veryBad: [76,200]
      },
      mainTitle: null
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
          that.$router.push('/survey/model' + that.$store.getters.getModel + '/question');
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
      if (this.currentSgg.today_PM2_5 <= this.partRange.good[1] && this.currentSgg.today_PM2_5 >= this.partRange.good[0]) {
        this.tooltipStyle.assessColor = "m2_0"; 
        assess = "좋음";
      }
      if (this.currentSgg.today_PM2_5 <= this.partRange.notBad[1] && this.currentSgg.today_PM2_5 >= this.partRange.notBad[0]) {
        this.tooltipStyle.assessColor = "m2_1"; 
        assess = "보통";
      }
      if (this.currentSgg.today_PM2_5 <= this.partRange.bad[1] && this.currentSgg.today_PM2_5 >= this.partRange.bad[0]) {
        this.tooltipStyle.assessColor = "m2_2";
        assess = "나쁨";
      }
      if (this.currentSgg.today_PM2_5 <= this.partRange.veryBad[1] && this.currentSgg.today_PM2_5 >= this.partRange.veryBad[0]) {
        this.tooltipStyle.assessColor = "m2_3"; 
        assess = "매우나쁨";
      }
      this.tooltipStyle.position = "left:"+ data.positionX +"px;top:"+ data.positionY +"px;";
      this.mainTitle = "<b>" + this.currentSgg.today_PM2_5 + "</b> <b>μg/m<sup>3</sup></b><b>" + " (" + assess + ")" + "</b>";
    },
    // move(to) {
    //   location.replace(to)
    // }
  }
}
</script>
