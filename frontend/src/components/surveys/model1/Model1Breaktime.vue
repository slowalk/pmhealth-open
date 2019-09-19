<template lang="pug">
  .text-center
    step-progress(:currentStep=5)
    p 동영상을 다 시청하여야 다음페이지로 넘어갈 수 있는 버튼이 나타납니다.
    p 영상 내의 다른 영상을 클릭하지 마세요. 자칫 설문을 처음부터 진행하실 수도 있습니다.
    youtube(video-id="pBuZEGYXA6E" player-height='500' player-width='100%' :player-vars="{autoplay: 1, controls: 0, disablekb: 1, rel: 0}" @paused="paused()" @ended="endVideo()")
    br
    //- router-link(to="/survey/model1/question" class="btn btn-secondary") 이전으로
    router-link(to="/survey/model1/prime" class="btn btn-primary" ref="nextBtn") (임시)다음으로
    router-link(to="/survey/model1/prime" class="btn btn-primary" :class="{hidden : nextBtnActice}" ref="nextBtn") 다음으로
    // a(@click.prevent="move('/survey/model1/prime')" class="btn btn-primary") 다음으로
</template>
  
<script>
  export default {
    data() {
      return {
        autoplay: 1,
        nextBtnActice: true,
      }
    },
    // mounted() {
    //   history.pushState(null, null, location.href);
    //   window.onpopstate = function () {
    //     history.go(1);
    //   };
    // },
    methods: {
      paused () {
        this.$alertify.alertWithTitle("경고창", "비디오가 다 끝날때까지 기다려주세요.")
      },
      endVideo () {
        this.nextBtnActice = false
        this.$alertify.confirmWithTitle("경고창", "다음 단계로 넘어가시겠습니까?", 
          () => {this.$router.push("/survey/model1/prime")},
          () => {this.$toasted.show("다음으로 버튼을 클릭해주세요")}
        )      
      }
    }
  }
</script>

