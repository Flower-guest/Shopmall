<template>
  <div class="recommend">
    <div
      class="recommend-item"
      v-for="(recommend, index) in recommends"
      :key="index"
    >
      <img :src="recommend.image" alt="" />
      <div>{{ recommend.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommends: {
      type: Array,
      defult() {
        return [];
      },
    },
  },
};
</script>

<style lang="less" scoped>
.recommend {
  display: flex;
  text-align: center;
  font-size: 12px;
  padding: 10px 0 20px;
  border-bottom: 10px solid #eee;

  .recommend-item {
    flex: 1;

    img {
      width: 70px;
      height: 70px;
      margin-bottom: 10px;
    }
  }
}
</style>