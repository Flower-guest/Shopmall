<template>
  <div class="cate-gory-title">
    <b-scroll
      :probe-type="3"
      :pull-up-load="true"
      class="tab-menu"
      ref="scroll"
    >
      <div class="cate-gory-title">
        <div v-for="(value, index) in title" :key="index" class="title-list">
          {{ value.title }}
        </div>
      </div>
    </b-scroll>
  </div>
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
  activated() {
    setTimeout(() => {
      this.$refs.scroll.refresh();
    }, 100);
  },
};
</script>

<style lang="less" scoped>
.cate-gory-title {
  height: 100%;

  .tab-menu {
    background-color: #f6f6f6;
    width: 100px;
    box-sizing: border-box;
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;

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
}
</style>