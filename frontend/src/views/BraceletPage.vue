<template>
  <div class="bracelet-page">
    <h1>蓝牙手环</h1>
    <h3>已配置的手环列表</h3>
    <div v-for="(bracelet, index) in configuredBraceletList" :key="index" class="row bracelet">
      <eva-icon name="bluetooth" fill="#00e"></eva-icon>
      <span>手环{{index + 1}}: </span>
      <div class="mac">{{bracelet.mac}}</div>
      <div>
        <el-button size="mini" type="primary" title="编辑" icon="el-icon-edit" @click="onEditBtnClick(bracelet.id, bracelet)"></el-button>
        <el-button size="mini" type="danger" title="删除" icon="el-icon-delete" @click="onDeleteBtnClick(bracelet.id)"></el-button>
      </div>
    </div>
    <el-button v-if="configuredBraceletList.length < 2" type="primary" @click="onAddBtnClick" class="add btn" icon="el-icon-plus" size="small">添加配置</el-button>
    <el-divider></el-divider>
    <div>
      <el-button type="primary" class="scan btn" @click="onScanBtnClick" :loading="isScanning">扫描手环</el-button>
    </div>
    <div class="wifi-list" v-if="showBraceletScanResult">
      <h3>可用手环设备</h3>
      <el-table
        :data="scannedBraceletList"
        style="width: 100%">
        <el-table-column width="50">
          <template slot-scope="scope">
            <eva-icon name="bluetooth" fill="#00e">{{scope.row.name}}</eva-icon>
          </template>
        </el-table-column>
        <el-table-column
          prop="mac"
          label="MAC地址">
        </el-table-column>
        <el-table-column
          prop="mac" label="状态" width="80">
          <template slot-scope="scope">
            <span>{{configuredBraceletList.filter(item => item.mac === scope.row.mac).length ? '已添加' : '未添加'}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="dialogTitle" 
      :visible.sync="dialogConfig.show" 
      :close-on-click-modal="false" width="80%"
      @closed="onDialogClose">
        <el-form :model="dialogConfig" :rules="dialogRules" ref="dialog">
        <el-form-item label="MAC地址" prop="mac">
          <el-input v-model="dialogConfig.mac" placeholder="请输入MAC地址"></el-input>
        </el-form-item>
      </el-form>      
      <div slot="footer">
        <el-button type="primary" @click="onConfirmBtnClick" :loading="isUpdating">确定</el-button>
        <el-button type="danger" @click="onCancelBtnClick">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import braceletQuery from '@/rest/braceletQuery';

export default {
  data() {
    return {
      configuredBraceletList: [],
      dialogConfig: {
        mode: 'NEW', // NEW, EDIT
        mac: '',
        id: '',
        show: false
      },
      dialogRules: {
        mac: [
          { required: true, message: 'MAC地址不能为空', trigger: 'blur' },
          { 
            validator: (rule, value, callback) => {
              if (value.length !== 12) {
                callback(new Error('请输入正确12位MAC地址'));
              } else {
                callback();
              }
            }, 
            trigger: 'blur'
          }
        ]
      },
      isUpdating: false,
      scannedBraceletList: [],
      operatingMac: '',
      showBraceletScanResult: false,
      isScanning: false
    };
  },
  computed: {
    dialogTitle() {
      return this.dialogConfig.mode === 'NEW' ? '添加蓝牙手环配置' : '编辑蓝牙手环配置';
    }
  },
  methods: {
    onAddBtnClick() {
      this.dialogConfig.id = '';
      this.dialogConfig.mac = '';
      this.dialogConfig.mode = 'NEW';
      this.dialogConfig.show = true;
    },
    onCancelBtnClick() {
      this.dialogConfig.show = false;
    },
    async onConfirmBtnClick() {
      this.$refs.dialog.validate(async valid => {
        if (valid) {
          try {
            this.isUpdating = true;
            if (this.dialogConfig.mode === 'NEW') {
              await braceletQuery.addBracelet(this.dialogConfig.mac);
            } else {
              await braceletQuery.updateBracelet(this.dialogConfig.id, this.dialogConfig.mac);
            }            
            this.isUpdating = false;
            this.dialogConfig.show = false;
            this.fetchConfiguredBraceletList();
          } catch {
            this.isUpdating = false;
            this.$message({
              message: `${this.dialogConfig.mode === 'NEW' ? '添加' : '更新'}添加手环配置失败`,
              type: 'error'
            });
          }          
        }
      });
    },
    onEditBtnClick(id, bracelet) {
      this.dialogConfig.mode = 'EDIT';
      this.dialogConfig.show = true;
      this.dialogConfig.mac = bracelet.mac;
      this.dialogConfig.id = bracelet.id;
    },
    onDeleteBtnClick(id) {
      this.$confirm('所选中的手环配置将被删除', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          this.isUpdating = true;
          await braceletQuery.deleteBracelet(id);
          this.isUpdating = false;
          this.$message({
            message: '删除手环配置成功',
            type: 'success'          
          });
          this.fetchConfiguredBraceletList();
        } catch {
          this.$message({
            message: '删除手环配置失败',
            type: 'error'          
          });
        }  
      });
    },
    onDialogClose() {
      this.$refs.dialog.resetFields();
    },
    async fetchConfiguredBraceletList() {
      try {
        this.configuredBraceletList = await braceletQuery.getConfiguredBraceletList();
      } catch {
        this.$message({
          message: '获取手环配置失败',
          type: 'error'
        });
      } 
    },
    async onScanBtnClick() {
      try {
        this.isScanning = true;
        this.scannedBraceletList = await braceletQuery.getScannedBraceletList();
        this.showBraceletScanResult = true;
      } catch {
        this.$message({
          message: '获取可用手环设备失败',
          type: 'error'
        });
      }
      this.isScanning = false;
    },
    onSelectBtnClick(mac) {
      this.operatingMac = mac;
    }
  },
  created() {
    this.fetchConfiguredBraceletList();  
  }
};
</script>

<style lang="scss" scoped>
.bracelet-page {
  .bracelet {
    align-items: center;
    flex-wrap: wrap;
    line-height:48px;
    .mac {
      width: 120px;
      margin: 0 8px;
    }
  }
  .add, .scan {
    margin-top:24px;
  }
}
</style>
