<template lang="pug">
  //- https://codepen.io/athimannil/pen/wWPYkQ
  .step-progress.mt-5(ref="step-progress")
    ul(class="list-unstyled multi-steps")
      li(:class="{'is-active' : currentStep == 0}") 설문시작
      li(:class="{'is-active' : currentStep == 1}") 
      li(:class="{'is-active' : currentStep == 2}") 
      li(:class="{'is-active' : currentStep == 3}") 
      li(:class="{'is-active' : currentStep == 4}") 
      li(:class="{'is-active' : currentStep == 5}") 
      li(:class="{'is-active' : currentStep == 6}") 
      li(:class="{'is-active' : currentStep == 7}") 
      li(:class="{'is-active' : currentStep == 8}") 설문완료
</template>

<script>
export default {
  props: [
    'currentStep'
  ],
  data() {
    return {

    }
  },
  mounted() {
    // // 설문완료했는지 체크
    // if(this.$store.getters.checkFinished) return this.$router.push('/survey/login?finished=true')
    // if(this.currentStep > 2) {this.$refs["step-progress"].scrollLeft = (this.currentStep - 2) * 67;}
    // this.axios
    //   .get('/login/checkClosed')
    //   .then(res => {
    //     if(res.data.finished) return this.$router.push('/survey/closed')
    //   })
    //   .catch(err => {
    //     console.log("err : ", err)
    //   })
  }
}
</script>