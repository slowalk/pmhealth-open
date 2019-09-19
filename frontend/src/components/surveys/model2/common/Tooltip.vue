<template lang="pug">
  #tooltipPositioner.border(:class="tooltipStyle.assessColor")
    #tooltip
      #tooltipContainer
        span.headerTitle(v-html="headerTitle")
        hr

        b-row
          b-col
            p.mainColor.mainTitle(v-html="mainTitle")
            p.mainTitle(v-html="pm2_5")
            //- .cigarWrapper(ref="cigarWrapper" v-if="issue == 'today_PM2_5'")
              b-img(:src='require("../../../../assets/cigar" + Math.ceil(this.today_PM2_5/22) + ".png")' class="cigarCount")
        //- b-row
          b-col(v-if="issue == 'today_PM2_5'")
            p.subTitle.margin-5 
              b
                | &#183; 
                | 연 평균 : {{ANNUAL_PM2_5}} μg/m
                sup 3
          //- b-col(v-else)
            p.subTitle.margin-5 
              b &#183; 초과사망자수 : {{burden}} 명
</template>

<script>
  export default {
    name: 'pmhealthTooltip',
    props: [
      "ANNUAL_PM2_5",
      "benefit",
      "burden",
      "cities_provinces",
      "kor_cities_provinces",
      "today_PM2_5",
      "today_assess",
      "tooltipStyle",
      "issue",
      "mainTitle",
      "pm2_5"
    ],
    data() {
      return {
        headerTitle: null
      }
    },
    mounted() { 
      // if(this.issue=="today_PM2_5") return this.headerTitle = "오늘의 " + this.kor_cities_provinces + " <b class='issue'>PM<sub class='underText'> 2.5</sub></b>"
      // if(this.issue=="burden") return this.headerTitle = this.kor_cities_provinces;
      return this.headerTitle = this.kor_cities_provinces;
      // console.log(this.headerTitle)
    }
  }
</script>

<style lang="scss">
  @-webkit-keyframes slide {
    from {
      max-width: 0%;
    }
    to { 
      max-width: 100%;
    }
  }

  @keyframes slide {
    from {
      max-width: 0%;
    }
    to { 
      max-width: 100%; 
    }
  }
  #tooltipPositioner {
    min-width:500px !important;
    position: fixed;
    z-index: 10;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 5px;
    // border: 1px solid silver;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    pointer-events: all;
    font-size:13px;
    padding: 27px 33px;
    .subTitle {
      font-size: 20px;
    }
    .headerTitle {
      font-size: 20px;
      font-weight: 700;
    }
    .mainTitle {
      font-size: 25px;
    }
    p {
      margin: 0px;
    }
    .margin-5 {
      margin-top: 5px !important;
      margin-bottom: 5px !important;
    }
    
    .cigarWrapper {
      img {
        margin-top: 10px;
        margin-right: 10px;
        height:20px;
        -webkit-animation-name: slide; /* Safari 4.0 - 8.0 */
        -webkit-animation-duration: 4s; /* Safari 4.0 - 8.0 */
        animation-name: slide;
        animation-duration: 1s;
      }
    }
  }

  @media only screen and (max-width: 450px) {
    #tooltipPositioner {
      min-width:310px !important;
      font-size:11px;
      padding: 5px 10px;
      .mainTitle {
        font-size: 17px;
      }
      .subTitle {
        font-size: 13px;
      }
      hr {
        margin: 7px 0px;
      }
    }
  }
</style>
