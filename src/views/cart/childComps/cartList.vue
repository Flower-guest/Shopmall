<template>
  <div class="cartList"></div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    //vuex ：辅助函数将 store 中的 getter 映射到局部计算属性
    ...mapGetters(["cartList"]),
  },
};
</script>

<style lang='less' scoped>
</style>