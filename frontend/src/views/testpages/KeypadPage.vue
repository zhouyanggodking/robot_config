<template>
  <div class="keypad-page">
    <h1>测试按键</h1>
    <div class="result">
      {{keyStrings.join('  ')}}
    </div>
  </div>
</template>

<script>
import testQuery from '@/rest/testQuery';

export default {
  data() {
    return {
      keyStrings: [],
      handle: null
    };
  },
  created() {
    this.handle = setInterval(async () => {
      this.keyStrings = await testQuery.getKeypadPressedKeys();
    }, 300);
  },
  beforeDestroy() {
    clearInterval(this.handle);
  }
};
</script>

<style lang="scss" scoped>
.keypad-page {
  .result {
    margin-top: 48;
    padding: 24px;
    font-size: 32px;
    font-weight: bold;
    border: solid 1px #eee;
    border-radius:4px;
    min-height: 300px;
    line-height: 60px;
  }
}
</style>
