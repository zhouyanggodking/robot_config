<template>
  <div class="settings-page">
    <h1>其它设置</h1>
    <div class="row settings">
      <div class="row setting">
        <span class="camera">摄像头分辨率: </span>
        <el-select v-model="cameraResolution" placeholder="请选择">
          <el-option
            v-for="item in cameraOptions"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </div>  
      <div class="row setting">
        <span class="radio">音频采样率: </span>
        <el-select v-model="audioFrequency" placeholder="请选择">
          <el-option
            v-for="(item, index) in audioOptions"
            :key="index"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>   
      <div class="row setting">
        <span class="gps">GPS坐标: </span>
        <el-input v-model="gpsCoord" class="gps-input"></el-input>
      </div>  
    </div>
    <div class="operations">
      <el-button type="primary" @click="onSaveBtnClick" :loading="isUpdating">保存</el-button>
    </div>
  </div>
</template>

<script>
import settingsQuery from '@/rest/settingsQuery';

export default {
  data() {
    return {
      cameraResolution: 'VGA',
      cameraOptions: ['QVGA', 'VGA', 'HD'],
      gpsCoord: '',
      audioFrequency: 8000,
      audioOptions: [
        {
          value: 8000,
          label: '8,000HZ'
        },
        {
          value: 11025,
          label: '11,025HZ'
        }, 
        {
          value: 22050,
          label: '22,050HZ'
        }, 
        {
          value: 24000,
          label: '24,000HZ'
        }, 
        {
          value: 44100,
          label: '44,100HZ'
        }
      ],
      isUpdating: false
    };
  },
  methods: {
    async onSaveBtnClick() {
      try {
        this.isUpdating = true;
        await settingsQuery.updateSettings(this.cameraResolution, this.audioFrequency, this.gpsCoord);
        this.isUpdating = false;
        this.$message({
          message: '更新其它设置成功',
          type: 'success'
        });
      } catch {
        this.isUpdating = false;
        this.$message({
          message: '更新其它设置失败',
          type: 'error'
        });
      }
    }
  },
  async created() {
    try {
      const settings = await settingsQuery.getSettings();
      this.cameraResolution = settings.cameraResolution;
      this.gpsCoord = settings.gpsCoord;
      this.audioFrequency = settings.audioFrequency;
    } catch {
      this.$message({
        message: '获取其它设置失败',
        type: 'error'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.settings-page {
  .settings {
    flex-wrap: wrap;
    margin-top: 48px;
  }
  .setting{
    align-items: center;
    margin: 24px 12px 24px 0;
    .camera {
      margin-right: 4px;
    }
    .radio {
      margin-right: 18px;
    }
    .gps {
      margin-right: 36px;
    }
    .gps-input {
      width: 212px;
    }
  }
  .operations {
    margin-top: 48px;
  }
}
</style>
