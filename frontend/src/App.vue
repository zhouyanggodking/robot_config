<template>
  <router-view/>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    const skeleton = document.getElementById('skeleton');
    if (skeleton) {
      document.body.removeChild(skeleton);
    }
  }
};
</script>

<style lang="scss">
@import './scss/color.scss';

html, body{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-family: 'Tahoma', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-size: 16px;
  // background-color: #2f333a;
  box-sizing: border-box;
}

*{
  box-sizing: border-box;
}
.el-loading-mask{
  min-height: 200px;
  background: none !important;
  .el-loading-spinner .path{
    stroke:#858284;
  }
}

/* width */
// ::-webkit-scrollbar {
//     width: 0.625rem;
//     height: 0.625rem;
//   }

/*
::-webkit-scrollbar-track {
    background-color: #dae8ed; 
    border: solid 0.0625rem #f4f4f4;
    border-radius: 0.3125rem;
    box-shadow: inset 0 0.125rem 0.0625rem 0 rgba(0, 0, 0, 0.05);
}

::-webkit-scrollbar-thumb {
    background-color: rgba(17, 52, 65, 0.1);
    border-radius: 0.3125rem;
}

::-webkit-scrollbar-thumb:hover {
    background-color: rgba(17, 52, 65, 0.3);    
}

::-webkit-scrollbar-corner {
  background: #e6ecee;
}
*/
</style>
