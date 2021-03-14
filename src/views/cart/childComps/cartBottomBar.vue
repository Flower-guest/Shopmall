<template>
  <div class="bottom-menu">
    <check-button
      class="select-all"
      @click.native="checkClick"
      :is-checked="isSelectAll"
    />
    <span>全选</span>
    <span class="total-price">合计:{{ totalPrice }} ¥</span>
    <span class="buy-product" @click="calcClick">去计算({{ cartLength }})</span>
  </div>
</template>

<script>
import checkButton from "./checkButton.vue";
import { mapGetters } from "vuex";
export default {
  components: { checkButton },
  computed: {
    //vuex ：辅助函数将 store 中的 getter 映射到局部计算属性
    ...mapGetters({
      cartList: "cartList",
      cartLength: "cartLength",
    }),
    // 计算价格
    totalPrice() {
      return this.cartList
        .filter((item) => item.checked)
        .reduce((preValue, item) => {
          return preValue + item.price * item.count;
        }, 0)
        .toFixed(2);
    },
    // 结算的个数
    cartLength() {
      return this.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      // 判断是否还有没选中的，如果有.some返回为true，如果不取反，则全选框就会被选中，所以要取反
      return (
        !this.cartList.length == 0 &&
        !this.cartList.some((item) => !item.checked)
      );
    },
  },
  methods: {
    // 全选与反选
    checkClick() {
      this.$store.commit("selectChecked", this.isSelectAll);
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.show("请选择购买的商品");
      }
    },
  },
};
</script>

<style lang='less' scoped>
.bottom-menu {
  width: 100%;
  height: 44px;
  background-color: #eee;
  position: fixed;
  bottom: 50px;
  left: 0;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 35px;
  box-sizing: border-box;

  .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
}
</style>