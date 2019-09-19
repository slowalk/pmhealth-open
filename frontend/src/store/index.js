import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import axios from '../plugins/customAxios'
import { stat } from 'fs';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: null,
    model: null,
    sd: null,
    finished: false,
    email: null,
  },
  getters: {
    getEmail (state) {
      return state.email
    },
    getAuthenticated (state) {
      return state.accessToken
    },
    getModel (state) {
      return state.model
    },
    getSd (state) {
      return state.sd
    },
    checkFinished (state) {
      return state.finished
    }
  },
  mutations: {
    LOGIN (state, {accessToken, model, email}) {
      state.accessToken = accessToken
      state.model = model
      state.email = email
    },
    LOGOUT (state) {
      state.accessToken = null
      state.model = null
      state.sd = null
      state.finished = false
      state.email = null
    },
    SET_SD (state, {sd}) {
      state.sd = sd
    },
    alreadyFinished (state) {
      // state.finished = true
    }
  },
  actions: {
    LOGIN ({commit}, {accessToken, model, email}) {
      return new Promise((resolve, reject) => {
        axios.post(`/login/checkAccessToken`, {accessToken, model, email})
          .then((res) => {
            if(res.data.success && !res.data.finished) {
              let model = res.data.model, 
                  accessToken = res.data.accessToken,
                  email = res.data.email;
              commit('LOGIN', {accessToken, model, email});
              // 모든 HTTP 요청 헤더에 Authorization 을 추가한다.
              axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`;
            }
            // 이미 완성한 질문
            if (res.data.success && res.data.finished) {
              commit('alreadyFinished');
            }
            resolve(res);
          })
      });
    },
    LOGOUT ({commit}) {
      return new Promise((resolve, reject) => {
        commit('LOGOUT')
        resolve();
      })
    },
    SET_SD ({commit}, {accessToken, model, sd}) {
      return new Promise((resolve, reject) => {
        axios.put('/login/location_select', {accessToken, model, sd})
          .then(res => {
            commit('SET_SD', {sd});
            resolve(res);
          })
      })
    },
  },
  plugins: [createPersistedState()]
}) 