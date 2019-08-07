<template>
  <div class="camera-page">
    <h1>测试摄像头</h1>
    <div class="operations">
      <el-button type="primary" @click="onTestBtnClick" icon="el-icon-video-camera" :loading="isUpdating">测试</el-button>      
    </div>
    <div class="image-container" v-if="!isUpdating && imageData">
      <el-image fit="contain" class="image" :src="`data:image/jpg;base64, ${imageData}`">
      </el-image>
    </div>

  </div>
</template>

<script>
import testQuery from '@/rest/testQuery';

export default {
  data() {
    return {
      isUpdating: false,
      imageData: ''
    };
  },
  methods: {
    async onTestBtnClick() {
      try {
        this.isUpdating = true;
        this.imageData = '';
        this.imageData = await testQuery.captureCamera();
        this.isUpdating = false;
        this.$message({
          message: '测试测试摄像头成功',
          type: 'success'
        });
      } catch {
        this.isUpdating = false;
        this.$message({
          message: '测试测试摄像头失败',
          type: 'error'
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.camera-page {
  .operations {
    margin-top: 48px;
  }
  .image-container {
    .image {
      width: 640px;
      height: 480px;
    }
  }
}
</style>
