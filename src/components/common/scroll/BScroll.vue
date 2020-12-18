<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import PullUp from "@better-scroll/pull-up";
BScroll.use(PullUp);
export default {
  data() {
    return {
      scroll: null,
    };
  },
  methods: {
    betterScroll() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: 3,
        pullUpLoad: true,
      });

      this.scroll.on("pullingUp", () => {
        this.scroll.refresh();
      });
    },
  },
  mounted() {
    this.betterScroll();
  },
};
</script>

<style>
</style>