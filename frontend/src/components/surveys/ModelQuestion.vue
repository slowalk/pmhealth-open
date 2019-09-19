<template lang="pug">
  .container
    .row
      .col-md-12
        step-progress(:currentStep=4)
    //- b-form(@submit="onSubmit")
    //-   b-form-group(class="mb-5")
    //-     h5 제공된 정보에서 {{getMyLocation.sd_nm}}의 하루 평균 PM2.5농도는 어땠습니까?
    //-     b-form-radio-group(id="myLocAverAirPol" v-model="form.model1_myLocAverAirPol" :options="formOptions.goodTobad" name="myLocAverAirPol" required stacked)

    //-   b-form-group(class="mb-5")
    //-     h5 제공된 정보에서 {{getMyLocation.counter}}의 하루 평균 PM2.5농도는 어땠습니까?
    //-     b-form-radio-group(id="locAverAirPol" v-model="form.model1_locAverAirPol" :options="formOptions.goodTobad" name="locAverAirPol" required stacked)

    //-   b-form-group(class="mb-5" id="model1_useful")
    //-     h5 제공된 정보는 유용하였습니까?
    //-     b-row
    //-       b-col(cols="2")
    //-         p.text-right 전혀 그렇지 않다
    //-       b-col(cols="8")
    //-         //- vue-slider(
    //-         //-   v-model="form.model1_useful"
    //-         //-   v-bind="formOptions.defaultForm"
    //-         //-   class="mb-5"
    //-         //- )
    //-         b-form-radio-group(v-model="form.model1_useful" class="text-center" required)
    //-           b-row
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="1") 1
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="2") 2
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="3") 3
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="4") 4
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="5") 5
    //-       b-col(cols="2")
    //-         p 매우 그렇다

    //-   b-form-group(class="mb-5" id="model1_difficulty")
    //-     h5 제공된 미세먼지 정보는 이해하기에 쉬웠습니까?
    //-     b-row
    //-       b-col(cols="2")
    //-         p.text-right 매우 쉬웠다
    //-       b-col(cols="8")
    //-         //- vue-slider(
    //-         //-   v-model="form.model1_difficulty"
    //-         //-   v-bind="formOptions.defaultForm"
    //-         //-   class="mb-5"
    //-         //- )
    //-         b-form-radio-group(v-model="form.model1_difficulty" class="text-center" required)
    //-           b-row
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="1") 1
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="2") 2
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="3") 3
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="4") 4
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="5") 5
    //-       b-col(cols="2")
    //-         p 매우 어려웠다

    //-   b-form-group(class="mb-5" id="model1_riskDeep")
    //-     h5 제공된 정보를 본 후 미세먼지 정보를 얼마나 더 많이 찾아보시겠습니까?
    //-     b-row
    //-       b-col(cols="2")
    //-         p.text-right 전혀 변하지 않을 것이다
    //-       b-col(cols="8")
    //-         //- vue-slider(
    //-         //-   v-model="form.model1_search"
    //-         //-   v-bind="formOptions.defaultForm"
    //-         //-   class="mb-5"
    //-         //- )
    //-         b-form-radio-group(v-model="form.model1_search" class="text-center" required)
    //-           b-row
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="1") 1
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="2") 2
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="3") 3
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="4") 4
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="5") 5
    //-       b-col(cols="2")
    //-         p 매우 많이 찾아볼 것이다
          
    //-   b-form-group(class="mb-5" id="model1_riskDeep")
    //-     h5 제공된 정보를 본 후 향후 5년 이내 미세먼지로 발생하는 위험의 심각성을 잘 알 수 있었습니까?
    //-     b-row
    //-       b-col(cols="2")
    //-         p.text-right 전혀 모르겠다
    //-       b-col(cols="8")
    //-         //- vue-slider(
    //-         //-   v-model="form.model1_riskDeep"
    //-         //-   v-bind="formOptions.defaultForm"
    //-         //-   class="mb-5"
    //-         //- )
    //-         b-form-radio-group(v-model="form.model1_riskDeep" class="text-center" required)
    //-           b-row
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="1") 1
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="2") 2
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="3") 3
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="4") 4
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="5") 5
    //-       b-col(cols="2")
    //-         p 매우 잘 알겠다
          
    //-   b-form-group(class="mb-5" id="model1_riskDeep")
    //-     h5 제공된 정보를 본 후 귀하와 비슷한 나이대의 사람들과 비교하였을 때, 향후 5년 이내 미세먼지 건강 위험이 귀하에게 피해를 초래할 가능성은 얼마나 더 증가할 것이라 생각하십니까?
    //-     b-row
    //-       b-col(cols="2")
    //-         p.text-right 전혀 변하지 않을 것이다
    //-       b-col(cols="8")
    //-         //- vue-slider(
    //-         //-   v-model="form.model1_afterIncrease"
    //-         //-   v-bind="formOptions.defaultForm"
    //-         //-   class="mb-5"
    //-         //- )
    //-         b-form-radio-group(v-model="form.model1_afterIncrease" class="text-center" required)
    //-           b-row
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="1") 1
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="2") 2
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="3") 3
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="4") 4
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="5") 5
    //-       b-col(cols="2")
    //-         p 매우 많이 피해를 입을 것이다
          
    //-   b-form-group(class="mb-5" id="model1_riskDeep")
    //-     h5 제공된 정보를 본 후 미세먼지 대처 방법을 얼마나 더 자주 실천하시겠습니까?
    //-     b-row
    //-       b-col(cols="2")
    //-         p.text-right 전혀 변하지 않을 것이다
    //-       b-col(cols="8")
    //-         //- vue-slider(
    //-         //-   v-model="form.model1_action"
    //-         //-   v-bind="formOptions.defaultForm"
    //-         //-   class="mb-5"
    //-         //- )
    //-         b-form-radio-group(v-model="form.model1_action" class="text-center" required)
    //-           b-row
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="1") 1
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="2") 2
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="3") 3
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="4") 4
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="5") 5
    //-       b-col(cols="2")
    //-         p 매우 많이 실천할 것이다
      
    //-   .text-center
    //-     b-button(type="submit" variant="primary") 제출하기





    b-form(@submit="onSubmit")
      b-form-group(class="mb-5")
        h5 제공된 정보에서 {{getMyLocation.sd_nm}}의 하루 평균 PM2.5농도는 어땠습니까?
        b-form-radio-group(id="myLocAverAirPol" v-model="form.model1_myLocAverAirPol" :options="formOptions.goodTobad" name="myLocAverAirPol"  stacked)

      b-form-group(class="mb-5")
        h5 제공된 정보에서 {{getMyLocation.counter}}의 하루 평균 PM2.5농도는 어땠습니까?
        b-form-radio-group(id="locAverAirPol" v-model="form.model1_locAverAirPol" :options="formOptions.goodTobad" name="locAverAirPol"  stacked)

      b-form-group(class="mb-5" id="model1_useful")
        h5 제공된 정보는 유용하였습니까?
        b-row
          b-col(cols="2")
            p.text-right 전혀 그렇지 않다
          b-col(cols="8")
            //- vue-slider(
            //-   v-model="form.model1_useful"
            //-   v-bind="formOptions.defaultForm"
            //-   class="mb-5"
            //- )
            b-form-radio-group(v-model="form.model1_useful" class="text-center" )
              b-row
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="1") 1
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="2") 2
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="3") 3
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="4") 4
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="5") 5
          b-col(cols="2")
            p 매우 그렇다

      b-form-group(class="mb-5" id="model1_difficulty")
        h5 제공된 미세먼지 정보는 이해하기에 쉬웠습니까?
        b-row
          b-col(cols="2")
            p.text-right 매우 쉬웠다
          b-col(cols="8")
            //- vue-slider(
            //-   v-model="form.model1_difficulty"
            //-   v-bind="formOptions.defaultForm"
            //-   class="mb-5"
            //- )
            b-form-radio-group(v-model="form.model1_difficulty" class="text-center" )
              b-row
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="1") 1
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="2") 2
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="3") 3
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="4") 4
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="5") 5
          b-col(cols="2")
            p 매우 어려웠다

      b-form-group(class="mb-5" id="model1_riskDeep")
        h5 제공된 정보를 본 후 미세먼지 정보를 얼마나 더 많이 찾아보시겠습니까?
        b-row
          b-col(cols="2")
            p.text-right 전혀 변하지 않을 것이다
          b-col(cols="8")
            //- vue-slider(
            //-   v-model="form.model1_search"
            //-   v-bind="formOptions.defaultForm"
            //-   class="mb-5"
            //- )
            b-form-radio-group(v-model="form.model1_search" class="text-center" )
              b-row
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="1") 1
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="2") 2
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="3") 3
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="4") 4
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="5") 5
          b-col(cols="2")
            p 매우 많이 찾아볼 것이다
          
      b-form-group(class="mb-5" id="model1_riskDeep")
        h5 제공된 정보를 본 후 향후 5년 이내 미세먼지로 발생하는 위험의 심각성을 잘 알 수 있었습니까?
        b-row
          b-col(cols="2")
            p.text-right 전혀 모르겠다
          b-col(cols="8")
            //- vue-slider(
            //-   v-model="form.model1_riskDeep"
            //-   v-bind="formOptions.defaultForm"
            //-   class="mb-5"
            //- )
            b-form-radio-group(v-model="form.model1_riskDeep" class="text-center" )
              b-row
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="1") 1
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="2") 2
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="3") 3
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="4") 4
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="5") 5
          b-col(cols="2")
            p 매우 잘 알겠다
          
      b-form-group(class="mb-5" id="model1_riskDeep")
        h5 제공된 정보를 본 후 귀하와 비슷한 나이대의 사람들과 비교하였을 때, 향후 5년 이내 미세먼지 건강 위험이 귀하에게 피해를 초래할 가능성은 얼마나 더 증가할 것이라 생각하십니까?
        b-row
          b-col(cols="2")
            p.text-right 전혀 변하지 않을 것이다
          b-col(cols="8")
            //- vue-slider(
            //-   v-model="form.model1_afterIncrease"
            //-   v-bind="formOptions.defaultForm"
            //-   class="mb-5"
            //- )
            b-form-radio-group(v-model="form.model1_afterIncrease" class="text-center" )
              b-row
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="1") 1
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="2") 2
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="3") 3
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="4") 4
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="5") 5
          b-col(cols="2")
            p 매우 많이 피해를 입을 것이다
          
      b-form-group(class="mb-5" id="model1_riskDeep")
        h5 제공된 정보를 본 후 미세먼지 대처 방법을 얼마나 더 자주 실천하시겠습니까?
        b-row
          b-col(cols="2")
            p.text-right 전혀 변하지 않을 것이다
          b-col(cols="8")
            //- vue-slider(
            //-   v-model="form.model1_action"
            //-   v-bind="formOptions.defaultForm"
            //-   class="mb-5"
            //- )
            b-form-radio-group(v-model="form.model1_action" class="text-center" )
              b-row
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="1") 1
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="2") 2
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="3") 3
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="4") 4
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="5") 5
          b-col(cols="2")
            p 매우 많이 실천할 것이다
      
      .text-center
        b-button(type="submit" variant="primary") 제출하기
