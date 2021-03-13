<template>
  <div class="bottom-menu">
    <check-button
      class="select-all"
      @click.native="checkClick"
      :is-checked="checked"
    />
    <span>全选</span>
    <span class="total-price">合计:{{ totalPrice }} ¥</span>
    <span class="buy-product">去计算({{ cartLength }})</span>
  </div>
</template>

<script>
import checkButton from "./checkButton.vue";
import { mapGetters } from "vuex";
export default {
  components: { checkButton },
  data() {
    return {
      checked: true,
    };
  },
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
  },
  methods: {
    checkClick() {
      this.cartList.forEach((item) => {
        item.checked = true;
      });
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