// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import "@babel/polyfill";
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import 'classlist-polyfill'
import 'polyfill-array-includes';
import 'es6-promise/auto'
import axios from "./plugins/customAxios";
import VueAxios from 'vue-axios';
import store from './store';
import VueYouTubeEmbed from 'vue-youtube-embed'
import VueAlertify from "vue-alertify"
import VueSession from 'vue-session'
import Toasted from 'vue-toasted';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import MainNav from './components/Info/common/MainNav.vue'

import StepProgress from "./components/surveys/common/StepProgress.vue";
import InfoSidNav from "./components/Info/common/SideNavigation.vue";
import StaticHeader from "./components/Info/common/StaticHeader.vue";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faBackspace, faTimes, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.use(VueAxios, axios);
Vue.use(BootstrapVue)
Vue.use(VueYouTubeEmbed)
Vue.use(VueAlertify)
Vue.use(VueSession)
Vue.use(Toasted, {
  position: 'top-right',
  duration: 5000,
  action : {
    text : '닫기',
    onClick(e, toastObject) {
      toastObject.goAway(0);
    }
  },
});

Vue.component('main-nav', MainNav)
Vue.component('step-progress', StepProgress)
Vue.component('info-side-nav', InfoSidNav)
Vue.component('static-header', StaticHeader)

library.add(faSearch, faBackspace, faTimes, faChevronUp, faChevronDown)

Vue.component('font-awesome-icon', FontAwesomeIcon)
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
