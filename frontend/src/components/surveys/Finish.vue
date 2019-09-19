<template lang="pug">
  div
    .step-progress(ref="step-progress")
      ul(class="list-unstyled multi-steps")
        li 설문시작
        li 공통질문
        li 지역선택
        li 모델
        li 모델질문
        li 동영상
        li 모델'
        li 모델' 질문
        li(class="is-active") 설문완료
    .text-center
      br
      h1 
        | 설문작성을 완료하였습니다. 
        br
        | 수고하셨습니다.
</template>
<script>
export default {
  mounted() {
    this.axios
      .post("/login/end", {
        accessToken: this.$store.getters.getAuthenticated, 
        model: this.$store.getters.getModel
      })
      .then(res => {
        this.$store.commit('alreadyFinished');
      })
      .catch(err => {
        console.log('err : ', err)
      })
  }
}
</script>
