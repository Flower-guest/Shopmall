export default {
  addCarts(context, payload) {
    // action可以返回Promise
    return new Promise((resolve, reject) => {
      // 查找之前数组中是否有该商品；没有就添加，有就数量加一
      let product = context.state.cartList.find(item => item.iid === payload.iid);
      if (product) {
        context.commit('addCounter', product);
        resolve('当前商品加一');
      } else {
        payload.count = 1;
        context.commit('addCartList', payload);
        resolve('添加了新得商品');

      }
    })
  }
}
