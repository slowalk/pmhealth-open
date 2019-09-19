<template lang="pug">
  .container
    .row
      .col-md-12
        step-progress(:currentStep=3)
    .row
      .col-md-12
        h2.mt-5 오늘의 지역별 미세먼지 농도
        hr
        p 
          | (서울=투데이웨더뉴스) 정소화 기자
        p 한국환경공단에 따르면 오늘 오후 5시까지 하루 평균 미세먼지(PM2.5)는 서울(25㎍/㎥), 경기(28㎍/㎥), 대구(16㎍/㎥), 전북(35㎍/㎥), 제주(27㎍/㎥)에서만 '보통'(16∼35㎍/㎥)을 보였다. 충북(39㎍/㎥), 충남(70㎍/㎥), 세종(68㎍/㎥), 광주(40㎍/㎥), 부산(63㎍/㎥), 전남(70㎍/㎥), 울산(75㎍/㎥), 경남(42㎍/㎥) 은 '나쁨'(36∼75㎍/㎥) 수준이었다.
          br
          | 나머지 5개 지역인 강원, 대전, 인천, 경북 지역에서는 '매우 나쁨'(76㎍/㎥이상)이었다.
          br
          br
          |미세먼지(PM2.5) 농도는 '좋음'(0∼15㎍/㎥), '보통'(16∼35㎍/㎥), '나쁨'(36∼75㎍/㎥), '매우 나쁨'(76㎍/㎥ 이상)으로 나뉜다.
          br
          br
          | Todayweather1@todayweather.co.kr
        hr
        //- router-link(to="/survey/model1/question" class="btn btn-primary") 다음으로
        a(href="#" @click.prevent="move()" class="btn btn-primary") 다음으로
</template>

<script>
export default { 
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
  }
}
</script>