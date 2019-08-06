<template>
  <div class="wifi-page">
    <h1>无线网络</h1>
    <div>
      <div class="text-container">
        <span>网络名称:</span>
        <span>{{wifiInfo.name || '空'}}</span>
      </div>
      <div class="text-container">
        <span>密码:</span>
        <span>{{wifiInfo.password || '空'}}</span>
      </div>
    </div>
    <el-button type="primary" class="scan btn" @click="onScanBtnClick" :loading="isScanning">扫描网络</el-button>
    <div class="wifi-list" v-if="showWifiScanResult">
      <h3>可用无线网络列表</h3>
      <el-table
        :data="wifiList"
        style="width: 100%">
        <el-table-column width="50">
          <template slot-scope="scope">
            <eva-icon name="wifi" fill="#00e">{{scope.row.name}}</eva-icon>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="Wifi">
        </el-table-column>
        <el-table-column
          prop="isSecured" width="100"
          label="密码状态">
          <template slot-scope="scope">
            <span>{{scope.row.isSecured ? '有': '无'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="isSecured" width="80">
          <template slot-scope="scope">
            <el-button type="primary" size="small" :disabled="scope.row.name === wifiInfo.name"
              :loading="isUpdating && scope.row.name === operatingWifiName"
              @click="onSelectBtnClick(scope.row.name, scope.row.isSecured)">
              {{scope.row.name === wifiInfo.name ? '已选' : '选择'}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="设置wifi密码" 
      :visible.sync="dialogConfig.show" 
      :close-on-click-modal="false" 
      width="80%" 
      @closed="onDialogClose">
      <el-form :model="dialogConfig" :rules="dialogRules" ref="dialog">
        <div>WIFI名：{{operatingWifiName}}</div>
        <el-form-item label="密码" prop="password">
          <el-input v-model="dialogConfig.password" placeholder="请输入wifi密码"></el-input>
        </el-form-item>
      </el-form>      
      <div slot="footer">
        <el-button type="primary" @click="onConfirmBtnClick">确定</el-button>
        <el-button type="danger" @click="onCancelBtnClick">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import wifiQuery from '@/rest/wifiQuery';

export default {
  data() {
    return {
      isScanning: false,
      wifiInfo: {
        name: '',
        password: ''
      },
      wifiList: [],
      isUpdating: false,
      operatingWifiName: '',
      showWifiScanResult: false,

      dialogConfig: {
        password: '',
        show: false
      },
      dialogRules: {
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    async onConfirmBtnClick() {
      this.$refs.dialog.validate(async valid => {
        if (valid) {
          try {
            await wifiQuery.updateWifiInfo(this.operatingWifiName, this.dialogConfig.password);
            this.dialogConfig.show = false;
            this.wifiInfo.name = this.operatingWifiName;
            this.wifiInfo.password = this.dialogConfig.password;
          } catch {
            this.$message({
              message: '更新网络配置失败',
              type: 'error'
            });
          }
        }
      });      
    },
    onCancelBtnClick() {
      this.dialogConfig.show = false;
    },
    onDialogClose() {
      this.$refs.dialog.resetFields();
    },
    async onSelectBtnClick(wifiName, isSecured) {
      this.operatingWifiName = wifiName;
      if (isSecured) {
        this.dialogConfig.show = true;
      } else {
        try {
          this.isUpdating = true;
          await wifiQuery.updateWifiInfo(wifiName, '');
          this.isUpdating = false;
          this.wifiInfo.name = wifiName;
          this.wifiInfo.password = '';
        } catch {
          this.isUpdating = false;
          this.$message({
            message: '更新网络配置失败',
            type: 'error'
          });
        } 
      }
    },
    async onScanBtnClick() {
      try {
        this.isScanning = true;
        this.wifiList = await wifiQuery.getAvailableWifiList();
        this.showWifiScanResult = true;
      } catch {
        this.$message({
          message: '获取可用无线网络失败',
          type: 'error'
        });
      }
      this.isScanning = false;
    }
  },
  async created() {
    try {
      this.wifiInfo = await wifiQuery.getWifiInfo();      
    } catch {
      this.$message({
        message: '获取当前无线网络配置失败',
        type: 'error'
      });
    }  
  }
};
</script>

<style lang="scss" scoped>
.wifi-page {
  .text-container {
    font-size: 24px;
    line-height: 40px;
  }
  .scan {
    margin-top: 24px;
  }

  .wifi-list {
    .wifi-container {
      align-items: center;
      height: 48px;
      .wifi-name {
        margin: 0 24px;
      }
      .secure {
        margin: 0 24px;
      }
    }
  }
  /deep/ .el-dialog {
    max-width: 500px;
  }
}
</style>
