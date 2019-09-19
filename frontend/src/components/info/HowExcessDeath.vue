<template lang="pug">
  div
    static-header
    .content-row
      info-side-nav
      h2.page-title.page-title--mobile 관련페이지
      .content-body
        .desc-box.desc-box--long
          h5 초과사망자수는 어떻게 구하나요?
          br
          p 
            b - 초과사망자수란?
          p 초과사망자수는 특정 기간 동안 평균적으로 예상되는 사망자 수와 실제 사망자 수 사이의 차이를 의미합니다. 예를 들어, A지역의 초과 사망자수가 N일경우 A지역에서 대기오염으로 인해 사망하는 월별 사망자수는 N명입니다.
          br
          br

          p 
            b - 자료
          p 2012년 1월부터 2015년 12월까지 울릉도를 제외한 전국 시군구(250개) 월 평균 대기오염 농도와 월별 총 사망자수 자료를 이용하였습니다. 
          p 
            | 본 연구에서 고려한 대기오염 농도는 PM
            sub 10
            | , PM
            sub 2.5
            | , NO
            sub 2
            | 이며, 총 사망자 자료는 총 사망, 남자, 여자, 노인, 심뇌혈관 관련 사망, 호흡기 관련 사망의 각각에 대한 사망자수입니다. 기상자료 (평균 온도, 평균 습도, 평균 풍속)와 노령인구 자료 역시 고려하였습니다.
          br
          br

          p 
            b - 분석방법
          p 본 연구에서 고려하고 있는 미세먼지와 사망 자료는 지역별 월별 자료입니다. 
          p 이 자료들은 거리가 먼 지역들 보다는 가까운 지역들은 비슷한 미세먼지 농도와 사망자수를 가질 수 있으며, 이번 달의 미세먼지 농도와 사망자수는 몇 년 전 보다는 한 달 전과 비슷할 수 있습니다. 
          p 또한, 미세먼지와 사망자수간의 연관성은 지역마다 다르게 나타날 수 있습니다. 따라서 본 연구에서는 자료의 이러한 지역적, 시간적 특성을 반영한 베이지안 시공간 통계 모형을 고려하여 미세먼지와 사망 간의 연관성에 대한 연구를 진행하였습니다. 
          p 개발된 통계 모형의 적절성을 평가하기 위하여 2012년부터 2014년 자료를 이용하여 통계 모형을 개발하고, 개발된 통계 모형을 이용하여 2015년 월별 지역별 사망자수를 예측하여 기존 자료와의 비교를 진행하였습니다.
          br
          br
          .reference.mb-3
            p.mb-0 출처) Dwight DB, Yan L, Christopher SM, et a1. Forecasting United States heartworm 
            p.mb-0 Dirofilaria immitis prevalence in dogs. Parasites & Vectors 2016; 9:540

</template>

<style lang="scss" scoped>
</style>
