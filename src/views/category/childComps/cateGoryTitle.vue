<template>
  <b-scroll :probe-type="3" :pull-up-load="true" class="tab-menu">
    <div class="cate-gory-title">
      <div v-for="(value, index) in title" :key="index" class="title-list">
        {{ value.title }}
      </div>
    </div>
  </b-scroll>
</template>

<script>
import BScroll from "components/common/scroll/BScroll.vue";
export default {
  components: { BScroll },
  props: {
    title: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="less" scoped>
.tab-menu {
  background-color: #f6f6f6;
  height: 100%;
  width: 100px;
  box-sizing: border-box;
  .cate-gory-title {
    font-size: 14px;
    color: @color-text;
    text-align: center;
    .title-list {
      line-height: 45px;
      height: 45px;
    }
  }
}
</style>