<template lang="pug">
  div
    router-view
</template>

<script>
export default {
  // mounted() {
  //   // 뒤로가기 방지
  //   history.pushState(null, null, location.href);
  //   window.onpopstate = function () {
  //     history.go(1);
  //   };
  //   document.oncontextmenu = function(){return false;}
  // },
}
</script>

<style lang="scss">
  @import "../style/survey.scss";
</style>
