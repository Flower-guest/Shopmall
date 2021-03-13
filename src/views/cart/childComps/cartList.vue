<template>
  <div class="cart-list">
    <b-scroll :probe-type="3" :pull-up-load="true" class="content" ref="scroll">
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :product="item"
      />
    </b-scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BScroll from "components/common/scroll/BScroll.vue";
import CartListItem from "./cartListItem.vue";

export default {
  components: { BScroll, CartListItem },
  computed: {
    //vuex ：辅助函数将 store 中的 getter 映射到局部计算属性
    ...mapGetters(["cartList"]),
  },
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style lang='less' scoped>
.cart-list {
  height: 100vh;
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 93px;
    left: 0;
    right: 0;
  }
}
</style>