<template lang="pug">
  div
    b-container
      b-row
        b-col(cols="0" md="2")
        b-col(cols="12" md="8")
          step-progress(:currentStep=0)
          b-jumbotron
            template(slot="lead") 
              h5.mb-3 - 설문시 각 페이지에서는 '뒤로가기'가 작동하지 않습니다. 신중히 설문에 응해주세요.
              h5 - '설문완료' 페이지까지 설문을 진행하지 않을시, 모든 설문은 초기화되고 사례가 지급되지 않습니다.
              h5 - 기프티콘은 메일을 통해 지급되며, 기프티콘 배부는 실험 참여자 모집완료시 일괄적으로 보내드릴 예정입니다
            // a(to="#" v-if="['null', null, undefined].includes($store.getters.getModel) || ['null', null, undefined].includes($store.getters.getAuthenticated)" class="btn btn-primary" @click.prevent="goToLogIn()") 로그인 페이지로 이동
            // a(to="#" v-else class="btn btn-primary" @click.prevent="startSurvey()") 설문시작
            .text-center
              button(class="btn btn-primary" @click.prevent="startSurvey()") 설문시작
          
</template>

<script>
export default {
  data() {
    return {
    }
  },
  mounted() {
    let accessToken = this.$route.query.accessToken
    let model = this.$route.query.model
    if (!accessToken || !model) return this.$router.push('/survey/login?allowed=false')
    this.$store.dispatch("LOGOUT");
    this.$store.dispatch('LOGIN', {accessToken, model})
      .then(res => {        
        console.log('res.data : ', res.data)
        if(!res.data.success) return this.$router.push('/survey/login?allowed=false')
        // 이미 작성한 설문일 경우 로그인페이지로
        if(res.data.success && res.data.finished) return this.$router.push('/login?finished=true')
        return this.$toasted.success(res.data.message)
      })
      .catch(err => {
        console.log('err : ', err)
      })
  },
  // updated() {
  //   if( ["null", null, undefined].includes(this.$store.getters.getModel) || ["null", null, undefined].includes(this.$store.getters.getAuthenticated) ) return this.$toasted.error("마지막 메일을 확인해주세요.")
  //   else return this.$toasted.success("정상적인 접근입니다. 다음을 진행해주세요."); 
  // },
  methods: {
    startSurvey() {
      this.axios
        .post("/login/start", {accessToken: this.$store.getters.getAuthenticated, model: this.$store.getters.getModel})
        .then(res => {
          this.$router.push('/survey/common_question')
        })
        .catch(err => {
          console.log('err : ', err)
        })
      // this.$router.push('/survey/common_question')
    },
  }
}
</script>
