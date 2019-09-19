import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import Intro from '../components/Intro'
import Sd from '../components/Sd'
import Sgg from '../components/Sgg'

import Login from '../components/surveys/Login'
import CheckAccessToken from '../components/surveys/CheckAccessToken.vue'
import SurveyClosed from '../components/surveys/Closed.vue'

import SurveyModelQuestion from "../components/surveys/ModelQuestion.vue"
import SurveyModelPrimeQuestion from "../components/surveys/ModelPrimeQuestion.vue"

import Surveys from '../components/Surveys.vue'
import SurveyCommonQuetion from '../components/surveys/CommonQuestion.vue'
import SurveyLocationSelect from '../components/surveys/LocationSelect.vue'
import SurveyFinish from '../components/surveys/Finish.vue'

import SurveyModel1 from '../components/surveys/model1/Model1.vue'
import SurveyModel1P from '../components/surveys/model1/Model1_p.vue'
import SurveyModel1Breaktime from '../components/surveys/model1/Model1Breaktime.vue'

import SurveyModel2 from '../components/surveys/model2/origin/Index.vue'
import SurveyModel2P from '../components/surveys/model2/prime/Index.vue'
import SurveyModel2Breaktime from '../components/surveys/model2/Model2Breaktime.vue'

import SurveyModel3 from '../components/surveys/model3/origin/Index.vue'
import SurveyModel3P from '../components/surveys/model3/prime/Index.vue'
import SurveyModel3Breaktime from '../components/surveys/model3/Model3Breaktime.vue'
// import LocationSelect from '../components/surveys/model3/LocationSelect.vue'

import NotFound from '../components/NotFound.vue'

import Map from '../components/Map.vue'
// import MapOld from '../components/MapOld.vue'
import MapMobile from '../components/MapMobile.vue'
import Info from '../components/Info.vue'
import Detail from '../components/info/Detail.vue'
import Service from '../components/info/Service.vue'
import Refer from '../components/info/Refer.vue'
import HowFineDust from '../components/info/HowFineDust.vue'
import HowAirHealthIndex from '../components/info/HowAirHealthIndex.vue'
import HowExcessDeath from '../components/info/HowExcessDeath.vue'

// import Madein from '../components/info/Madein.vue'
// import DataInfo from '../components/info/DataInfo.vue'
import FnQ from '../components/info/FnQ.vue'
import Rank from '../components/Rank.vue'
import Test from '../components/Test.vue'

Vue.use(Router)

const requireAuth = (modelNumber) => (to, from, next) => {
  if (store.getters.getAuthenticated && store.getters.getModel) return next()
  next('/login?allowed=false')
}

const requireModel = (modelNumber) => (to, from, next) => {
  if (store.getters.getAuthenticated && store.getters.getModel === modelNumber) return next()
  next('/login?allowed=false')
}

const isMobileMap = () => (to, from, next) => {
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    return next('/map/mobile')
  } else if(window.innerWidth < 1020) {
    return next('/map/mobile')
  } else {
    return next();
  }
}


export default new Router({
  mode: "history",
  routes: [
    { path: '*', component: NotFound },
    { path: '/survey/login',component: Login },
    

    { path: '/', beforeEnter: isMobileMap(), component: Map },
    { path: '/map', beforeEnter: isMobileMap(), component: Map },
    { path: '/map/mobile', component: MapMobile },
    // { path: '/map/old', component: MapOld },

    { path: '/rank', component: Rank },
    { path: '/test', component: Test },
    {
      path: '/info/',
      component: Info,
      // beforeEnter: requireModel('1'),
      children: [
        { path: 'detail', component: Detail },
        { path: 'service', component: Service },
        { path: 'refer', component: Refer },
        // { path: 'madein', component: Madein },
        // { path: 'data', component: DataInfo },
        { path: 'how/finedust', component: HowFineDust},
        { path: 'how/airhealthindex', component: HowAirHealthIndex},
        { path: 'how/excessdeath', component: HowExcessDeath},
        { path: 'fnq', component: FnQ },
      ]
    },
    // { path: '/detailInfo', component: Detail },
    // { path: '/serviceInfo', component: Service },
    // { path: '/refer', component: Refer },
    
    // { path: '/',component: Intro},
    { path: '/login',component: Login},
    
    { path: '/map/sd',component: Sd},
    { path: '/map/sgg',component: Sgg},

    { path: '/checkAccessToken',component: CheckAccessToken },
    // { path: '/survey/common_question',component: SurveyCommonQuetion, beforeEnter: requireAuth() },
    // { path: '/survey/location_select',component: SurveyLocationSelect, beforeEnter: requireAuth() },
    { path: '/survey/common_question',component: SurveyCommonQuetion },
    { path: '/survey/location_select',component: SurveyLocationSelect },
    { path: '/survey/closed',component: SurveyClosed},

    {
      path: '/survey/model1',
      component: Surveys,
      // beforeEnter: requireModel('1'),
      children: [
        { path: '',component: SurveyModel1} , 
        { path: 'prime',component: SurveyModel1P },
        { path: 'question',component: SurveyModelQuestion },
        { path: 'question/prime',component: SurveyModelPrimeQuestion },
        { path: 'breaktime',component: SurveyModel1Breaktime },
        { path: 'finish',component: SurveyFinish }
      ]
    },
    {
      path: '/survey/model2',
      component: Surveys,
      // beforeEnter: requireModel('2'),
      children: [
        { path: '',component: SurveyModel2} , 
        { path: 'prime',component: SurveyModel2P },
        { path: 'question',component: SurveyModelQuestion },
        { path: 'question/prime',component: SurveyModelPrimeQuestion },
        { path: 'breaktime',component: SurveyModel2Breaktime },
        { path: 'finish',component: SurveyFinish }
      ]
    },
    {
      path: '/survey/model3',
      component: Surveys,
      // beforeEnter: requireModel('3'),
      children: [
        { path: '',component: SurveyModel3} , 
        { path: 'prime',component: SurveyModel3P },
        { path: 'question',component: SurveyModelQuestion },
        { path: 'question/prime',component: SurveyModelPrimeQuestion },
        { path: 'breaktime',component: SurveyModel3Breaktime },
        { path: 'finish',component: SurveyFinish },
      ]
    }
  ]
})