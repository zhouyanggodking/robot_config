<template>
  <div class="template">
    <navigation class="top-bar"></navigation>
    <div class="container">
      <go-back class="back"></go-back>
      <router-view class="page"></router-view>
    </div>    
  </div>
</template>

<script>
import GoBack from '@/components/GoBack';
import Navigation from '@/components/Navigation';

export default {
  components: {
    GoBack,
    Navigation
  }
};
</script>

<style lang="scss" scoped>
.template {
  width: 100%;
  height: 100%;
  .top-bar {
    width: 100%;
    height: 64px;
  }
  .container {
    padding: 24px;
    .back {
      margin: 32px 0;
    }
    .page {
      width: 100%;
      height: calc(100% - 88px);
    }
  }
  
}
</style>
