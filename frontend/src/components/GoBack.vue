<template>
  <div class="go-back">
    <div @click="goBack"><i class="el-icon-back"></i>返回</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      testPages: ['audio-page', 'camera-page', 'keypad-page', 'monitor-page', 'radio-page']
    };
  },
  methods: {
    goBack() {
      const currRouteName = this.$route.name;
      if (this.testPages.indexOf(currRouteName) !== -1) {
        this.$router.push({
          name: 'test-page'
        });
      } else {
        this.$router.push({
          name: 'main-page'
        });
      }      
    }
  }
};
</script>

<style lang="scss" scoped>
.go-back {
  height: 24px;
  color: #0000ee;
  cursor: pointer;
  &:hover {
    color: #0055ff;
  }
}
</style>
