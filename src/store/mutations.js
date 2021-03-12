export default {
  // mutations唯一目的就是修改state状态，每个方法尽可能完成的事件比较单一
  addCartList(state, payload) {
    state.cartList.push(payload);
  },
  addCounter(state, payload) {
    payload.count++;
  }
}
