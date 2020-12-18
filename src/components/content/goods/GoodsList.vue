<template>
  <div class="good-list">
    <goods-list-item
      v-for="(good, index) in goods"
      :key="index"
      :gooditem="good"
    />
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";
export default {
  components: { GoodsListItem },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="less" scoped>
.good-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  padding: 2px;
}
</style>