</template>

<script>
const googleForm = require("../../models/googleForm");
// import vueSlider from 'vue-slider-component';

export default { 
  components: {
    // vueSlider,
  },
  data() {
    return {
      // getGoogleForm: googleForm.model1.filter(g => {return g["sd_cd"] == this.$store.getters.getSd})[0].url,
      getMyLocation: googleForm.model1.filter(g => {return g["sd_cd"] == this.$store.getters.getSd})[0],
      formComplete: null,
      screenHeight: 0,
      form: {
        model1_myLocAverAirPol: null,
        model1_locAverAirPol: null,
        model1_useful: null,
        model1_difficulty: null,
        model1_search: null,
        model1_riskDeep: null,
        model1_afterIncrease: null,
        model1_action: null,
      },
      formOptions: {
        goodTobad: [
          {value: "좋음", text: "좋음"},
          {value: "보통", text: "보통"},
          {value: "나쁨", text: "나쁨"},
          {value: "매우 나쁨", text: "매우 나쁨"},
        ],
        defaultForm: {
          value: null,
          width: "100%",
          tooltip: "hover",
          disabled: false,
          piecewise: true,
          piecewiseLabel: true,
          style: {
            "marginLeft": "0%"
          },
          data: [
            1,
            2,
            3,
            4,
            5
          ],
          processStyle: {
            "backgroundColor": "#ccc",
          },
          piecewiseStyle: {
            "backgroundColor": "#ccc",
            "visibility": "visible",
            "width": "12px",
            "height": "12px"
          },
          tooltipDir: "bottom",
        },
      },
    }
  },
  mounted() {
    setTimeout(()=>{
      this.setFormComplete()
    }, 5000);
    this.screenHeight = window.innerHeight;
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      // this.axios
      //   .post("/login/question", {form: this.form, email: this.$store.getters.getEmail})
      //   .then(res => {
      //     if(!res.data.success) return this.$toasted.error(res.data.message)
      //     return this.$router.push('/survey/model' + this.$store.getters.getModel + '/breaktime');
      //   })
      //   .catch(err => {
      //     console.log('err : ', err)
      //   })
      return this.$router.push('/survey/model' + this.$store.getters.getModel + '/breaktime');
    },
    setFormComplete() {
      this.formComplete = true
    },
    // move() {
    //   const that = this;
    //   this.$alertify.confirmWithTitle("경고창", "구글설문을 제출 후 클릭하셔야합니다. 이 페이지로 되돌아 올 수 없습니다. 계속하시겠습니까?",
    //     function(){
    //       that.$router.push('/survey/model' + that.$store.getters.getModel + '/breaktime');
    //     },
    //     function(){
    //       that.$toasted.error('취소하였습니다.');
    //     });
    // },
  }
  // mounted() {
  //   history.pushState(null, null, location.href);
  //   window.onpopstate = function () {
  //     history.go(1);
  //   };
  // },
}
</script>