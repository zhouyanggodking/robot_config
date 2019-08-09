<template>
  <div class="row nav">
    <router-link :to="{name: 'main-page'}" class="link row">
      <img src="../assets/icons/logo_t.png" alt="logo" width="120" height="64">
    </router-link>
    <user-account></user-account>
  </div>
</template>

<script>
import UserAccount from './UserAccount';

export default {
  components: {
    UserAccount
  }
};
</script>

<style lang="scss" scoped>
.nav {
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 24px;
  .link {
    align-items: center;
  }

}
</style>
