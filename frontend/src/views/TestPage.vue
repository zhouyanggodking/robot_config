<template>
  <div class="test-page">
    <el-row :gutter="12">
      <el-col v-for="(func, index) in funcList" :key="index" :xs="24" :sm="12" :md="6" :lg="4">
        <el-card type="primary" shadow="hover" class="card-container" @click.native="navigate(func.routeName)">
          <div class="row" :class="func.name">
            <eva-icon :name="func.icon" fill="#00e"></eva-icon>
            <span class="name">{{func.name}}</span>
          </div>      
        </el-card>
      </el-col>
    </el-row>   
  </div>
</template>

<script>
export default {
  data() {
    return {
      funcList: [
        {
          icon: 'volume-down-outline',
          name: '测试扬声器',
          routeName: 'radio-page'
        },
        {
          icon: 'mic-outline',
          name: '测试麦克风',
          routeName: 'audio-page'
        },
        {
          icon: 'monitor-outline',
          name: '测试液晶屏',
          routeName: 'monitor-page'
        },
        {
          icon: 'video-outline',
          name: '测试摄像头',
          routeName: 'camera-page'
        },
        {
          icon: 'keypad-outline',
          name: '测试按键',
          routeName: 'keypad-page'
        }
      ]
    };
  },
  methods: {
    navigate(routeName) {
      this.$router.push({
        name: routeName
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.test-page {
  .card-container {
    margin-right: 24px;
    margin-bottom: 24px;
    cursor: pointer;
    .name {
      margin-left: 24px;
      color: #00e;
    }
    &:hover .name {
      color: #05f;
    }
  }
}
</style>
