<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span>客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span>店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span>收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.bottom-bar {
  height: 60px;
  background-color: #fff;
  display: flex;

  .bar-item {
    flex: 1;
    display: flex;
    text-align: center;
    align-items: center;

    > div {
      flex: 1;
    }
  }

  .bar-left {
    font-size: 13px;
    color: @color-text;

    .icon {
      display: block;
      width: 22px;
      height: 22px;
      margin: 10px auto 3px;
      background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
      background-size: cover;
    }

    .service {
      background-position: 0 -54px;
    }

    .shop {
      background-position: 0 -98px;
    }
  }

  .bar-right {
    font-size: 15px;
    color: #fff;

    .cart {
      line-height: 60px;
      background-color: #ffe817;
      color: #333;
    }

    .buy {
      line-height: 60px;
      background-color: #f69;
    }
  }
}
</style>