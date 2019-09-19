<template lang='pug'>
  b-container
    b-row
      b-col(cols="12")
        step-progress(:currentStep=2)
    b-row
      b-col(cols="0" md="4")
      b-col(cols="12" md="4")
        div.text-center
          br
          b-form-select(v-model="selected" :options="options" class="mb-3")
            template(slot="first")
              option(:value="null" disabled) 관심있는 지역을 선택해주세요.
          b-button(size="small" variant="primary" @click.prevent="move(selected)") 선택하기
</template>

<script>
const sdVal = require("../../models/sdVal");

export default {
  data() {
    return {
      selected: null,
      options: [
        {value: "11", text: "서울특별시"},
        {value: "21", text: "부산광역시"},
        {value: "22", text: "대구광역시"},
        {value: "23", text: "인천광역시"},
        {value: "24", text: "광주광역시"},
        {value: "25", text: "대전광역시"},
        {value: "26", text: "울산광역시"},
        {value: "29", text: "세종특별자치시"},
        {value: "31", text: "경기도"},
        {value: "32", text: "강원도"},
        {value: "33", text: "충청북도"},
        {value: "34", text: "충청남도"},
        {value: "35", text: "전라북도"},
        {value: "36", text: "전라남도"},
        {value: "37", text: "경상북도"},
        {value: "38", text: "경상남도"},
        {value: "39", text: "제주특별자치도"}
      ],
    }
  },
  methods: {
    move(sd) {
      if(!this.selected) return this.$toasted.error("지역을 선택해주세요.")
      const that = this,
            accessToken = this.$store.getters.getAuthenticated,
            model = this.$store.getters.getModel;
      this.$alertify.confirmWithTitle("경고창","이 페이지로 되돌아 올 수 없습니다. 계속하시겠습니까?",
        function(){

          that.$store.dispatch('SET_SD', {accessToken, model, sd})
            .then(res => {
              if(!res.data.success) return that.$router.push('/survey/login?allowed=false')
              // 이미 작성한 설문일 경우 로그인페이지로
              // if(res.data.success && res.data.finished) return that.$router.push('/login?finished=true')
              else return that.$router.push('/survey/model' + that.$store.getters.getModel + '?sd=' + sd);
            })
            .catch(err => {
              console.log('err : ', err)
            })
        },
        function(){
          that.$toasted.error('취소하였습니다.');
        });
      // this.$router.push('/survey/model' + this.$store.getters.getModel + '?sd=' + sd);
    }
  }
}
</script>