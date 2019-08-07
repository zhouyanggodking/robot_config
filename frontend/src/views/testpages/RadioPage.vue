<template>
  <div class="radio-page">
    <h1>测试扬声器</h1>
    <div class="operations">
      <el-button type="primary" @click="onTestBtnClick">测试</el-button>
      <el-button type="danger" @click="onStopBtnClick">停止</el-button>
    </div>
  </div>
</template>

<script>
import testQuery from '@/rest/testQuery';

export default {
  methods: {
    async onStopBtnClick() {
      try {
        await testQuery.stopTestRadio();
        this.$message({
          message: '测试扬声器已停止',
          type: 'success'
        });
      } catch {
        this.$message({
          message: '测试扬声器停止失败',
          type: 'error'
        });
      }
    },
    async onTestBtnClick() {
      try {
        await testQuery.startTestRadio();
        this.$message({
          message: '正在测试扬声器',
          type: 'success'
        });
      } catch {
        this.$message({
          message: '测试扬声器失败',
          type: 'error'
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.radio-page {
  .operations {
    margin-top: 48px;
  }
}
</style>
