<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import 'vue-loading-overlay/dist/vue-loading.min.css';

export default {
  name: 'App',
  data() {
    return {
    }
  },
}
</script>

<style lang="scss">
  @import "./style/application.scss";
  @import "./style/survey.scss";
</style>

