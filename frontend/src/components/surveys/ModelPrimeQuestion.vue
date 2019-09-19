<template lang="pug">
  .container
    .row
      .col-md-12
        step-progress(:currentStep=7)
    //- div.text-center 
      //- iframe.googleForm(ref="googleForm" frameborder= "0", :style="{'height': (screenHeight - 180) + 'px'}", style="width:100%;", marginheight= "0", marginwidth= "0", :src="getGoogleForm + '/viewform?embedded=true'") 로드 중...
      //- br
      //- router-link(to="/survey/model1" class="btn btn-secondary") 이전으로
      //- router-link(to="/survey/model1/breaktime" class="btn btn-primary" :class="{formOn : formComplete}" class='formComplete') 다음으로
      //- a(href="#" @click.prevent="move()" class="btn btn-primary" :class="{formOn : formComplete}" class='formComplete') 다음으로
    
    //- b-form(@submit="onSubmit")
    //-   b-form-group(class="mb-5")
    //-     h5 제공된 정보에서 {{getMyLocation.sd_nm}}의 하루 평균 PM2.5농도는 어땠습니까?
    //-     b-form-radio-group(id="myLocAverAirPol" v-model="form.model2_myLocAverAirPol" :options="formOptions.goodTobad" name="myLocAverAirPol" required stacked)

    //-   b-form-group(class="mb-5")
    //-     h5 제공된 정보에서 {{getMyLocation.counter}}의 하루 평균 PM2.5농도는 어땠습니까?
    //-     b-form-radio-group(id="locAverAirPol" v-model="form.model2_locAverAirPol" :options="formOptions.goodTobad" name="locAverAirPol" required stacked)

    //-   b-form-group(class="mb-5")
    //-     h5 제공된 정보에서 {{getMyLocation.sd_nm}}의 미세먼지로 인한 초과 사망자수는 몇 명입니까?
    //-     b-form-radio-group(id="myLocAd" v-model="form.model2_myLocAd" :options="formOptions.myLocAd" name="myLocAd" required stacked)

    //-   b-form-group(class="mb-5")
    //-     h5 제공된 정보에서 {{getMyLocation.counter}}의 미세먼지로 인한 초과 사망자수는 몇 명입니까?
    //-     b-form-radio-group(id="locAd" v-model="form.model2_locAd" :options="formOptions.locAd" name="locAd" required stacked)


    //-   b-form-group(class="mb-5" id="model2_useful")
    //-     h5 제공된 정보는 유용하였습니까?
    //-     b-row
    //-       b-col(cols="2")
    //-         p.text-right 전혀 그렇지 않다
    //-       b-col(cols="8")
    //-         //- vue-slider(
    //-         //-   v-model="form.model2_useful"
    //-         //-   v-bind="formOptions.defaultForm"
    //-         //-   class="mb-5"
    //-         //- )
    //-         b-form-radio-group(v-model="form.model2_useful" class="text-center" required)
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

    //-   b-form-group(class="mb-5" id="model2_difficulty")
    //-     h5 제공된 미세먼지 정보는 이해하기에 쉬웠습니까?
    //-     b-row
    //-       b-col(cols="2")
    //-         p.text-right 매우 쉬웠다
    //-       b-col(cols="8")
    //-         //- vue-slider(
    //-         //-   v-model="form.model2_difficulty"
    //-         //-   v-bind="formOptions.defaultForm"
    //-         //-   class="mb-5"
    //-         //- )
    //-         b-form-radio-group(v-model="form.model2_difficulty" class="text-center" required)
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

    //-   b-form-group(class="mb-5" id="model2_riskDeep")
    //-     h5 제공된 정보를 본 후 미세먼지 정보를 얼마나 더 많이 찾아보시겠습니까?
    //-     b-row
    //-       b-col(cols="2")
    //-         p.text-right 전혀 변하지 않을 것이다
    //-       b-col(cols="8")
    //-         //- vue-slider(
    //-         //-   v-model="form.model2_search"
    //-         //-   v-bind="formOptions.defaultForm"
    //-         //-   class="mb-5"
    //-         //- )
    //-         b-form-radio-group(v-model="form.model2_search" class="text-center" required)
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
          
    //-   b-form-group(class="mb-5" id="model2_riskDeep")
    //-     h5 제공된 정보를 본 후 향후 5년 이내 미세먼지로 발생하는 위험의 심각성을 잘 알 수 있었습니까?
    //-     b-row
    //-       b-col(cols="2")
    //-         p.text-right 전혀 모르겠다
    //-       b-col(cols="8")
    //-         //- vue-slider(
    //-         //-   v-model="form.model2_riskDeep"
    //-         //-   v-bind="formOptions.defaultForm"
    //-         //-   class="mb-5"
    //-         //- )
    //-         b-form-radio-group(v-model="form.model2_riskDeep" class="text-center" required)
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
          
    //-   b-form-group(class="mb-5" id="model2_riskDeep")
    //-     h5 제공된 정보를 본 후 귀하와 비슷한 나이대의 사람들과 비교하였을 때, 향후 5년 이내 미세먼지 건강 위험이 귀하에게 피해를 초래할 가능성은 얼마나 더 증가할 것이라 생각하십니까?
    //-     b-row
    //-       b-col(cols="2")
    //-         p.text-right 전혀 변하지 않을 것이다
    //-       b-col(cols="8")
    //-         //- vue-slider(
    //-         //-   v-model="form.model2_afterIncrease"
    //-         //-   v-bind="formOptions.defaultForm"
    //-         //-   class="mb-5"
    //-         //- )
    //-         b-form-radio-group(v-model="form.model2_afterIncrease" class="text-center" required)
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
          
    //-   b-form-group(class="mb-5" id="model2_riskDeep")
    //-     h5 제공된 정보를 본 후 미세먼지 대처 방법을 얼마나 더 자주 실천하시겠습니까?
    //-     b-row
    //-       b-col(cols="2")
    //-         p.text-right 전혀 변하지 않을 것이다
    //-       b-col(cols="8")
    //-         //- vue-slider(
    //-         //-   v-model="form.model2_action"
    //-         //-   v-bind="formOptions.defaultForm"
    //-         //-   class="mb-5"
    //-         //- )
    //-         b-form-radio-group(v-model="form.model2_action" class="text-center" required)
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
        b-form-radio-group(id="myLocAverAirPol" v-model="form.model2_myLocAverAirPol" :options="formOptions.goodTobad" name="myLocAverAirPol" stacked)

      b-form-group(class="mb-5")
        h5 제공된 정보에서 {{getMyLocation.counter}}의 하루 평균 PM2.5농도는 어땠습니까?
        b-form-radio-group(id="locAverAirPol" v-model="form.model2_locAverAirPol" :options="formOptions.goodTobad" name="locAverAirPol" stacked)

      b-form-group(class="mb-5")
        h5 제공된 정보에서 {{getMyLocation.sd_nm}}의 미세먼지로 인한 초과 사망자수는 몇 명입니까?
        b-form-radio-group(id="myLocAd" v-model="form.model2_myLocAd" :options="formOptions.myLocAd" name="myLocAd" stacked)

      b-form-group(class="mb-5")
        h5 제공된 정보에서 {{getMyLocation.counter}}의 미세먼지로 인한 초과 사망자수는 몇 명입니까?
        b-form-radio-group(id="locAd" v-model="form.model2_locAd" :options="formOptions.locAd" name="locAd" stacked)


      b-form-group(class="mb-5" id="model2_useful")
        h5 제공된 정보는 유용하였습니까?
        b-row
          b-col(cols="2")
            p.text-right 전혀 그렇지 않다
          b-col(cols="8")
            //- vue-slider(
            //-   v-model="form.model2_useful"
            //-   v-bind="formOptions.defaultForm"
            //-   class="mb-5"
            //- )
            b-form-radio-group(v-model="form.model2_useful" class="text-center")
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

      b-form-group(class="mb-5" id="model2_difficulty")
        h5 제공된 미세먼지 정보는 이해하기에 쉬웠습니까?
        b-row
          b-col(cols="2")
            p.text-right 매우 쉬웠다
          b-col(cols="8")
            //- vue-slider(
            //-   v-model="form.model2_difficulty"
            //-   v-bind="formOptions.defaultForm"
            //-   class="mb-5"
            //- )
            b-form-radio-group(v-model="form.model2_difficulty" class="text-center")
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

      b-form-group(class="mb-5" id="model2_riskDeep")
        h5 제공된 정보를 본 후 미세먼지 정보를 얼마나 더 많이 찾아보시겠습니까?
        b-row
          b-col(cols="2")
            p.text-right 전혀 변하지 않을 것이다
          b-col(cols="8")
            //- vue-slider(
            //-   v-model="form.model2_search"
            //-   v-bind="formOptions.defaultForm"
            //-   class="mb-5"
            //- )
            b-form-radio-group(v-model="form.model2_search" class="text-center")
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
          
      b-form-group(class="mb-5" id="model2_riskDeep")
        h5 제공된 정보를 본 후 향후 5년 이내 미세먼지로 발생하는 위험의 심각성을 잘 알 수 있었습니까?
        b-row
          b-col(cols="2")
            p.text-right 전혀 모르겠다
          b-col(cols="8")
            //- vue-slider(
            //-   v-model="form.model2_riskDeep"
            //-   v-bind="formOptions.defaultForm"
            //-   class="mb-5"
            //- )
            b-form-radio-group(v-model="form.model2_riskDeep" class="text-center")
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
          
      b-form-group(class="mb-5" id="model2_riskDeep")
        h5 제공된 정보를 본 후 귀하와 비슷한 나이대의 사람들과 비교하였을 때, 향후 5년 이내 미세먼지 건강 위험이 귀하에게 피해를 초래할 가능성은 얼마나 더 증가할 것이라 생각하십니까?
        b-row
          b-col(cols="2")
            p.text-right 전혀 변하지 않을 것이다
          b-col(cols="8")
            //- vue-slider(
            //-   v-model="form.model2_afterIncrease"
            //-   v-bind="formOptions.defaultForm"
            //-   class="mb-5"
            //- )
            b-form-radio-group(v-model="form.model2_afterIncrease" class="text-center")
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
          
      b-form-group(class="mb-5" id="model2_riskDeep")
        h5 제공된 정보를 본 후 미세먼지 대처 방법을 얼마나 더 자주 실천하시겠습니까?
        b-row
          b-col(cols="2")
            p.text-right 전혀 변하지 않을 것이다
          b-col(cols="8")
            //- vue-slider(
            //-   v-model="form.model2_action"
            //-   v-bind="formOptions.defaultForm"
            //-   class="mb-5"
            //- )
            b-form-radio-group(v-model="form.model2_action" class="text-center")
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
        model2_myLocAverAirPol: null,
        model2_locAverAirPol: null,
        model2_myLocAd: null,
        model2_locAd: null,
        model2_useful: null,
        model2_difficulty: null,
        model2_search: null,
        model2_riskDeep: null,
        model2_afterIncrease: null,
        model2_action: null,
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
        myLocAd: [],
        locAd: [],
      },
    }
  },
  mounted() {
    setTimeout(()=>{
      this.setFormComplete()
    }, 5000);
    this.screenHeight = window.innerHeight;
    this.formOptions.myLocAd = this.getMyLocation.model2_1
    this.formOptions.locAd = this.getMyLocation.model2_2
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      // this.axios
      //   .post("/login/question", {form: this.form, email: this.$store.getters.getEmail})
      //   .then(res => {
      //     if(!res.data.success) return this.$toasted.error(res.data.message)
      //     return this.$router.push('/survey/model' + this.$store.getters.getModel + '/finish');
      //   })
      //   .catch(err => {
      //     console.log('err : ', err)
      //   })
      this.$router.push('/survey/model' + this.$store.getters.getModel + '/finish');
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