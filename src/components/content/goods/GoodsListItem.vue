<template>
  <div class="goods-item">
    <img :src="gooditem.show.img" />
    <div class="goods-info">
      <p>{{ gooditem.title }}</p>
      <span class="price">{{ gooditem.price }}</span>
      <span class="collect">{{ gooditem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    gooditem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style lang="less" scoped>
.good-item {
  flex: 50%;

  img {
    max-width: 100%;
  }
}
</style>