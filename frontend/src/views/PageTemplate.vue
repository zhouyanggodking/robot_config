<template>
  <div class="template">
    <navigation class="top-bar"></navigation>
    <router-view class="page"></router-view>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation';

export default {
  components: {
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
  .page {
    width: 100%;
    height: calc(100% - 64px);
  }
}
</style>
