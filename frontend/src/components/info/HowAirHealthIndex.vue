<template lang="pug">
  div
    static-header
    .content-row
      info-side-nav
      h2.page-title.page-title--mobile 관련페이지
      .content-body
        .desc-box.desc-box--long
          h5 대기건강지수는 어떻게 구하나요?
          br
          p 
            b - 대기건강지수란?
          p 대기건강지수(AQHI, Air Quality Health Index)는 초과사망자수를 월 단위 대기오염 농도 별로 변환한 상대적인 점수입니다. 
          p 이번 달 우리 지역의 대기 오염이 단기적으로 건강에 위험을 얼마나 끼치는지 알 수 있으며, 건강 보호를 위한 행동요령을 쉽게 확인할 수 있습니다. 1부터 10+까지 지수로 계산하였으며, 5개의 범주(낮음, 보통, 높음, 매우 높음, 심각)로 구분하였습니다.
          br
          br

          .mb-5
            air-health-effect(:target-location="{}" ref="referLegend" :target-id="'referLegend'" :on-dot="false")

          p 
            b - 대기건강지수는 어떻게 계산 되었나요?
          p 지역과 시점에 따른 대기오염 초과사망자수를 초과사망자수의 최대값과의 비율로 나타내어 10점으로 조정하여 계산하였습니다. 
          p 
            | 이 때, 대기오염에는 PM
            sub 2.5
            | , PM
            sub 10
            | , NO
            sub 2
            | 를 포함하였으며, 초과사망자수의 최대값은 지역과 시점에 따른 초과사망자수의 가중 평균의 최대값으로 구하였습니다.
          br
          br

          p 
            b - 대기건강지수에 따라 어떻게 행동 해야 하나요?
          p 동일한 대기건강지수인 경우에도 개개인의 대기 오염 민감성에 따라 미세먼지 행동 요령은 달라집니다. 미세먼지 건강 취약계층, 실외 근로자, 일반 대중 별로 대기건강지수에 따른 미세먼지 행동 요령은 아래와 같습니다.
          br
          br
          .menual-table-wrapper
            menual-table
          .reference.mb-5
            p.mb-0 (출처: 미세먼지 행동요령 – 환경부, Wai, Wong Tze, et al. "A study of the air pollution index reporting system." 
            p.mb-0 Statistical Modelling 13 (2012): 15)
          .reference.mb-3
            p.mb-0 출처) David M. Stieb , Richard T. Burnett , Marc Smith-Doiron , Orly Brion , Hwashin Hyun Shin & Vanita Economou .2008. A New
            p.mb-0 Multipollutant, No-Threshold Air Quality Health Index Based on Short-Term Associations Observed in Daily Time-Series Analyses. 
            p.mb-0 Journal of the Air & Waste Management Association. ISSN: 1096-2247

</template>
<script>

import AirHealthEffect from '../common/AirHealthEffect';
import MenualTable from '../common/MenualTable';

export default {
  components: {
      AirHealthEffect,
      MenualTable
  },
  mounted() {
    this.$refs.referLegend.setAirHealthEffect();
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .menual-table-wrapper {
    overflow-x: scroll;
    .menual-table {
      min-width: 600px;
    }
  }
</style>
