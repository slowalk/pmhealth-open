<template lang="pug">
  div
    static-header
    .content-row
      info-side-nav
      h2.page-title.page-title--mobile 관련페이지
      .content-body
        .desc-box.desc-box--long
          h5 미세먼지 농도는 어떻게 구하나요?
          br
          p 
            b - 자료
          p 
            | PM
            sub 10
            | , PM
            sub 2.5
            | , NO
            sub 2
            | 을 대상으로 화학수송모델의 자료 동화 기법을 적용하였습니다. 노출 농도 산출 기간은 2012년 1월부터 2015년 12월까지이며, 울릉도를 제외한 전국 250개 시군구의 월 평균 농도를 산출하였습니다.
          br
          br

          p 
            b - 분석방법
          p 대기오염물질의 노출농도는 화학수송모델로 계산하였으며, 대기질 측정소의 측정자료를 이용하여 모델계산 결과와 측정값의 오차를 보정하는 자료동화(Pun′s Interpolation)를 적용하였습니다.
          p 화학수송모델은 기상모델인 WRF(Weather Research Forecasting), 배출량 모델인 SMOKE(Sparse Matrix Operator Kernel Emssions Modeling System), 대기오염물질의 반응, 이동, 확산을 계산하는 CMAQ(Community Multiscale Air Quality)으로 구성하였습니다.
          p 기상모델의 입력자료는 전 지구의 예보모델 결과인(GFS, Global Forecasting System)입니다. 
          p 배출량모델의 입력자료는 동아시아배출량(INTEX-B) 및 국내 배출량(환경부 CAPSS 배출량) 자료를 근거로 기상 모델의 결과가 입력되어 SMOKE을 이용하여 시간별, 화학종별 분류된 모델링 배출량 자료를 생성합니다. 
          p 화학수송모델의 입력자료는 기상모델의 계산 결과와 분류된 배출량 자료를 입력자료로 화학수송모델인 CMAQ 모델을 수행하여 대기오염물질의 농도를 계산합니다. 모델의 결과는 한반도 지역을 대상으로 9km 간격의 격자로 계산합니다. 
          p 모델결과와 대기질 측정소의 측정결과와의 차이를 줄이기 위해 자료동화를 적용하였습니다. 9km 격자별로 계산된 시간 농도를 월평균을 산정하고, 전국 시군구로 분할하여 면적 가중평균으로 최종 250개의 시군구 월평균 농도를 산출하였습니다.
          br
          .text-center.mt-4
            img.refer-img(src="../../img/howFineDust_chart_2x.png")
          br
          br
          .reference.mb-3
            p.mb-0 출처) [1] Cressman, G.P., 1959, An Operational Objective Analysis System, An Operational Objective Anaylysis System, Mon. 
            p.mb-0 Wea. Rev., 87, 367-374. [2] Bergthorsson, P. and Doos, B.R., 1955. Numerical Weather Map Analysis, Tellus, VII(3). [3] Pun, 
            p.mb-0 K. and Seigneur C., 2006, Using CMAQ to interpolate among CASTNET measurements, CMAS conference 2006.

</template>