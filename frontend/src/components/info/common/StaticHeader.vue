<template lang="pug">
  .page-titl-with-btn-wrapper
    .page-title-wrapper
      h2.page-title 미세먼지 건강지도 안내
    .page-title-right-btn-wrapper
      router-link.mi-btn.mi-btn-normal.btn-line(to="/map") 지도정보
      router-link.mi-btn.mi-btn-normal.btn-line(to="/rank" v-bind:class="{active : $route.path === '/rank'}") 대기건강지수 순위
</template>
