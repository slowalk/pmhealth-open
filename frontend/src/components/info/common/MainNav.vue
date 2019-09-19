<template lang="pug">
  div
    nav.navbar.navbar-expand-lg.bg-white.mapNav
      b-container.text-center(fluid)
        b-nav-form
          b-navbar-brand.logo-text(href="/map") 미세먼지 대기건강지수
        .page-wrapper
          ul.navbar-nav
            img.menu(src="https://img.icons8.com/material-rounded/48/000000/menu.png" @click="menuToggle = !menuToggle")
    .menuBgWrapper(v-bind:class="{hide : !menuToggle}" @click="menuToggle = false")
    .menuDiv(v-bind:class="{slideLeft: !menuToggle}")
      .toggle-wrapper
        img(src="https://img.icons8.com/ios/50/000000/delete-sign.png" @click="menuToggle = !menuToggle")
      router-link.item(:class="{'main-color': '/info/service' == $route.path}" to="/info/service" v-model="menuToggle" @click.native="menuToggle = false") 대기건강지수 프로젝트 소개
      router-link.item(:class="{'main-color': '/info/detail' == $route.path}" to="/info/detail"  v-model="menuToggle" @click.native="menuToggle = false") 미세먼지와 건강
      .group.item
        p.main-item.mb-0(:class="{'main-color': ['/info/how/finedust', '/info/how/excessdeath', '/info/how/airhealthindex'].includes($route.path)}") 자료원 및 분석
        router-link.sub-item(:class="{'main-color': '/info/how/finedust' == $route.path}" to="/info/how/finedust"  v-model="menuToggle" @click.native="menuToggle = false") 미세먼지 농도는 어떻게 구하나요?
        router-link.sub-item(:class="{'main-color': '/info/how/excessdeath' == $route.path}" to="/info/how/excessdeath"  v-model="menuToggle" @click.native="menuToggle = false") 초과사망자수는 어떻게 구하나요?
        router-link.sub-item(:class="{'main-color': '/info/how/airhealthindex' == $route.path}" to="/info/how/airhealthindex"  v-model="menuToggle" @click.native="menuToggle = false") 대기건강지수는 어떻게 구하나요?
      router-link.item(:class="{'main-color': '/map' == $route.path}"  to="/map" v-model="menuToggle" @click.native="menuToggle = false") 지도정보
      router-link.item(:class="{'main-color': '/rank' == $route.path}" to="/rank" v-model="menuToggle" @click.native="menuToggle = false") 대기건강지수 순위
      router-link.item(:class="{'main-color': '/info/fnq' == $route.path}" to="/info/fnq" v-model="menuToggle" @click.native="menuToggle = false") 자주 묻는 질문
      router-link.item(:class="{'main-color': '/info/refer' == $route.path}" to="/info/refer" v-model="menuToggle" @click.native="menuToggle = false") 관련 사이트
      
      
</template>

<style lang="scss" scoped>
  .menuDiv {
    .navbar-brand {
      margin-right: 1rem !important;
    }
    .item {
      margin-bottom: 15px;
    }
    .group {
      font-size: 20px;
      font-weight: 700;
      .main-item {
        padding: 10px 15px;
      }
    }
    .sub-item {
      font-weight: 400;
      font-size: 16px;
      margin-left: 10px;
    }
  }

  @media screen and (max-width: 600px) {
    .menuDiv {
      left: 0px !important;
      right: initial !important;
    }
  }
</style>

<script>
  export default {
    data() {
      return {
        menuToggle: false,
      }
    },
    // computed: {
    //   getAuthenticated() {
    //     return this.$store.getters.getAuthenticated
    //   }
    // },
    // mounted() {
    //   // console.log("this.$route.path : ", this.$route.path)
    // },
    // methods: {
    //   onClickLogout() {
    //     // LOGOUT 변이 실행 후 리다이렉트 
    //     this.$store.dispatch('LOGOUT').then(() => this.$router.push('/survey/login'))
    //   }
    // }
  }
</script>