<template lang="pug">
  .content-side
    ul.content-side-ul
      li.content-side-li(:class="{active : $route.path === '/info/service'}")
        router-link.content-side-li__link(to="/info/service") 대기건강지수 지도 프로젝트 소개
      li.content-side-li(:class="{active : $route.path === '/info/detail'}")
        router-link.content-side-li__link(to="/info/detail") 미세먼지와 건강


      .group
        li.content-side-li.label.mb-0(:class="{active : ['/info/how/finedust', '/info/how/excessdeath', '/info/how/airhealthindex'].includes($route.path) }") 자료원 및 분석
        li.content-side-li(:class="{color_active : $route.path === '/info/how/finedust'}")
          router-link.content-side-li__link(to="/info/how/finedust") - 미세먼지 농도는 어떻게 구하나요?
        li.content-side-li(:class="{color_active : $route.path === '/info/how/excessdeath'}")
          router-link.content-side-li__link(to="/info/how/excessdeath") - 초과사망자수는 어떻게 구하나요?
        li.content-side-li(:class="{color_active : $route.path === '/info/how/airhealthindex'}")
          router-link.content-side-li__link(to="/info/how/airhealthindex") - 대기건강지수는 어떻게 구하나요?


      li.content-side-li(:class="{active : $route.path === '/info/fnq'}")
        router-link.content-side-li__link(to="/info/fnq") 자주 묻는 질문
      li.content-side-li(:class="{active : $route.path === '/info/refer'}")
        router-link.content-side-li__link(to="/info/refer") 관련페이지
      

    //- form.side-mobile
      .form-group.mi-form-group
        label.sr-only(for="exampleFormControlSelect1") 사이드바
        select#exampleFormControlSelect1.form-control.mi-input.mi-top-input
          option 미세먼지 건강지도 안내
          option 미세먼지와 건강
          option 관련페이지
    .side-mobile(ref="content-slide-top")
      .content-slide.mt-3
        .item(:class="{active : $route.path === '/info/service'}")
          router-link(to="/info/service") 대기건강지수 지도 프로젝트 소개
        .item(:class="{active : $route.path === '/info/detail'}")
          router-link(to="/info/detail") 미세먼지와 건강
        .item(:class="{active : $route.path === '/info/fnq'}")
          router-link(to="/info/fnq") 자주 묻는 질문
        .item(:class="{active : $route.path === '/info/refer'}")
          router-link(to="/info/refer") 관련페이지
        //- .item(:class="{active : $route.path === '/info/madein'}")
        //-   router-link(to="/info/madein") 자료원 및 분석

    .group.mt-3.desktop-ds-none
      p.label.mb-0 자료원 및 분석
    .side-mobile(ref="content-slide-bottom")
      .content-slide
          .item(:class="{active : $route.path === '/info/how/finedust'}")
            router-link(to="/info/how/finedust") - 미세먼지 농도는 어떻게 구하나요?
          .item(:class="{active : $route.path === '/info/how/excessdeath'}")
            router-link(to="/info/how/excessdeath") - 초과사망자수는 어떻게 구하나요?
          .item(:class="{active : $route.path === '/info/how/airhealthindex'}")
            router-link(to="/info/how/airhealthindex") - 대기건강지수는 어떻게 구하나요?



        
      
</template>

<style lang="scss" scoped>
  .group {
    .active {
      background-color: #1185f0 !important;
      color: white !important;
    }
    .label {
      font-size: 18px;
      color: #696c7d;
      padding: 13px 20px 12px;
    }
    .content-side-li__link {
      font-size: 16px;
      padding: 10px 0px 10px 30px;
      &:hover {
        background-color: white !important;
        color: #1185f0 !important;
      }
    }
  }
  .color_active a {
    color: #1185f0 !important;
    background-color: white !important;
    &:hover {
      color: white !important;
    }
  }
</style>


<script>
export default {
  mounted() {
    // if(this.$route.path === '/info/service') this.$refs["content-slide-top"].scrollLeft = 100;
    if(this.$route.path === '/info/detail') this.$refs["content-slide-top"].scrollLeft = 2 * 110;
    else if(this.$route.path === '/info/fnq') this.$refs["content-slide-top"].scrollLeft = 3 * 120;
    else if(this.$route.path === '/info/refer') this.$refs["content-slide-top"].scrollLeft = 4 * 120;


    // else if(this.$route.path === '/info/how/finedust') this.$refs["content-slide-bottom"].scrollLeft = 0 * 270;
    else if(this.$route.path === '/info/how/excessdeath') this.$refs["content-slide-bottom"].scrollLeft = 1 * 270 - 30;
    else if(this.$route.path === '/info/how/airhealthindex') this.$refs["content-slide-bottom"].scrollLeft = 2 * 270;
  }
}
</script>
