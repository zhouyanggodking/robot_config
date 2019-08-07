<template>
  <div class="monitor-page">
    <h1>测试液晶屏</h1>
    <div class="operations">
      <el-button type="primary" @click="onTestBtnClick" icon="el-icon-monitor">测试</el-button>
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
        await testQuery.stopTestMonitor();
        this.$message({
          message: '测试液晶屏已停止',
          type: 'success'
        });
      } catch {
        this.$message({
          message: '测试液晶屏停止失败',
          type: 'error'
        });
      }
    },
    async onTestBtnClick() {
      try {
        await testQuery.startTestMonitor();
        this.$message({
          message: '正在测试液晶屏',
          type: 'success'
        });
      } catch {
        this.$message({
          message: '测试液晶屏失败',
          type: 'error'
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.monitor-page {
  .operations {
    margin-top: 48px;
  }
}
</style>
