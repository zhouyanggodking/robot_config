<template>
  <div class="user-account-container">
    <el-dropdown trigger="hover" @command="handleCommand">
      <div><i class="user icon"></i></div>
      <el-dropdown-menu class="user-account" slot="dropdown">
        <el-dropdown-item class="user"><i class="icon"></i><span class="name">用户 {{userName}}</span></el-dropdown-item>
        <el-dropdown-item class="logout" command="logout"><i class="icon"></i><span class="name">退出登陆</span></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>    
  </div>
</template>

<script>
import authQuery from '@/rest/authQuery';
import authService from '@/services/authService';

export default {
  name: 'userAccount',
  data() {
    return {
      userName: ''
    };
  },
  methods: {
    handleCommand(command) {
      if (command === 'logout') {
        // send request to delete token on server        
        // clear localstorage token
        authQuery.logout().finally(() => {
          this.$router.push({
            path: '/login'
          });
        });
      }
    }
  },
  mounted() {
    this.userName = authService.getLoggedUserName();
  }
};
</script>

<style lang="scss" scoped>
.user-account-container {
  display: flex;
  align-items: center;
  /deep/ {
    i.user.icon {
      display: inline-block;
      width: 32px;
      height: 32px;
      border: solid 0.0625rem #bdc8cc;
      border-radius: 16px;
      background-image: url('../assets/icons/user.svg');
      background-size: 100% 100%;
      cursor: pointer;
    }
  } 
}
</style>

<style lang="scss">
.el-dropdown-menu.user-account {
  padding: 0;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0.6875rem 2.5rem 0 rgba(5, 69, 92, 0.1);
  border: solid 0.0625rem rgba(220, 225, 227, 0.9);
  border-radius: 0.25rem;
  .el-dropdown-menu__item { 
    display: flex;
    align-items: center;   
    padding: 0 0.75rem;
    &:hover {        
      background-color: rgba(239, 243, 245, 0.5);
    }
    &.user{      
      height: 3rem;
      border-bottom: solid 0.0625rem rgba(239, 243, 245, 0.5);
      cursor: default;      
      .icon {
        display: inline-block;
        width: 1.375rem;
        height: 1.375rem;
        border: solid 0.0625rem #bdc8cc;
        border-radius: 0.6875rem;
        background-image: url('../assets/icons/user.svg');
        background-size: 100% 100%;
      }
      .name {
        display: inline-block;
        margin-left: 0.5rem;
        height: 1.25rem;
        font-size: 0.875rem;
        line-height: 1.25rem;
      }
    }

    &.logout {
      height: 2.5rem;
      .icon {
        display: inline-block;
        margin-left: 0.1875rem;
        width: 0.875rem;
        height: 0.875rem;
        background-image: url('../assets/icons/logout.svg');
        background-size: 100% 100%;
      }
      .name {
        display: inline-block;
        margin-left: 0.75rem;
        height: 1.25rem;
        font-size: 0.875rem;
        line-height: 1.25rem;
      }
    }
  }
}
</style>
