<template>
  <div class="main-page">
    <navigation class="top-bar"></navigation>
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
.main-page {
  .top-bar {
    width: 100%;
    height: 64px;
  }
}
</style>
