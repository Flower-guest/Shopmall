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
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  methods: {
    betterScroll() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        click: true,
      });
      this.scroll.on("scroll", (position) => {
        this.$emit("position", position);
      });
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    },
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
  },
  mounted() {
    this.betterScroll();
  },
};
</script>

<style>
</style>