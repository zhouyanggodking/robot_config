<template>
  <div class="server-page">
    <h1>系统服务器</h1>
    <div class="server-info">
      <div>
        服务器地址: 
      </div>  
      <span class="address">{{serverAddress || '空'}}</span>    
      <el-button type="primary" class="el-icon-edit" @click="onEdit">修改</el-button>
    </div>
    <el-dialog title="修改服务器地址" 
      :visible.sync="dialogConfig.show" 
      :close-on-click-modal="false" width="80%"
      @closed="onDialogClose">
      <el-form :model="dialogConfig" :rules="dialogRules" ref="dialog">
        <el-form-item label="服务器地址" prop="address">
          <el-input v-model="dialogConfig.address" placeholder="请输入服务器地址"></el-input>
        </el-form-item>
        <el-form-item label="端口号" prop="port">
          <el-input v-model.number="dialogConfig.port" placeholder="请输入端口号"></el-input>
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
import serverQuery from '@/rest/serverQuery';

export default {
  data() {
    return {
      serverInfo: {
        address: '',
        port: ''
      },
      dialogConfig: {
        address: '',
        port: '',
        show: false
      },
      dialogRules: {
        address: [
          { required: true, message: '服务器地址不能为空', trigger: 'blur' },
          { 
            validator: (rule, value, callback) => {
              if (!/^http(s?):\/\//.test(value)) {
                callback(new Error('请输入正确的服务器地址, 应以http(s)://开头'));
              } else {
                callback();
              }
            }, 
            trigger: 'blur'
          }
        ],
        port: [
          { required: true, message: '端口号不能为空', trigger: 'blur' },
          { type: 'number', message: '端口号必须为数字', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    async onConfirmBtnClick() {
      this.$refs.dialog.validate(async valid => {
        if (valid) {
          try {
            await serverQuery.modifyServer(this.dialogConfig.address, this.dialogConfig.port);
            this.dialogConfig.show = false;
            this.serverInfo.address = this.dialogConfig.address;
            this.serverInfo.port = this.dialogConfig.port;
            this.$message({
              message: '修改服务器成功',
              type: 'success'
            });
          } catch {
            this.$message({
              message: '修改服务器失败',
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
    onEdit() {
      this.dialogConfig.address = this.serverInfo.address;
      this.dialogConfig.port = this.serverInfo.port;
      this.dialogConfig.show = true;
    }
  },
  async created() {
    try {
      this.serverInfo = await serverQuery.getServerInfo();
    } catch {
      this.$message({
        message: '获取服务器信息失败',
        type: 'error'
      });
    }
  },
  computed: {
    serverAddress() {
      if (this.serverInfo.port) {
        return `${this.serverInfo.address}:${this.serverInfo.port}`;
      }
      return this.serverInfo.address;
    }
  }
};
</script>

<style lang="scss" scoped>
.server-page {
  .back {
    margin: 32px 0;
  }
  .server-info {
    font-size: 20px;
    .address {
      margin-right: 24px;
      line-height:42px;
    }
  }
  /deep/ .el-dialog {
    max-width: 500px;
  }
}
</style>
