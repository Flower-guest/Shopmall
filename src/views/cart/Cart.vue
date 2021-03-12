<template>
  <div class="cart">
    <navbar class="nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </navbar>
  </div>
</template>

<script>
import Navbar from "../../components/common/navbar/Navbar.vue";
import { mapGetters } from "vuex";
export default {
  components: { Navbar },
  name: "Cart",
  computed: {
    //vuex ：辅助函数将 store 中的 getter 映射到局部计算属性
    ...mapGetters(["cartLength"]),
  },
};
</script>

<style lang="less" scoped>
.nav-bar {
  background-color: @color-tint;
  color: #fff;
}
</style>
