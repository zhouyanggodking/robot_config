<template>
  <div class="go-back">
    <div @click="goBack"><i class="el-icon-back"></i>返回</div>
  </div>
</template>

<script>
export default {
  props: {
    routeName: {
      type: String,
      default: 'main-page'
    }
  },
  methods: {
    goBack() {
      this.$router.push({
        name: routeName
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.go-back {
  color: #0000ee;
  cursor: pointer;
  &:hover {
    color: #0055ff;
  }
}
</style>
