<template lang="pug">
  table.table.menual-table
    thead
      tr
        th.main-title 대기건강지수
        th 
          img(src="../../assets/breath.png")
          p.img-subtitle
            | 심뇌혈관/
            br 
            | 호흡기/질환자
        th 
          img(src="../../assets/person.png")
          p.img-subtitle 
            | 영유아/학생/
            br
            | 어르신
        th 
          img(src="../../assets/foreign_worker.png")
          p.img-subtitle.mt-2 야외 근로자
        th 
          img(src="../../assets/nomal.png")
          p.img-subtitle.mt-2 일반 국민
    tbody
      tr
        td 
          p.mb-0 
            | 낮음
            br
            | (1~3)
          .stepBox
            .step.step-1
            .step.step-2
            .step.step-3
        td 특별히 행동에 제약을 받지 않습니다.
        td 특별히 행동에 제약을 받지 않습니다.
        td 특별히 행동에 제약을 받지 않습니다.
        td 특별히 행동에 제약을 받지 않습니다.
      tr
        td 
          p.mb-0 
            | 보통
            br
            | (4~6)
          .stepBox
            .step.step-4
            .step.step-5
            .step.step-6
        td 실외활동 시 특별히 행동에 제약을 받지는 않지만 몸 상태에 따라 유의하여 활동하세요
        td 특별히 행동에 제약을 받지 않습니다.
        td 특별히 행동에 제약을 받지 않습니다.
        td 특별히 행동에 제약을 받지 않습니다.
      tr
        td 
          p.mb-0 
            | 눂음
            br
            | (7)
          .stepBox
            .step.step-7
        td 장시간 또는 무리한 실외활동을 줄이세요. 해야 한다면 의사와 상의하세요.
        td 장시간 또는 무리한 실외활동을 줄이세요.
        td 특별히 행동에 제약을 받지 않습니다.
        td 특별히 행동에 제약을 받지 않습니다.
      tr
        td 
          p.mb-0 
            | 매우
            br
            | 눂음
            br
            | (8~10)
          .stepBox
            .step.step-8
            .step.step-9
            .step.step-10
        td 가급적 실내활동을 하세요. 실외활동을 최소화하세요.
        td 가급적 실내활동을 하시고 장시간 또는 무리한 실외활동을 최소화하세요.
        td 장시간 또는 무리한 실외활동을 줄이세요.
        td 장시간 또는 무리한 실외활동을 줄이세요.
      tr
        td 
          p.mb-0
            | 심각
            br
            | (10+)
          .stepBox
            .step.step-11
        td 최대한 실외 활동을 피하세요.
        td 가급적 실내활동을 하시고 최대한 실외활동을 피하세요.
        td 장시간 또는 무리한 실외활동을 줄이세요.
        td 장시간 또는 무리한 실외활동을 줄이세요.
</template>

<style lang="scss" scoped>
  .menual-table {
    background-color: white;
    .stepBox {
      .step {
        width: 33%;
        height: 10px;
        display: inline-block;
      }
    }
    thead {
      th {
        vertical-align: middle;
        padding: 20px 10px;
        background-color: rgb(231,245,255);
        border-right: 1px solid #dee2e6;
        border-bottom: 1px solid #dee2e6;
        width: 20%;
        &:first-child {
          width: 20%;
        }
        &:last-child {
          border-right: none;
        }
      }
      text-align: center;
      .main-title { 
        font-size: 16px;
      }
      .img-subtitle {
        font-size: 14px;
        margin-bottom: 0px;
      }
      img {
        width:40px;
        height:40px;
      }
    }
    tbody {
      tr {
        td {
          font-size: 14px;
          border-right: 1px solid #dee2e6;
          border-bottom: 1px solid #dee2e6;
          &:first-child {
            line-height: normal;
          }
          &:last-child {
            border-right: none;
          }
        }
      }
    }
  }
</style>
