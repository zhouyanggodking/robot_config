<template>
  <div class="row login-page">
    <el-form class="login-form" :model="loginModel" :rules="loginRules" ref="loginForm">
      <div class="hint">
        用户登陆
      </div>
      <el-divider></el-divider>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginModel.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginModel.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-button type="primary" class="btn login" @click="login">登陆</el-button>
    </el-form>
  </div>
</template>

<script>
import authQuery from '@/rest/authQuery';

export default {
  data() {
    return {
      loginModel: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    async login() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          try {
            authQuery.login(this.loginModel.username, this.logModel.password);
          } catch {
            this.$message({
              message: '登陆失败， 用户名或密码错误',
              type: 'error'
            });
          }
        }
      });      
    }
  }
};
</script>

<style lang="scss" scoped>
.login-page {
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  .login-form {
    width: 400px;
    .hint {
      font-size: 20px;
      font-weight: bold;
    }
    .login {
      width: 100%;
      margin-top: 40px;
    }
  }
  
}

</style>
