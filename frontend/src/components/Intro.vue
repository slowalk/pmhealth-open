<template lang="pug">
  div
    .container-fluid
      .row.main-title-wrapper.color_white
        .col-md-12.text-center
          .container
            .row
              .col-md-12
                .main-title
                  b 우리나라 지역별
                  br
                  b 미세먼지 농도와 건강 영향 지도
                .underbar
                .under-main-title 연구책임자 황승식(서울대학교 보건대학원)
      .row.sub-title-wrapper.color_white
        .col-md-12
          .container
            .row
              .col-md-12
                h6.light-bold
                  | 본 연구(우리나라 미세먼지 등 대기오염 건강영향 연구 및 건강영향 지도구축)는 미세먼지 국가전략프로젝트의 일환으로 과학기술정보통신부 지원을 받아 수행하고 있습니다.
    .container
      .row
        .col-md-12
          hr.content-interval
          .list-title 지도제작 목적
          .list-item
            .list-bar
            p.list-text.middle-bold
              | 우리나라에서 활용 가능한 대기질 자료와 건강(질병)관련 자료를 이용하여 미세먼지 농도에 따른 건강영향의 규모를 파악하고, 건강피해 예방대책 수립 및 대책을 위한 과학적 근거로 활용할 수 있는 대기건강지수 확보
            .list-bar
            p.list-text.margin-btm-5.middle-bold 건강피해 예방정책 수립과 평가, 취약계층 건강피해 예방 및 피해 최소화 등 반영 가능한 전국단위, 시군구별 미세먼지 건강대응 정책에 활용
          hr.content-interval
          .list-title 지도제작 자료
          .list-item
            .list-bar
            p.list-text.middle-bold 우리나라 251개 시군구 기준
            .list-bar
            p.list-text.middle-bold 2012년-2013년도 지역별, 계절별
            .list-bar
            p.list-text.margin-btm-5.middle-bold
              | 대기오염 농도 자료(
              | PM
              sub.underText 10
              |               , PM
              sub.underText 2.5
              |               , NO
              sub.underText 2
              |               )
            .sub-list-tab
            p.sub-list-text 대기화학수송 모형으로 예측값, 실측값 보정 평균
            .list-bar
            p.list-text.margin-btm-5.middle-bold 사망 자료
            .sub-list-tab
            p.sub-list-text.margin-btm-5 지역별, 계절별 사망 상대위험도와 초과사망수 산출
            .sub-list-tab
            p.sub-list-text.margin-btm-5 평균기온, 평균습도, 평균풍속으로 기상 요인 보정
            .sub-list-tab
            p.sub-list-text.margin-btm-5 지역박탈지수로 사회 경제적 수준 보정
          hr.content-interval
          .list-title 지도 해석 방법
          .list-item
            .list-bar
            p.list-text.margin-btm-5.middle-bold 상대 위험도
            .sub-list-tab
            p.sub-list-text.margin-btm-5
              img.num_icon(src="../assets/num_1.png" alt="Num 1")
              |               탭에서 상대위험도를 선택한다
            .sub-list-tab
            p.sub-list-text.margin-btm-5
              img.num_icon(src="../assets/num_2.png" alt="Num 2")
              |               지도에서 지역을 선택한다
            .sub-list-tab
            p.sub-list-text.margin-btm-5
              img.num_icon(src="../assets/num_3.png" alt="Num 3")
              |               지역을 클릭하여 정보를 확인한다
            br
            br
            .text-center.margin-btm-30
              img(style="width: 49.3%; padding: 0px 5px 5px 0px;" src="../assets/img_1.png" alt="Img 1")
              img(style="width: 49.3%; padding: 0px 0px 5px 5px;" src="../assets/img_2.png" alt="Img 2")
              img(style="width: 99.22%; padding: 5px 0px 0px 0px;" src="../assets/img_3.png" alt="Img 3")
            p.list-text.margin-btm-5
              span.middle-bold 초과 사망자수
              span.sub-detail.margin-btm-5
                | 계절 평균
                | PM
                sub.underText 2.5
                |                 가 ㎍/㎥ 증가하면, 전체 사망자수가 100명 증가
            p.list-text.margin-btm-5
              span.middle-bold 상대 위험도 1.008
              span.sub-detail
                | 계절 평균
                | PM
                sub.underText 2.5
                |                 가 ㎍/㎥ 증가하면, 전체 사망위험이 0.8% 증가
          hr.content-interval

</template>
