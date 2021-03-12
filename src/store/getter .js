//利用辅助函数将 store 中的 getter 映射到局部计算属性
export default {
  cartLength(state) {
    return state.cartList.length;
  },
  cartList(state) {
    return state.cartList
  }
}
