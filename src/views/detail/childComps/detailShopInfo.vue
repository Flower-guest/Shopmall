<template>
  <div class="detail-shop-info">
    <div class="shop-top">
      <img :src="shop.shopLogo" />
      <span>{{ shop.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    shop: {
      type: Object,
    },
  },
};
</script>

<style lang="less" scoped>
.detail-shop-info {
  border-bottom: 5px solid @color-border;
  padding: 25px 8px;

  .shop-top {
    height: 45px;
    display: flex;
    align-items: center;
    img {
      border-radius: 50%;
      height: 100%;
    }
    span {
      margin-left: 10px;
      color: @color-text;
    }
  }
}
</style>