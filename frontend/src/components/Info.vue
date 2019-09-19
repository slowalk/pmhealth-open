<template lang="pug">
  div
    main-nav
    b-container.info-container    
      router-view
</template>

<style lang="scss">
  @import "../style/info.scss";
  .info-container {
    margin-bottom: 150px;
  }
</style>