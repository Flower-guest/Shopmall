<template>
  <div class="recommend-list">
    <div class="info-header">热门推荐</div>
    <div>
      <goods-list :goods="recommendList" />
    </div>
  </div>
</template>

<script>
import GoodsList from "components/content/goods/GoodsList.vue";
export default {
  components: { GoodsList },
  props: {
    recommendList: {
      type: Array,
    },
  },
};
</script>

<style>
</style>