<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style lang="less" scoped>
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  height: 44px;
  text-align: center;
  line-height: 44px;
  box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1);
  width: 100%;
  z-index: 99;

  .left,
  .right {
    width: 60px;
    height: 100%;
  }

  .center {
    height: 100%;
    flex: 1;
  }
}
</style>